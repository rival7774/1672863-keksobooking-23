import {sendAnnouncementAd} from './api.js';
import {resetMainMarker, addressDefault, showAdsMap} from './map.js';
import {elementError, elementSuccess, showDialog} from './dialog.js';
import {debounce} from './utils/debounce.js';
import {getAds} from './data.js';

const announcementForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const formTitle = announcementForm.querySelector('#title');
const formPrice = announcementForm.querySelector('#price');
const roomType = document.querySelector('#type');
const numberOfRooms = document.querySelector('#room_number');
const numberOfGuests = document.querySelector('#capacity');
const checkInTime = document.querySelector('#timein');
const checkOutTime = document.querySelector('#timeout');
const address = document.querySelector('#address');
const buttonReset = document.querySelector('.ad-form__reset');

const roomTypeOption = Number(roomType.options[roomType.selectedIndex].dataset.minPrice);

const DISABL_CSS_FORM = 'ad-form--disabled';
const MIN_VALUE_TITLE = 30;
const MAX_VALUE_TITLE = 100;
const MAX_VALUE_PRICE = 1000000;
const MAXIMUM_NUMBER_ROOMS = 100;
const ANY = 'any';
const MIDDLE_PRICE = 'middle';
const LOW_PRICE = 'low';
const HIGH_PRICE = 'high';
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const DELAY = 500;

//*****Блокировка форм и филдсетов */

const blockForm = (form, cssClass) => {
  form.classList.add(cssClass);
};

const activateForm = (form, cssClass) => {
  form.classList.remove(cssClass);
};

const blockForms = () => {
  blockForm(announcementForm, DISABL_CSS_FORM);

  blockForm(filterForm, DISABL_CSS_FORM);
};

blockForms();

//*******Валидация заголовка и цены за ночь */

const isMinValue = (value, minVal) => value >= minVal;
const isMaxValue = (value, maxVal) => value <= maxVal;

const onFormInput = (evt) => {
  const target = evt.target;
  const validities = [];

  if (!isMinValue(target.value.length, MIN_VALUE_TITLE)) {
    validities.push(`Поле должно содержать минимум ${MIN_VALUE_TITLE} символов\nСейчас у вас введенно ${target.value.length}\nНужно удалить ${MIN_VALUE_TITLE - target.value.length}`);
  }

  if (!isMaxValue(target.value.length, MAX_VALUE_TITLE)) {
    validities.push(`Поле должно содержать максимум ${MAX_VALUE_TITLE} символов\nСейчас у вас введенно ${target.value.length}\nНужно удалить ${target.value.length - MAX_VALUE_TITLE}`);
  }

  if (!target.value.length) {
    validities.push('Заполните пожалуйста это поле');
  }

  target.setCustomValidity(validities.join('. \n'));

  target.reportValidity();
};

formTitle.addEventListener('input', onFormInput);

let minValuePrice = Number(roomTypeOption);

const onPriceinput = () => {
  const target = formPrice;
  const targetValue = Number(target.value);
  const validities = [];

  if (!isMinValue(targetValue, minValuePrice)) {
    validities.push(`Минимальная цена ${minValuePrice}р.\nСейчас ваша цена ${targetValue}р.`);
  }

  if (!isMaxValue(targetValue, MAX_VALUE_PRICE)) {
    validities.push(`Максимальная цена ${MAX_VALUE_PRICE}р. символов\nСейчас ваша цена ${target.value}р.\n`);
  }

  if (!targetValue) {
    validities.push('Заполните пожалуйста это поле');
  }

  target.setCustomValidity(validities.join('. \n'));

  target.reportValidity();
};

formPrice.addEventListener('input', onPriceinput);

//********Синхронизация количества комнат с количеством мест */

const onRoomsChange = () => {
  const roomValue = Number(numberOfRooms.value);

  [...numberOfGuests.options].forEach((elem) => {
    const guestsValue = Number(elem.value);

    if (roomValue >= guestsValue && roomValue !== MAXIMUM_NUMBER_ROOMS) {
      elem.disabled = false;
    } else if (roomValue === MAXIMUM_NUMBER_ROOMS && guestsValue === MAXIMUM_NUMBER_ROOMS) {
      elem.disabled = guestsValue !== MAXIMUM_NUMBER_ROOMS;
    } else {
      elem.disabled = true;
    }
  });

  numberOfGuests.value = numberOfRooms.value;
};

onRoomsChange();

numberOfRooms.addEventListener('change', onRoomsChange);

//*******Влияние типа желья на минимальную цену за ночь */

const resetPrice = () => {
  formPrice.placeholder = roomTypeOption;
  formPrice.min = roomTypeOption;
  minValuePrice = roomTypeOption;
};

resetPrice();

roomType.addEventListener('change', () => {
  const valueData = roomType.options[roomType.selectedIndex].dataset.minPrice;
  formPrice.min = valueData;
  formPrice.placeholder = valueData;
  minValuePrice = valueData;
  onPriceinput();
});

//********Синхронизация времени заезда и выезда */

const synchronizeTime = (target, selectTime) => {
  selectTime.value = target.value;
};

checkInTime.addEventListener('change', (evt) => synchronizeTime(evt.target, checkOutTime));
checkOutTime.addEventListener('change', (evt) => synchronizeTime(evt.target, checkInTime));

//*********Добавить кординаты в инпут адресс */

const changeAddress = (stringAddress) => {
  address.value = stringAddress;
};

//*****Сброс форм */

const resetForm = () => {
  filterForm.reset();
  announcementForm.reset();
  resetMainMarker();
  changeAddress(addressDefault);
  resetPrice();
  onRoomsChange();
  showAdsMap(getAds());
};

const onFormReset = (evt) => {
  evt.preventDefault();
  resetForm();
};

//******Отправка формы */

const onErrorSendingAd = (data, onSuccess, post) => () => {
  showDialog(elementError, () => post(data, onSuccess, onErrorSendingAd(data, onSuccess, post)));
};

const onSuccessfulAdSending = () => {
  resetForm();
  showDialog(elementSuccess);
};

announcementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = new FormData(evt.target);

  sendAnnouncementAd(data, onSuccessfulAdSending, onErrorSendingAd(onSuccessfulAdSending, data, sendAnnouncementAd));
});

//*****Событие кнопки резет */

buttonReset.addEventListener('click', onFormReset);

//*****Фильтрация объявлений */

const type = filterForm.querySelector('#housing-type');
const price = filterForm.querySelector('#housing-price');
const rooms = filterForm.querySelector('#housing-rooms');
const guests = filterForm.querySelector('#housing-guests');
const filterCheckbox = filterForm.querySelectorAll('.map__checkbox');

const checkType = (obj) => type.value === ANY || obj.offer.type === type.value;

const checkPrice = (obj) => {
  let priceBullean = false;
  if (price.value === ANY) {
    priceBullean = true;
  } else if (price.value === MIDDLE_PRICE) {
    priceBullean = obj.offer.price >= MIN_PRICE && obj.offer.price <= MAX_PRICE;
  } else if (price.value === LOW_PRICE) {
    priceBullean = obj.offer.price <= MIN_PRICE;
  } else if (price.value === HIGH_PRICE) {
    priceBullean = obj.offer.price >= MAX_PRICE;
  }

  return priceBullean;
};

const checkRooms = (obj) => rooms.value === ANY || obj.offer.rooms === Number(rooms.value);

const checkGuests = (obj) => guests.value === ANY || obj.offer.guests === Number(guests.value);
const getSelectedAmenities = (checkboxs) => {
  const selectedAmenities = [];

  checkboxs.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedAmenities.push(checkbox.value);
    }
  });

  return selectedAmenities;
};

const validateFeatures = (obj) => {
  const selectedAmenities = getSelectedAmenities(filterCheckbox);

  return [...selectedAmenities].every((elem) => obj.offer.features && obj.offer.features.includes(elem));
};

const filterAds = (arrayAds) =>
  arrayAds.filter((elem) =>
    checkType(elem) &&
    checkPrice(elem) &&
    checkRooms(elem) &&
    checkGuests(elem) &&
    validateFeatures(elem));

//*****Отрисовка меток при изменении фильтра */

filterForm.addEventListener('change', debounce(() => showAdsMap(getAds()), DELAY));

//*****Аватар */

const inputAvatar = announcementForm.querySelector('.ad-form-header__input');
const inputRoom = announcementForm.querySelector('.ad-form__input');
const previewAvatar = announcementForm.querySelector('.ad-form-header__preview-avatar');
const roomPreview = announcementForm.querySelector('.ad-form__photo');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const onInputAvatarChange = (preview) => function() {
  const file = this.files[0];
  const nameFile = file.name.toLowerCase();

  const aaa = FILE_TYPES.some((elem) => nameFile.endsWith(elem)); //!!Не знаю как назвать переменную

  if (aaa) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

inputAvatar.addEventListener('change', onInputAvatarChange(previewAvatar));

function setAttributes(el, attrs) {
  for(const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

const createImg = (attrs) => {
  const img = document.createElement('img');
  setAttributes(img, attrs);
  return img;
};

inputRoom.addEventListener('change', () => {
  const roomFile = inputRoom.files;

  const files = [...roomFile].filter((elemFile) => FILE_TYPES.some((elem) => elemFile.name.toLowerCase().endsWith(elem)));

  if (files.length > 0) {
    files.forEach((elem) => {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const img = createImg({ 'width': '500px', 'height': '500px', 'src': reader.result });
        roomPreview.appendChild(img);
      });

      reader.readAsDataURL(elem);
    });
  }
});

export {activateForm, announcementForm, filterForm, DISABL_CSS_FORM, changeAddress, resetForm, filterAds};

import {postInquiry, getAds} from './api.js';
import {resetMainMarker, addressDefault, showAdsMap, messageError} from './map.js';
import {elementError, elementSuccess} from './dialog.js';
import {debounce} from './utils/debounce.js';

const announcementForm = document.querySelector('.ad-form');
const announcementFormFieldset = announcementForm.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filterFormFieldset = filterForm.querySelectorAll('fieldset');
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

const disabledForm = (form, cssClass) => {
  form.classList.add(cssClass);
};

const disabledFieldset = (allFildset) => {
  allFildset.forEach((elem) => {
    elem.disabled = true;
  });
};

const activateForm = (form, cssClass) => {
  form.classList.remove(cssClass);
};

const activateFieldset = (allFildset) => {
  allFildset.forEach((elem) => {
    elem.disabled = false;
  });
};

const blockForms = () => {
  disabledForm(announcementForm, DISABL_CSS_FORM);
  disabledFieldset(announcementFormFieldset);

  disabledForm(filterForm, DISABL_CSS_FORM);
  disabledFieldset(filterFormFieldset);
};

const unlockForms = () => {
  activateForm(announcementForm, DISABL_CSS_FORM);
  activateFieldset(announcementFormFieldset);

  activateForm(filterForm, DISABL_CSS_FORM);
  activateFieldset(filterFormFieldset);
};

blockForms();

//*******Валидация заголовка и цены за ночь */

const minValue = (value, minVal) =>  value > minVal;
const maxValue = (value, maxVal) =>  value < maxVal;

const validityTitle = (evt) => {
  const target = evt.target;
  const validities = [];

  if (!minValue(target.value.length, MIN_VALUE_TITLE)) {
    validities.push(`Поле должно содержать минимум ${MIN_VALUE_TITLE} символов\nСейчас у вас введенно ${target.value.length}\nНужно удалить ${MIN_VALUE_TITLE - target.value.length}`);
  }

  if (!maxValue(target.value.length, MAX_VALUE_TITLE)) {
    validities.push(`Поле должно содержать максимум ${MAX_VALUE_TITLE} символов\nСейчас у вас введенно ${target.value.length}\nНужно удалить ${target.value.length - MAX_VALUE_TITLE}`);
  }

  if (!target.value.length) {
    validities.push('Заполните пожалуйста это поле');
  }

  target.setCustomValidity(validities.join('. \n'));

  target.reportValidity();
};

formTitle.addEventListener('input', validityTitle);

let minValuePrice = Number(roomTypeOption);

const validityPrice = (evt) => {
  const target = evt.target;
  const targetValue = Number(target.value);
  const validities = [];

  if (!minValue(targetValue, minValuePrice)) {
    validities.push(`Минимальная цена ${minValuePrice}р.\nСейчас ваша цена ${targetValue}р.`);
  }

  if (!maxValue(targetValue, MAX_VALUE_PRICE)) {
    validities.push(`Максимальная цена ${MAX_VALUE_PRICE}р. символов\nСейчас ваша цена ${target.value}р.\n`);
  }

  if (!targetValue) {
    validities.push('Заполните пожалуйста это поле');
  }

  target.setCustomValidity(validities.join('. \n'));

  target.reportValidity();
};

formPrice.addEventListener('input', validityPrice);

//********Синхронизация количества комнат с количеством мест */

const validityGuests = () => {
  const roomValue = Number(numberOfRooms.value);

  for (let i = 0; i < numberOfGuests.options.length; i++) {
    const guestsValue = Number(numberOfGuests.options[i].value);

    if (roomValue >= guestsValue && roomValue !== MAXIMUM_NUMBER_ROOMS) {
      numberOfGuests.options[i].disabled = false;
    }else if (roomValue === MAXIMUM_NUMBER_ROOMS && guestsValue === MAXIMUM_NUMBER_ROOMS) {
      numberOfGuests.options[i].disabled = guestsValue !== MAXIMUM_NUMBER_ROOMS;
    }else {
      numberOfGuests.options[i].disabled = true;
    }
  }

  numberOfGuests.value = numberOfRooms.value;
};

validityGuests();

numberOfRooms.addEventListener('change', validityGuests);

//*******Влияние типа желья на минимальную цену за ночь */

const resetPrice = () => {
  formPrice.placeholder = roomTypeOption;
  formPrice.min = roomTypeOption;
};

resetPrice();

roomType.addEventListener('change', () => {
  const valueData = roomType.options[roomType.selectedIndex].dataset.minPrice;
  formPrice.min = valueData;
  formPrice.placeholder = valueData;
  minValuePrice = valueData;
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

const resetForm = (evt) => {
  evt.preventDefault();
  filterForm.reset();
  announcementForm.reset();
  resetMainMarker();
  changeAddress(addressDefault);
  resetPrice();
  validityGuests();
  getAds(showAdsMap, messageError);
};

//******Отправка формы */

announcementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = new FormData(evt.target);

  postInquiry(data, elementSuccess, elementError);
});

//*****Событие кнопки резет */

buttonReset.addEventListener('click', resetForm);

//*****Фильтрация объявлений */

const type = filterForm.querySelector('#housing-type');
const price = filterForm.querySelector('#housing-price');
const rooms = filterForm.querySelector('#housing-rooms');
const guests = filterForm.querySelector('#housing-guests');
const filterCheckbox = filterForm.querySelectorAll('.map__checkbox');

const checkType = (obj) => {
  let typeBullean = obj.offer.type === type.value;

  if (type.value === ANY) {
    typeBullean = true;
  }

  return typeBullean;
};

const checkPrice = (obj) => {
  let priceBullean = false;
  if (price.value === ANY) {
    priceBullean = true;
  } else if (price.value === MIDDLE_PRICE) {
    priceBullean = obj.offer.price > MIN_PRICE && obj.offer.price < MAX_PRICE;
  } else if (price.value === LOW_PRICE) {
    priceBullean = obj.offer.price < MIN_PRICE;
  } else if (price.value === HIGH_PRICE) {
    priceBullean = obj.offer.price > MAX_PRICE;
  }

  return priceBullean;
};

const checkRooms = (obj) => {
  let roomsBullean = obj.offer.rooms === Number(rooms.value);
  if (rooms.value === ANY) {
    roomsBullean = true;
  }

  return roomsBullean;
};

const checkGuests = (obj) => {
  let guestsBullean = obj.offer.guests === Number(guests.value);
  if (guests.value === ANY) {
    guestsBullean = true;
  }

  return guestsBullean;
};

const getSelectedAmenities = (checkboxs) => {
  const selectedAmenities = [];

  checkboxs.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedAmenities.push(checkbox.value);
    }
  });

  return selectedAmenities;
};

const compareArrays = (arrayA, arrayB) => {
  let counter = 0;

  if (arrayB.length !== 0 && arrayA) {
    for (let i = 0; i < arrayB.length; i++) {
      if (arrayA.includes(arrayB[i])) {
        counter++;
      } else {
        counter = 0;
        break;
      }
    }
  } else if (arrayB.length === 0) {
    return true;
  } else if (!arrayA) {
    return false;
  }

  if (counter) {
    return true;
  }

  return false;
};

const filterAds = (arrayAds) =>
  arrayAds.filter((elem) => {
    if (checkType(elem) && checkPrice(elem) && checkRooms(elem) && checkGuests(elem) && compareArrays(elem.offer.features, getSelectedAmenities(filterCheckbox))) {
      return true;
    }
  });

//*****Отрисовка меток при изменении фильтра */

filterForm.addEventListener('change', debounce(() => getAds(showAdsMap, messageError), DELAY));

export {blockForms, unlockForms, changeAddress, resetForm, filterAds};

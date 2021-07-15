import {postInquiry} from './api.js';
import {resetMainMarker, addressDefault} from './map.js';

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

//*****Блокировка форм и филдсетов */

const DISABL_CSS_FORM = 'ad-form--disabled';

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

const MIN_VALUE_TITLE = 30;
const MAX_VALUE_TITLE = 100;

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
const MAX_VALUE_PRICE = 1000000;

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

const MAX_VALUE = 100;

const validityGuests = () => {
  const roomValue = Number(numberOfRooms.value);

  for (let i = 0; i < numberOfGuests.options.length; i++) {
    const guestsValue = Number(numberOfGuests.options[i].value);

    if (roomValue >= guestsValue && roomValue !== MAX_VALUE) {
      numberOfGuests.options[i].disabled = false;
    }else if (roomValue === MAX_VALUE && guestsValue === MAX_VALUE) {
      numberOfGuests.options[i].disabled = guestsValue !== MAX_VALUE;
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
};

//******Сообщения отправки формы */

const templateError = document.querySelector('#error').content;
const elementError = templateError.querySelector('.error');
const templateSuccess = document.querySelector('#success').content;
const elementSuccess = templateSuccess.querySelector('.success');

const ATTRIBUT_DATA_REQUEST = 'data-send-request';
const ATTRIBUT_DATA_CLOSE = 'data-modal-closed';

const showDialog = (elem, submittingForm, resetForms) => function () {
  const elementClone = elem.cloneNode(true);
  document.body.appendChild(elementClone);

  const reset = (nameFunction) => {
    elementClone.remove();
    document.removeEventListener('keydown', nameFunction);
    if (resetForms) {
      resetForms();
    }
  };

  const closeModalKeyboard = (evt) => {
    if (evt.key === 'Escape') {
      reset.bind(null, closeModalKeyboard);
    }
  };

  elementClone.addEventListener('click', reset.bind(null, closeModalKeyboard));

  document.addEventListener('keydown', closeModalKeyboard);

  elementClone.addEventListener('click', (evt) => {
    if (evt.target.hasAttribute(ATTRIBUT_DATA_REQUEST)) {
      elementClone.remove();
      document.removeEventListener('keydown', closeModalKeyboard);
      if (submittingForm) {
        submittingForm();
      }
    }if (evt.target.hasAttribute(ATTRIBUT_DATA_CLOSE)) {
      reset();
    }
  });
};

const TEXT_ERROR = 'Ошибка сервера, попробуйте перезагрузить страницу';
const TEXT_BUTTON = 'Закрыть сообщение';

const getMessageError = (elem, messageText, buttonText) => {
  const elementClone = elem.cloneNode(true);
  const message = elementClone.querySelector('.error__message');
  const button = elementClone.querySelector('.error__button');

  message.textContent = messageText;
  button.textContent = buttonText;
  button.removeAttribute(ATTRIBUT_DATA_REQUEST);
  button.setAttribute(ATTRIBUT_DATA_CLOSE, '');

  return elementClone;
};

const messageError = getMessageError(elementError, TEXT_ERROR, TEXT_BUTTON);

//******Отправка формы */

announcementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = new FormData(evt.target);

  postInquiry(data, elementSuccess, elementError);
});

//*****Событие кнопки резет */

buttonReset.addEventListener('click', resetForm);

export {blockForms, unlockForms, changeAddress, showDialog, resetForm, messageError};

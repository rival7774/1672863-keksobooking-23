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
unlockForms();

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

let MIN_VALUE_PRICE = Number(roomTypeOption);
const MAX_VALUE_PRICE = 1000000;

const validityPrice = (evt) => {
  const target = evt.target;
  const targetValue = Number(target.value);
  const validities = [];

  if (!minValue(targetValue, MIN_VALUE_PRICE)) {
    validities.push(`Минимальная цена ${aaa[roomType.value]}р.\nСейчас ваша цена ${targetValue}р.`);
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

// if (numberOfRooms.options[numberOfRooms.selectedIndex] === numberOfRooms.options[numberOfRooms.options.length - 1]) {
//   numberOfGuests.selectedIndex = numberOfGuests.options.length - 1;
// }else {
//   numberOfGuests.value = numberOfRooms.options[numberOfRooms.selectedIndex].value;
// }

// for (let i = 0; i < numberOfGuests.options.length; i++) {
//   const valueRoom = Number(numberOfRooms.options[numberOfRooms.selectedIndex].value);
//   const valueGuests = Number(numberOfGuests.options[i].value);

//   if (numberOfRooms.options[numberOfRooms.selectedIndex] === numberOfRooms.options[numberOfRooms.options.length - 1]) {
//     numberOfGuests.selectedIndex = numberOfGuests.options.length - 1;
//     for (let k = 0; k < numberOfGuests.options.length; k++) {
//       numberOfGuests.options[k].disabled = true;
//     }
//     numberOfGuests.options[numberOfGuests.selectedIndex].disabled = false;
//     break;
//   }

//   if (valueRoom >= valueGuests && valueGuests !== 0) {
//     numberOfGuests.options[i].disabled = false;
//     numberOfGuests.selectedIndex = i;
//   }else {
//     numberOfGuests.options[i].disabled = true;
//   }
// }

// numberOfGuests.value = numberOfRooms.options[numberOfRooms.selectedIndex].value;

numberOfRooms.addEventListener('change', () => {
  for (let i = 0; i < numberOfGuests.options.length; i++) {
    const valueRoom = Number(numberOfRooms.options[numberOfRooms.selectedIndex].value);
    const valueGuests = Number(numberOfGuests.options[i].value);

    if (Number(numberOfRooms.value) === 100) { //!!Завести константу 100
      numberOfGuests.value = 100;  //!! Найти идндекс
      for (let k = 0; k < numberOfGuests.options.length; k++) {
        numberOfGuests.options[k].disabled = true;
      }
      numberOfGuests.options[numberOfGuests.selectedIndex].disabled = false;
      return;
    }

    if (valueRoom >= valueGuests && valueGuests !== 100) {
      numberOfGuests.options[i].disabled = false;
    }else {
      numberOfGuests.options[i].disabled = true;
    }
  }

  numberOfGuests.value = numberOfRooms.options[numberOfRooms.selectedIndex].value;
});

//*******Влияние типа желья на минимальную цену за ночь */

formPrice.placeholder = roomTypeOption;
formPrice.min = roomTypeOption;

roomType.addEventListener('change', () => {
  const valueData = roomType.options[roomType.selectedIndex].dataset.minPrice;
  formPrice.min = valueData;
  formPrice.placeholder = valueData;
  MIN_VALUE_PRICE = valueData;
});

//********Синхронизация времени заезда и выезда */

const synchronizeTime = (target, selectTime) => {
  selectTime.value = target.value;
};

checkInTime.addEventListener('change', (evt) => synchronizeTime(evt.target, checkOutTime));
checkOutTime.addEventListener('change', (evt) => synchronizeTime(evt.target, checkInTime));

const announcementForm = document.querySelector('.ad-form');
const announcementFormFieldset = announcementForm.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filterFormFieldset = filterForm.querySelectorAll('fieldset');
const formTitle = announcementForm.querySelector('#title');
const formPrice = announcementForm.querySelector('#price');

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

const minValue = (value, minVal) =>  value > minVal;

const MIN_VALUE_TITLE = 30;

const validityTitle = (evt) => {
  const target = evt.target;
  const validities = [];

  // if (inputType === 'text') {
  if (!minValue(target.value.length, MIN_VALUE_TITLE)) {
    validities.push(`Поле должно содержать минимум ${MIN_VALUE_TITLE} символов\nСейчас у вас введенно ${target.value.length} символ \n Нужно удалить ${MIN_VALUE_TITLE - target.value.length}`);
  }

  //   if (target.validity.tooLong) {
  //     validities.push(`Поле должно содержать максимум ${maxLength} символов\nСейчас у вас введенно ${inputValue} символ \n Нужно удалить ${inputValue - maxLength}`);
  //   }

  //   if (target.validity.valueMissing) {
  //     validities.push('Заполните пожалуйста это поле');
  //   }
  // }else {
  //   if (target.validity.rangeUnderflow) {
  //     validities.push(`Цена должна быть не меньше ${minLength}\nВаша цена ${inputValue}`);
  //   }

  //   if (target.validity.rangeOverflow) {
  //     validities.push(`Цена должна быть не больше ${maxLength}\nВаша цена ${inputValue}`);
  //   }

  //   if (target.validity.stepMismatch) {
  //     validities.push(`Шаг числа ${step}`);
  //   }

  //   if (target.validity.valueMissing) {
  //     validities.push('Заполните пожалуйста это поле');
  //   }

  // }

  target.setCustomValidity(validities.join('. \n'));

  target.reportValidity();
};

formTitle.addEventListener('input', validityTitle);
// formPrice.addEventListener('input', validityInpyt);

const roomType = document.querySelector('#type');

formPrice.placeholder = roomType.options[roomType.selectedIndex].dataset.minPrice;
formPrice.min = roomType.options[roomType.selectedIndex].dataset.minPrice;

roomType.addEventListener('change', () => {
  const valueData = roomType.options[roomType.selectedIndex].dataset.minPrice;
  formPrice.min = valueData;
  formPrice.placeholder = valueData;
});

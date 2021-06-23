const announcementForm = document.querySelector('.ad-form');
const announcementFormFieldset = announcementForm.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filterFormFieldset = filterForm.querySelectorAll('fieldset');
const formTitle = announcementForm.querySelector('#title');

const DISABL_CSS_FORM = 'ad-form--disabled';

const disabledForm = (form, cssClass) => {
  form.classList.add(cssClass);
};

const disabledFieldset = (allFildset) => {
  allFildset.forEach((elem) => {
    elem.disabled = true;
  });
};

// disabledForm(announcementForm, DISABL_CSS_FORM);
// disabledFieldset(announcementFormFieldset);

// disabledForm(filterForm, DISABL_CSS_FORM);
// disabledFieldset(filterFormFieldset);

const validityInpytText = (evt) => {
  const input = evt.target;
  const validities = [];

  if (input.validity.tooShort) {
    validities.push(`Поле должно содержать минимум ${input.getAttribute('minlength')} символов \n Сейчас у вас введенно ${input.value.length} символ \n Осталось ввести ${input.getAttribute('minlength') - input.value.length}`);
  }

  if (input.validity.tooLong) {
    validities.push(`Поле должно содержать максимум 100 символов \n Сейчас у вас введенно ${input.value.length} символ \n Нужно удалить ${input.value.length - input.getAttribute('maxlength')}`);
  }

  if (input.validity.valueMissing) {
    validities.push('Заполните пожалуйста это поле');
  }

  input.setCustomValidity(validities.join('. \n'));

  input.reportValidity();
};

formTitle.addEventListener('input', validityInpytText);

// console.log(aaa);
// console.log(formTitle);

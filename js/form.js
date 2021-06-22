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

const validiti = (input, event) => {

  input.addEventListener(event, (evt) => {
    const validities = [];

    if (input.validity.tooShort) {
      validities.push(`Поле должно содержать минимум ${input.minlength} символов \n Сейчас у вас введенно ${input.value.length} символ \n Осталось ввести ${20 - input.value.length}`);
    }

    if (input.validity.tooLong) {
      validities.push('Поле должно содержать максимум 100 символов');
    }

    input.setCustomValidity(validities.join('. \n'));

    input.reportValidity();
  });

};
const aaa = [formTitle];

console.log(aaa);
console.log(formTitle.minlength.nodeValue);
validiti(formTitle, 'input');

//******Сообщения отправки формы */

const templateError = document.querySelector('#error').content;
const elementError = templateError.querySelector('.error');
const templateSuccess = document.querySelector('#success').content;
const elementSuccess = templateSuccess.querySelector('.success');

const ATTRIBUT_DATA_REQUEST = 'data-send-request';
const ATTRIBUT_DATA_CLOSE = 'data-modal-closed';
const TEXT_ERROR = 'Ошибка сервера, попробуйте перезагрузить страницу';
const TEXT_BUTTON = 'Закрыть сообщение';
let removeDialog;

const showDialog = (elem, callback) => {
  const dialog = elem.cloneNode(true);
  document.body.appendChild(dialog);

  const onModalKeydown = (evt) => {
    if (evt.key === 'Escape') {
      removeDialog(evt);
    }
  };

  removeDialog = (evt) => {
    dialog.remove();
    document.removeEventListener('keydown', onModalKeydown);

    if (evt.target.hasAttribute(ATTRIBUT_DATA_REQUEST)) {
      callback();
    }
  };

  const onModalClick = (evt) => {
    removeDialog(evt);
  };

  document.addEventListener('keydown', onModalKeydown);

  dialog.addEventListener('click', onModalClick);
};

const getMessageError = (elem, messageText, buttonText) => {
  const dialog = elem.cloneNode(true);
  const message = dialog.querySelector('.error__message');
  const button = dialog.querySelector('.error__button');

  message.textContent = messageText;
  button.textContent = buttonText;
  button.removeAttribute(ATTRIBUT_DATA_REQUEST);
  button.setAttribute(ATTRIBUT_DATA_CLOSE, '');

  return dialog;
};

const messageError = getMessageError(elementError, TEXT_ERROR, TEXT_BUTTON);

export { showDialog, messageError, elementError, elementSuccess };

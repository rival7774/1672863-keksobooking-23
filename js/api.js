import {showDialog, resetForm, messageError} from './form.js';

const URL_ADS = 'HTTPS://23.javascript.pages.academy/keksobooking/data';

const QUANTITY_ADS = 10;

//******Запрос методом гет */

const getAds = (onSuccess) => {
  fetch(URL_ADS)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }else {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    }).then((ads) => {
      onSuccess(ads.slice(0, QUANTITY_ADS));
    }).catch((error) => {
      showDialog(messageError);
      console.log(error);
    });
};

//******Запрос методом пост */

const URL_POST = 'HTTPS://23.javascript.pages.academy/keksobooking';

const postInquiry = (data, onSuccess, onError) => fetch(URL_POST, {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  mode: 'no-cors',
  body: data,
}).then((response) => {
  if (response.ok) {
    showDialog(onSuccess, null, resetForm);
  }else {
    throw new Error();
  }
})
  .catch(showDialog(onError, () => postInquiry(data, onSuccess, onError)));

export {getAds, postInquiry};

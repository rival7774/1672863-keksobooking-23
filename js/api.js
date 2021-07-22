const URL_ADS = 'HTTPS://23.javascript.pages.academy/keksobooking/data';
const URL_POST = 'HTTPS://23.javascript.pages.academy/keksobooking';

//******Запрос методом гет */

const requestAds = (onSuccess, onError) => {
  fetch(URL_ADS)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    }).then((ads) => {
      onSuccess(ads);
      return ads;
    }).catch(() => {
      onError();
    });
};

//******Запрос методом пост */

const sendAnnouncementAd = (data, onSuccess, onError) => {
  fetch(URL_POST, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    mode: 'no-cors',
    body: data,
  }).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      throw new Error();
    }
  })
    .catch(onError());
};

export {requestAds, sendAnnouncementAd};

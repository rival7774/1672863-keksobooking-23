import './data.js';
import {showAdsMap} from './map.js';
import {requestAds} from './api.js';
import './form.js';
import {showDialog, messageError} from './dialog.js';
import './utils/debounce.js';

let ads = [];

const fillAds = (adList) => {
  ads = adList;
};

const onErrorAdRequest = () => {
  showDialog(messageError);
};

const onSuccessfulAdRequest = (adList) => {
  fillAds(adList);
  showAdsMap(adList);
};

const getAds = () => ads;  //!!Б20. Модули не экспортируют изменяющиеся переменные. js/main.js export {ads};

requestAds(onSuccessfulAdRequest, onErrorAdRequest);

export {getAds};

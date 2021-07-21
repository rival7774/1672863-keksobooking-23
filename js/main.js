import './data.js';
import {showAdsMap} from './map.js';
import {getAds} from './api.js';
import './form.js';
import {showDialog, messageError} from './dialog.js';
import './utils/debounce.js';

let ads = [];

const fillAds = (arrayAds) => {
  ads = arrayAds;
};

const onErrorAdRequest = () => {
  showDialog(messageError);
};

const onSuccessfulAdRequest = (adArray) => {
  fillAds(adArray);
  showAdsMap(adArray);
};

getAds(onSuccessfulAdRequest, onErrorAdRequest);

export {ads};

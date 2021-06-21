import {getGeneratedAd} from './data.js';
import {getArrayOfDeclarations} from './util.js';
import './form.js';

const NUMBER_OF_ADS = 10;

const ads =getArrayOfDeclarations(NUMBER_OF_ADS);

const body = document.querySelector('body');
body.appendChild(getGeneratedAd(ads[0]));

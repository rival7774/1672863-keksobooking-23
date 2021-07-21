import {unlockForms, changeAddress, filterAds} from './form.js';
import {createAdElement} from './data.js';

const AMOUNT_OF_NUMBERS = 5;
const LAT_CENTER_TOKIO = 35.6894;
const LNG_CENTER_TOKIO = 139.692;
const AMOUNT_ADS = 10;

//******Создание карты */

const mymap = L.map('map-canvas')
  .on('load', () => {
    unlockForms();
  })
  .setView({
    lat: 35.6894,
    lng: 139.692,
  }, 10);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mymap);

//*****Создание маркеров */

const addMarkerToGroup = (marker, group) => {
  marker.addTo(group);
};

const createSimilarMarker = ({urlIcon, size, anchor, draggable, lat, lng}) => {
  const icon = L.icon({
    iconUrl: urlIcon,

    iconSize: size,
    iconAnchor: anchor,
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      draggable: draggable,
      icon: icon,
    },
  );

  return marker;
};

//*****Получение координат */

const getAddress = (marker) => {
  const lat = marker.getLatLng().lat.toFixed(AMOUNT_OF_NUMBERS);
  const lng = marker.getLatLng().lng.toFixed(AMOUNT_OF_NUMBERS);

  return `Широта - ${lat}, высота - ${lng}`;
};

//*****Главный маркер */

const mainMarker = createSimilarMarker(
  {
    urlIcon: '../img/main-pin.svg',
    size: [52, 52],
    anchor: [26, 52],
    draggable: true,
    lat: LAT_CENTER_TOKIO,
    lng: LNG_CENTER_TOKIO,
  }).addTo(mymap);

mainMarker.on('move', (evt) => {
  const address = getAddress(evt.target);
  changeAddress(address);
});

const resetMainMarker = () => {
  mainMarker.setLatLng({lat: LAT_CENTER_TOKIO, lng: LNG_CENTER_TOKIO});
};

const addressDefault = getAddress(mainMarker);

changeAddress(addressDefault);

//*****Похожие маркеры */

const markerGroup = L.layerGroup().addTo(mymap);

const renderAds = (adArray) => {
  markerGroup.clearLayers();

  adArray.forEach((obj) => {
    const {lat, lng} = obj.location;

    const regularMarker = {
      urlIcon: '../img/pin.svg',
      size: [40, 40],
      anchor: [20, 40],
      draggable: false,
      lat: lat,
      lng: lng,
    };

    const marker = createSimilarMarker(regularMarker);
    marker.bindPopup(createAdElement(obj)).openPopup();
    addMarkerToGroup(marker, markerGroup);
  });
};

const showAdsMap = (adArray) => {
  const filteredAds = filterAds(adArray);
  renderAds(filteredAds.slice(0, AMOUNT_ADS));
};

export {createSimilarMarker, addMarkerToGroup, mymap, renderAds, resetMainMarker, addressDefault, showAdsMap};

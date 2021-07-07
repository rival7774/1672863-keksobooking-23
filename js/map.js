import {blockForms, unlockForms, changeAddress} from './form.js';
import {getGeneratedAd} from './data.js';
import {getArrayOfDeclarations} from './util.js';

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

const getGroupMarkers = (marker, group) => {
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

const getAddress = (marker) => {
  const lat = marker.getLatLng().lat.toFixed(5);
  const lng = marker.getLatLng().lng.toFixed(5);

  return `Широта - ${lat}, высота - ${lng}`;
};
//!!!Найти критерий по именованию событий

const mainMarker = createSimilarMarker({urlIcon: '../img/main-pin.svg', size: [52, 52], anchor: [26, 52], draggable: true, lat: 35.6894, lng: 139.692}).addTo(mymap);

changeAddress(getAddress(mainMarker));

mainMarker.on('move', (evt) => {
  const address = getAddress(evt.target);
  changeAddress(address);
});

const ads = getArrayOfDeclarations(10);

const markerGroup = L.layerGroup().addTo(mymap);

ads.forEach((obj) => {
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
  marker.bindPopup(getGeneratedAd(obj)).openPopup();
  getGroupMarkers(marker, markerGroup);
});

export {createSimilarMarker, getGroupMarkers, mymap};

import {blockForms, unlockForms, changeAddress} from './form.js';
import {getAd} from './data.js';
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

const AMOUNTOFNUMBERS = 5;

const getAddress = (marker) => {
  const lat = marker.getLatLng().lat.toFixed(AMOUNTOFNUMBERS);
  const lng = marker.getLatLng().lng.toFixed(AMOUNTOFNUMBERS);

  return `Широта - ${lat}, высота - ${lng}`;
};
//!!!Найти критерий по именованию событий

const mainMarker = createSimilarMarker(
  {
    urlIcon: '../img/main-pin.svg',
    size: [52, 52],
    anchor: [26, 52],
    draggable: true,
    lat: 35.6894,
    lng: 139.692,
  }).addTo(mymap);

changeAddress(getAddress(mainMarker));

mainMarker.on('move', (evt) => {
  const address = getAddress(evt.target);
  changeAddress(address);
});

const NUMBEROFOBJECTS = 10;

const ads = getArrayOfDeclarations(NUMBEROFOBJECTS);

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
  marker.bindPopup(getAd(obj)).openPopup();
  addMarkerToGroup(marker, markerGroup);
});

export {createSimilarMarker, addMarkerToGroup, mymap};

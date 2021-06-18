import {getRandomValueArray, getRandomInRange} from './util.js';

const typeOfHousing = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const time = ['12:00', '13:00', '14:00'];
const comfort = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const foto = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const getRandomAds = () => ({
  author: {
    avatar: `img/avatars/user0${  getRandomInRange(1, 8)  }.png`,
  },
  offer: {
    title: 'Шикарные апортаменты',
    address: 'location.53.5303000° location.49.3461000°',
    price: getRandomInRange(1000, 10000),
    type: typeOfHousing[getRandomInRange(0, typeOfHousing.length - 1)],
    rooms: getRandomInRange(1, 6),
    guests: getRandomInRange(1, 20),
    checkin: time[getRandomInRange(0, time.length - 1)],
    checkout: time[getRandomInRange(0, time.length - 1)],
    features: getRandomValueArray(comfort),
    description: 'Прекрасное описание',
    photos: getRandomValueArray(foto),
  },
  location: {
    lat: getRandomInRange(35.65000, 35.70000, 5),
    lng: getRandomInRange(139.70000, 139.80000, 5),
  },
});

export {getRandomAds};

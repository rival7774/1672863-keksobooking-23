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

const template = document.querySelector('#card').content;

const setVisible = (elem, condition) => {
  elem.hidden = condition;
  return elem;
};

const translation = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel:'Отель',
};

const getGeneratedAd = (obj) => {
  const popup = template.querySelector('.popup');
  const element = popup.cloneNode(true);

  const title = element.querySelector('.popup__title');
  const address = element.querySelector('.popup__text--address');
  const price = element.querySelector('.popup__text--price');
  const type = element.querySelector('.popup__type');
  const capacity = element.querySelector('.popup__text--capacity');
  const timeText = element.querySelector('.popup__text--time');
  const featuresPopup = element.querySelector('.popup__features');
  const description = element.querySelector('.popup__description');
  const photos = element.querySelector('.popup__photos');
  const photo = photos.querySelector('.popup__photo');
  const avatar = element.querySelector('.popup__avatar');

  if (obj.offer.title) {
    title.textContent = obj.offer.title;
  }else {
    setVisible(title, true);
  }

  if (obj.offer.address) {
    address.textContent = obj.offer.address;
  }else {
    setVisible(address, true);
  }

  if (obj.offer.price) {
    price.innerHTML = `${obj.offer.price} <span>₽/ночь</span>`;
  }else {
    setVisible(price, true);
  }

  if (obj.offer.type) {
    type.textContent = translation[obj.offer.type];
  }else {
    setVisible(type, true);
  }

  if (obj.offer.rooms && obj.offer.guests) {
    capacity.textContent = `${obj.offer.rooms} комнаты/a для ${obj.offer.guests} гостей`;
  }else {
    setVisible(capacity, true);
  }

  if (obj.offer.rooms && obj.offer.guests) {
    capacity.textContent = `${obj.offer.rooms} комнаты/a для ${obj.offer.guests} гостей`;
  }else {
    setVisible(capacity, true);
  }

  if (obj.offer.checkin && obj.offer.checkout) {
    timeText.textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
  }else {
    setVisible(timeText, true);
  }

  if (obj.offer.features) {
    featuresPopup.innerHTML = '';
    obj.offer.features.forEach((elem) => {
      featuresPopup.insertAdjacentHTML('beforeend', `<li class="popup__feature popup__feature--${elem}"></li>`);
    });
  }else {
    setVisible(featuresPopup, true);
  }

  if (obj.offer.description) {
    description.textContent = obj.offer.description;
  }else {
    setVisible(description, true);
  }

  if (obj.offer.photos) {
    photos.innerHTML = '';

    obj.offer.photos.forEach((value) => {
      const elem = photo.cloneNode(false);
      elem.src = value;
      photos.appendChild(elem);
    });
  }else {
    photos.style = 'display : none !important';
    setVisible(photos, true);
  }

  if (obj.author.avatar) {
    avatar.src = obj.author.avatar;
  }else {
    setVisible(avatar, true);
  }

  return element;
};

export {getRandomAds, getGeneratedAd};

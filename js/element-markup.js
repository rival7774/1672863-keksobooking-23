import {getRandomAds} from './data.js';

const template = document.querySelector('#card').content;

const ad = getRandomAds();

const setVisible = (elem, condition) => {
  elem.hidden = condition;
  return elem;
};

const map = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel:'Отель',
};

const getGeneratedAd = (obj) => {
  const popup = template.querySelector('.popup');
  const element = popup.cloneNode(true);
  const fragment = document.createDocumentFragment();

  const title = element.querySelector('.popup__title');
  const address = element.querySelector('.popup__text--address');
  const price = element.querySelector('.popup__text--price');
  const type = element.querySelector('.popup__type');
  const capacity = element.querySelector('.popup__text--capacity');
  const time = element.querySelector('.popup__text--time');
  const features = element.querySelector('.popup__features');
  const itemsFeatures = features.children;
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
    type.textContent = map[obj.offer.type];
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
    time.textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
  }else {
    setVisible(time, true);
  }

  if (obj.offer.description) {
    description.textContent = obj.offer.description;
  }else {
    setVisible(description, true);
  }

  if (obj.offer.photos) {
    photos.innerHTML = '';

    ad.offer.photos.forEach((value) => {
      const elem = photo.cloneNode(false);
      elem.src = value;
      photos.appendChild(elem);
    });
  }else {
    photos.innerHTML = '';
    setVisible(photos, true);   //???Не работает хиден
  }

  if (obj.author.avatar) {
    avatar.src = obj.author.avatar;
  }else {
    setVisible(avatar, true);
  }

  return fragment.appendChild(element);
};

const body = document.querySelector('body');
body.appendChild(getGeneratedAd(ad));

const popup = template.querySelector('.popup');
const element = popup.cloneNode(true);
const features = element.querySelector('.popup__features');
const itemsFeatures = features.children;


for (let i = 0; i < itemsFeatures.length; i++) {
  const elem = itemsFeatures[i];

  for (let k = 0; k < ad.offer.features.length; k++) {
    const bbb = ad.offer.features[k];
    const classElem = `popup__feature--${bbb}`;

    if (elem.classList.contains(classElem)) {
      elem.textContent = bbb;
    }
  }

  if (elem.textContent === '') {
    elem.remove();
  }
}


// console.log(itemsFeatures[0].textContent === '');
// console.log(itemsFeatures.length);
// console.log(features);
// console.log(getGeneratedAd(ad));
// console.log(setVisible(title, ad.offer.title));
// console.log(element);

// Выведите заголовок объявления offer.title в заголовок .popup__title.
// Выведите адрес offer.address в блок .popup__text--address.
// Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
// В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:
// Квартира для flat
// Бунгало для bungalow
// Дом для house
// Дворец для palace
// Отель для hotel
// Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
// Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».
// В список .popup__features выведите все доступные удобства в объявлении.
// В блок .popup__description выведите описание объекта недвижимости offer.description.
// В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
// Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.
// Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.

const hideElement = (elem) => {
  elem.classList.add('hidden');
};

const createElementFeature = (endClass) => {
  const elem = document.createElement('li');
  elem.classList.add('popup__feature', `popup__feature--${endClass}`);
  return elem;
};

const insertElementFeatures = (arrayFeatures, insertIntoElement) => {
  arrayFeatures.forEach((elem) => {
    const feature = createElementFeature(elem);
    insertIntoElement.appendChild(feature);
  });
};

const createPhotos = (arraySrc, photoElement) => {
  const allPhoto = document.createDocumentFragment();

  arraySrc.forEach((value) => {
    const elem = photoElement.cloneNode(false);
    elem.src = value;
    allPhoto.appendChild(elem);
  });

  return allPhoto;
};

const translation = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel:'Отель',
};

const getAd = (obj) => {
  const template = document.querySelector('#card').content;
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
    hideElement(title);
  }

  if (obj.offer.address) {
    address.textContent = obj.offer.address;
  }else {
    hideElement(address);
  }

  if (obj.offer.price) {
    price.innerHTML = `${obj.offer.price} <span>₽/ночь</span>`;
  }else {
    hideElement(price);
  }

  if (obj.offer.type) {
    type.textContent = translation[obj.offer.type];
  }else {
    hideElement(type);
  }

  if (obj.offer.rooms && obj.offer.guests) {
    capacity.textContent = `${obj.offer.rooms} комнаты/a для ${obj.offer.guests} гостей`;
  }else {
    hideElement(capacity);
  }

  if (obj.offer.rooms && obj.offer.guests) {
    capacity.textContent = `${obj.offer.rooms} комнаты/a для ${obj.offer.guests} гостей`;
  }else {
    hideElement(capacity);
  }

  if (obj.offer.checkin && obj.offer.checkout) {
    timeText.textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
  }else {
    hideElement(timeText);
  }

  if (obj.offer.features) {
    featuresPopup.innerHTML = '';
    insertElementFeatures(obj.offer.features, featuresPopup);
  }else {
    hideElement(featuresPopup);
  }

  if (obj.offer.description) {
    description.textContent = obj.offer.description;
  }else {
    hideElement(description);
  }

  if (obj.offer.photos) {
    photos.innerHTML = '';
    photos.appendChild(createPhotos(obj.offer.photos, photo));
  }else {
    hideElement(photos);
  }

  if (obj.author.avatar) {
    avatar.src = obj.author.avatar;
  }else {
    hideElement(avatar);
  }

  return element;
};

export {getAd};

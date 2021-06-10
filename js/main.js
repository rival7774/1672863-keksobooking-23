//!!*Ссылка на источник генерации https://myrusakov.ru/js-random-numbers.html
const getRandomInRange = (min, max, number) => {
  let absMin = Math.abs(min);
  let absMax = Math.abs(max);

  if (absMin > absMax) {
    const temp = absMin;
    absMin = absMax;
    absMax = temp;
  }

  const theOutcome = Math.random() * (absMax - absMin + 1) + absMin;

  return number ? theOutcome.toFixed(number) : Math.floor(theOutcome);
};

getRandomInRange(-100, -10, 2);

//массива из 10 сгенерированных JS-объектов
//Каждый объект массива — описание похожего объявления неподалёку
//!!!* author, объект — описывает автора. Содержит одно поле:
// avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются.
//!* offer, объект — содержит информацию об объявлении. Состоит из полей:
// title, строка — заголовок предложения. Придумайте самостоятельно.
// address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.x}}, {{location.y}}.
// price, число — стоимость. Случайное целое положительное число.
// type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.
// rooms, число — количество комнат. Случайное целое положительное число.
// guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.
// checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
// checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
// features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
// description, строка — описание помещения. Придумайте самостоятельно.
// photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.
//!* location, объект — местоположение в виде географических координат. Состоит из двух полей:
// lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
// lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.

const typeOfHousing = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const time = ['12:00', '13:00', '14:00'];
const comfort = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const foto = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const randomAvatar = `img/avatars/user0${  getRandomInRange(1, 8)  }.png`;

const getRandomLengthArray = (arr) => {
  const array = Array.from({length: getRandomInRange(1, arr.length)});

  let index = 0;
  while (index < array.length) {
    const randomValue = arr[getRandomInRange(0, arr.length)];

    if (!array.includes(randomValue)) {
      array[index] = randomValue;
      index++;
    }
  }
  return array;
};

const getRandomAds = () => {
  const object = {
    author: {
      avatar: randomAvatar,
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
      features: getRandomLengthArray(comfort),
      description: 'описание помещения',
      photos: getRandomLengthArray(foto),
    },
    location: {
      lat: getRandomInRange(35.65000, 35.70000, 5),
      lng: getRandomInRange(139.70000, 139.80000, 5),
    },
  };
  return object;
};

const NUMBER_OF_ADS = 10;

const getArrayOfDeclarations = (numberOfAds) => {
  // const array = Array.from({length: numberOfAds}).fill(1);

  // for (let index = 0; index < numberOfAds; index++) {
  //   array[index] = getRandomAds();
  // }

  // array.forEach((element, index) => {
  //   array[index] = getRandomAds();
  // });
  // return array;

  return new Array(numberOfAds).fill('1').map(() => getRandomAds());
};

console.log(getArrayOfDeclarations(NUMBER_OF_ADS));

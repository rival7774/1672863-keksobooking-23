import {getRandomAds} from './data.js';

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

const getRandomValueArray = (arr) => {
  const copyArr = arr.slice();
  const array = [];
  const randomLength = getRandomInRange(1, copyArr.length);

  for (let i = 0; i < randomLength; i++) {
    const randomNumber = getRandomInRange(0, copyArr.length - 1);
    const randomValue = copyArr[randomNumber];
    array.push(randomValue);
    copyArr.splice(randomNumber, 1);
  }

  return array;
};

const getArrayOfDeclarations = (numberOfAds) => Array.from({length: numberOfAds}).map(() => getRandomAds());

export {getRandomInRange, getArrayOfDeclarations, getRandomValueArray};

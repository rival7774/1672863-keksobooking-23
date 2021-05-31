//!! Ссылка на источник генерации https://myrusakov.ru/js-random-numbers.html
const getRandomInRange = (min, max) => {
  if (!(min < 0) && !(min >= max)) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else if (!(min < 0) && min !== max) {
    return Math.floor(Math.random() * (min - max + 1)) + max;
  } else if (min === max) {
    return min;
  }
};

getRandomInRange(0, 1);

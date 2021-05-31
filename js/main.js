//!! Ссылка на источник генерации https://myrusakov.ru/js-random-numbers.html
const getRandomInRange = (min, max) => {
  if (!(min >= max)) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else if (min !== max) {
    return Math.abs(Math.floor(Math.random() * (min - max + 1)) + max);
  } else if (min === max) {
    return min;
  }
};

getRandomInRange(0, 1);
// https://coderoad.ru/29101892/%D0%9A%D0%B0%D0%BA-%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C-%D1%82%D0%BE%D1%87%D0%BD%D0%BE%D1%81%D1%82%D1%8C-%D1%87%D0%B8%D1%81%D0%B5%D0%BB-%D1%81-%D0%BF%D0%BB%D0%B0%D0%B2%D0%B0%D1%8E%D1%89%D0%B5%D0%B9-%D0%B7%D0%B0%D0%BF%D1%8F%D1%82%D0%BE%D0%B9-%D0%BE%D0%B4%D0%B8%D0%BD%D0%B0%D0%BA%D0%BE%D0%B2%D0%BE%D0%B9-%D1%81-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E-Javascript
const getRandomInRange1 = (min, max, number) => {
  let theOutcome;
  if (!(min >= max)) {
    theOutcome = Math.random() * (max - min + 1) + min;
  } else if (min !== max) {
    theOutcome = Math.abs(Math.random() * (min - max + 1) + max);
  } else if (min === max) {
    theOutcome = min;
  }
  return theOutcome.toFixed(number);
};

getRandomInRange1(0, 10, 5);
console.log(getRandomInRange1(0, -10, 5));

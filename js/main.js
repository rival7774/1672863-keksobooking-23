//!! Ссылка на источник генерации https://myrusakov.ru/js-random-numbers.html
// const getRandomInRange = (min, max) => {
//   if (!(min >= max) && min >= 0) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   } else if (min !== max && !(max < 0) && !(min < 0) && min > max) {
//     return Math.abs(Math.floor(Math.random() * (min - max + 1)) + max);
//   } else if ((max < 0 || min < 0) && Math.abs(max) > Math.abs(min)) {
//     return Math.random() * (Math.abs(max) - Math.abs(min) + 1) + Math.abs(min);
//   } else if ((max < 0 || min < 0) && Math.abs(max) < Math.abs(min)) {
//     return Math.random() * (Math.abs(min) - Math.abs(max) + 1) + Math.abs(max);
//   } else if (min === max) {
//     return min;
//   }
// };

const getRandomInRange = (min, max, number) => {
  if (!(Math.abs(min) >= Math.abs(max))) {
    return Math.random() * (Math.abs(max) - Math.abs(min) + 1) + Math.abs(min);
  } else if (min !== max && Math.abs(min) > Math.abs(max)) {
    return Math.random() * (Math.abs(min) - Math.abs(max) + 1) + Math.abs(max);
  } else if (min === max) {
    return min;
  }
};

getRandomInRange(0, 1);
//!! https://coderoad.ru/29101892/%D0%9A%D0%B0%D0%BA-%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C-%D1%82%D0%BE%D1%87%D0%BD%D0%BE%D1%81%D1%82%D1%8C-%D1%87%D0%B8%D1%81%D0%B5%D0%BB-%D1%81-%D0%BF%D0%BB%D0%B0%D0%B2%D0%B0%D1%8E%D1%89%D0%B5%D0%B9-%D0%B7%D0%B0%D0%BF%D1%8F%D1%82%D0%BE%D0%B9-%D0%BE%D0%B4%D0%B8%D0%BD%D0%B0%D0%BA%D0%BE%D0%B2%D0%BE%D0%B9-%D1%81-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E-Javascript
// const getRandomInRange1 = (min, max, number) => {
//   let theOutcome;
//   if (!(min >= max) && min >= 0) {
//     theOutcome = Math.random() * (max - min + 1) + min;
//   } else if (min !== max && !(max < 0) && !(min < 0) && min > max) {
//     theOutcome = Math.random() * (min - max + 1) + max;
//   } else if ((max < 0 || min < 0) && Math.abs(max) > Math.abs(min)) {
//     theOutcome =
//       Math.random() * (Math.abs(max) - Math.abs(min) + 1) + Math.abs(min);
//   } else if ((max < 0 || min < 0) && Math.abs(max) < Math.abs(min)) {
//     theOutcome =
//       Math.random() * (Math.abs(min) - Math.abs(max) + 1) + Math.abs(max);
//   } else if (min === max) {
//     theOutcome = min;
//   }
//   return theOutcome.toFixed(number);
// };

// getRandomInRange1(0, 10, 5);
// console.log(getRandomInRange1(0, -10, 5));

const getRandomInRange1 = (min, max, number) => {
  let theOutcome;
  if (!(Math.abs(min) >= Math.abs(max))) {
    theOutcome =
      Math.random() * (Math.abs(max) - Math.abs(min) + 1) + Math.abs(min);
  } else if (min !== max && Math.abs(min) > Math.abs(max)) {
    theOutcome =
      Math.random() * (Math.abs(min) - Math.abs(max) + 1) + Math.abs(max);
  } else if (min === max) {
    theOutcome = min;
  }
  return theOutcome.toFixed(number);
};

getRandomInRange1(0, 10, 5);
console.log(getRandomInRange1(-5, -10, 5));

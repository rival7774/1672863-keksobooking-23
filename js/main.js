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

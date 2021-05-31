//!!*Ссылка на источник генерации https://myrusakov.ru/js-random-numbers.html
const getRandomInRange = (min, max, number) => {
  let absMin = Math.abs(min);
  let absMax = Math.abs(max);
  let theOutcome;

  if (absMin > absMax) {
    const temp = absMin;
    absMin = absMax;
    absMax = temp;
  }

  if (!number) {
    theOutcome = Math.floor(Math.random() * (absMax - absMin + 1) + absMin);
    return theOutcome;
  }

  theOutcome = Math.random() * (absMax - absMin + 1) + absMin;
  return theOutcome.toFixed(number);
};

//!! ************************************************************************************

const getRandomInRange1 = (min, max) => {
  let absMin = Math.abs(min);
  let absMax = Math.abs(max);

  if (absMin > absMax) {
    const temp = absMin;
    absMin = absMax;
    absMax = temp;
  }

  return Math.floor(Math.random() * (absMax - absMin + 1) + absMin);
};

const getRandomInRange2 = (min, max, number) => {
  const theOutcome = getRandomInRange(min, max) + Math.random();

  return theOutcome.toFixed(number);
};

getRandomInRange2(0, 10, 5);

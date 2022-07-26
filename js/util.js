const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomSubArray = (arr) => {
  const shuffled = arr.slice();
  let swap, index, i = arr.length;
  while (i--) {
    index = Math.floor(Math.random() * (i + 1));
    swap = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = swap;
  }
  return shuffled.slice(0, getRandomPositiveInteger(0, shuffled.length));
};

const getSubList = (listTemplate, list) => {
  listTemplate.forEach((listTemplateItem) => {
    const isNecessary = list.some((listItem) =>
      listTemplateItem.classList.contains(`popup__feature--${listItem}`));

    if(!isNecessary) {
      listTemplateItem.remove();
    }
  });
};

const debounce = (cb, timeoutDelay) => {
  let timeoutID;
  return (...rest) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  getRandomSubArray,
  getSubList,
  debounce
};

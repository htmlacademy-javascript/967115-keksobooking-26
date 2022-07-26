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
  getSubList,
  debounce
};

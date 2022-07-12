const advertisementForm = document.querySelector('.ad-form');
const advertisementFields = advertisementForm.querySelectorAll('fieldset');
const filtersForm = document.querySelector('.map__filters');
const filtersFormSelects = filtersForm.querySelectorAll('select'); // Может лучше через childNode собрать потомков первого уровня?
const filtersFormFeatures = filtersForm.querySelector('fieldset'); //

// Блин, классное схлапывание. В копилку

function toggleActiveMode (isActive) {
  advertisementForm.classList.toggle('ad-form--disabled', isActive);
  advertisementFields.forEach((advertisementField) => {
    advertisementField.disabled = isActive;
  });
  filtersForm.classList.toggle('ad-form--disabled', isActive);
  filtersFormSelects.forEach((filtersFormSelect) => {
    filtersFormSelect.disabled = isActive;
  });
  filtersFormFeatures.disabled = isActive;
}

export {toggleActiveMode};

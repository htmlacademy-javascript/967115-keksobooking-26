const advertisementForm = document.querySelector('.ad-form');
const advertisementFields = advertisementForm.querySelectorAll('fieldset');
const filtersForm = document.querySelector('.map__filters');
const filtersFormSelects = filtersForm.querySelectorAll('select'); // Может лучше через childNode собрать потомков первого уровня?
const filtersFormFeatures = filtersForm.querySelector('fieldset'); //

function turnActiveModeOn () {
  advertisementForm.classList.remove('ad-form--disabled');
  advertisementFields.forEach((advertisementField) => {
    advertisementField.disabled = false;
  });
  filtersForm.classList.remove('ad-form--disabled');
  filtersFormSelects.forEach((filtersFormSelect) => {
    filtersFormSelect.disabled = false;
  });
  filtersFormFeatures.disabled = false;
}

function turnActiveModeOff () {
  advertisementForm.classList.add('ad-form--disabled');
  advertisementFields.forEach((advertisementField) => {
    advertisementField.disabled = true;
  });
  filtersForm.classList.add('ad-form--disabled');
  filtersFormSelects.forEach((filtersFormSelect) => {
    filtersFormSelect.disabled = true;
  });
  filtersFormFeatures.disabled = true;
}

export {turnActiveModeOff, turnActiveModeOn};

import {showAlert} from './alert.js';
import {sendAdverisement} from './data.js';

const advertisementForm = document.querySelector('.ad-form');
const advertisementFields = advertisementForm.querySelectorAll('fieldset');
const filtersForm = document.querySelector('.map__filters');
const filtersFormSelects = filtersForm.querySelectorAll('select'); // Может лучше через childNode собрать потомков первого уровня?
const filtersFormFeatures = filtersForm.querySelector('fieldset'); //
const roomsNumber = advertisementForm.querySelector('#room_number');
const capacity = advertisementForm.querySelector('#capacity');

const guestsOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

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

function guestsValidation () {
  return guestsOptions[roomsNumber.value].includes(capacity.value);
}
function getGuestsErrorMessage () {
  return (roomsNumber.value === '100' || capacity.value === '0') ?
    'Большие помещения не созданы для гостей. И наоборот...' :
    'Добавьте комнат или уменьшите количество гостей';
}

function formValidate () {
  const pristine = new Pristine(advertisementForm, {
    classTo: 'form__item',
    errorClass: 'form__item--invalid',
    successClass: 'form__item--valid',
    errorTextParent: 'form__item',
    errorTextTag: 'div',
    errorTextClass: 'form__error'
  });

  pristine.addValidator(roomsNumber, guestsValidation, getGuestsErrorMessage);
  pristine.addValidator(capacity, guestsValidation, getGuestsErrorMessage);

  advertisementForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      const formData = new FormData(advertisementForm);
      sendAdverisement(
        showAlert,
        showAlert,
        formData,
        advertisementForm
      );
    }

  });
}

export {toggleActiveMode, formValidate};

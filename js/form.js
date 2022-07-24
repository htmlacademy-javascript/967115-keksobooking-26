import {showSuccessAlert, showErrorAlert} from './alert.js';
import {sendAdvertisement} from './data.js';
import {resetCoordinates} from './map.js';
import {resetSlider} from './slider.js';
import {debounce} from './util.js';

const PIN_DELAY = 500;

const adFormElement = document.querySelector('.ad-form');
const roomsNumberElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const housingTypeFilterElement = document.querySelector('#housing-type');
const housingPriceFilterElement = document.querySelector('#housing-price');
const housingRoomsFilterElement = document.querySelector('#housing-rooms');
const housingGuestsFilterElement = document.querySelector('#housing-guests');
const housingFeaturesFilterElement = document.querySelector('#housing-features');

const guestsOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

function guestsValidation () {
  return guestsOptions[roomsNumberElement.value].includes(capacityElement.value);
}
function getGuestsErrorMessage () {
  return (roomsNumberElement.value === '100' || capacityElement.value === '0') ?
    'Большие помещения не созданы для гостей. И наоборот...' :
    'Добавьте комнат или уменьшите количество гостей';
}

function showAlertResetForm (message) {
  resetForms();
  showSuccessAlert(message);
}

function formValidate () {
  const pristine = new Pristine(adFormElement, {
    classTo: 'form__item',
    errorClass: 'form__item--invalid',
    successClass: 'form__item--valid',
    errorTextParent: 'form__item',
    errorTextTag: 'div',
    errorTextClass: 'form__error'
  });

  pristine.addValidator(roomsNumberElement, guestsValidation, getGuestsErrorMessage);
  pristine.addValidator(capacityElement, guestsValidation, getGuestsErrorMessage);

  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      const formData = new FormData(adFormElement);
      sendAdvertisement(
        showAlertResetForm,
        showErrorAlert,
        formData
      );
    }

  });
}

function resetForms () {
  adFormElement.reset();
  resetSlider();
  resetCoordinates();
}

const resetButtonElement = document.querySelector('.ad-form__reset');

resetButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForms();
});


function setFilters (cb) {
  housingTypeFilterElement.addEventListener('change', debounce(() => cb(), PIN_DELAY));
  housingPriceFilterElement.addEventListener('change', debounce(() => cb(), PIN_DELAY));
  housingRoomsFilterElement.addEventListener('change', debounce(() => cb(), PIN_DELAY));
  housingGuestsFilterElement.addEventListener('change', debounce(() => cb(), PIN_DELAY));
  housingFeaturesFilterElement.addEventListener('change', debounce(() => cb(), PIN_DELAY));
}


export {formValidate, setFilters};

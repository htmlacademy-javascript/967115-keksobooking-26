import {showSuccessAlert, showErrorAlert} from './alert.js';
import {sendAdvertisement} from './data.js';
import {resetCoordinates} from './map.js';
import {resetSlider} from './slider.js';

const adFormElement = document.querySelector('.ad-form');
const roomsNumberElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');

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
  const formElement = document.querySelector('.ad-form');
  formElement.reset();
  resetSlider();
  resetCoordinates();
}

const resetButtonElement = document.querySelector('.ad-form__reset');

resetButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForms();
});

export {formValidate};

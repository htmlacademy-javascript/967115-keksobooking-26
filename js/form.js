import {showAlert} from './alert.js';
import {sendAdvertisement} from './data.js';
import {resetForms} from './reset.js';

const advertisementForm = document.querySelector('.ad-form');
const roomsNumber = advertisementForm.querySelector('#room_number');
const capacity = advertisementForm.querySelector('#capacity');

const guestsOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

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
      sendAdvertisement(
        showAlert,
        showAlert,
        formData
      );
    }

  });
}


const resetButton = document.querySelector('.ad-form__reset');

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForms();
});

export {formValidate};

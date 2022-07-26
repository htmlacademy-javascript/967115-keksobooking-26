import {showSuccessAlert, showErrorAlert} from './alert.js';
import {sendAdvertisement} from './data.js';
import {resetCoordinates} from './map.js';
import {resetSlider, updateMinOption} from './slider.js';
import {debounce} from './util.js';

const PIN_DELAY = 500;
const MIN_PRICE = {
  'flat': 1000,
  'bungalow': 0,
  'house': 5000,
  'palace': 10000,
  'hotel': 3000
};

const adFormElement = document.querySelector('.ad-form');
const roomsNumberElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const timeinElement = adFormElement.querySelector('#timein');
const timeoutElement = adFormElement.querySelector('#timeout');
const typeElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');
const mapFiltersFormElement = document.querySelector('.map__filters');
const housingTypeFilterElement = document.querySelector('#housing-type');
const housingPriceFilterElement = document.querySelector('#housing-price');
const housingRoomsFilterElement = document.querySelector('#housing-rooms');
const housingGuestsFilterElement = document.querySelector('#housing-guests');
const housingFeaturesFilterElement = document.querySelector('#housing-features');
const resetButtonElement = document.querySelector('.ad-form__reset');

const guestsOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const validateGuests = () => guestsOptions[roomsNumberElement.value].includes(capacityElement.value);

const getGuestsErrorMessage = () => (roomsNumberElement.value === '100' || capacityElement.value === '0') ?
  'Большие помещения не созданы для гостей. И наоборот...' :
  'Добавьте комнат или уменьшите количество гостей';

const resetForms = () => {
  adFormElement.reset();
  mapFiltersFormElement.reset();
  resetSlider();
  resetCoordinates();
};


const setFilters = (cb) => {
  housingTypeFilterElement.addEventListener('change', debounce(() => cb(), PIN_DELAY));
  housingPriceFilterElement.addEventListener('change', debounce(() => cb(), PIN_DELAY));
  housingRoomsFilterElement.addEventListener('change', debounce(() => cb(), PIN_DELAY));
  housingGuestsFilterElement.addEventListener('change', debounce(() => cb(), PIN_DELAY));
  housingFeaturesFilterElement.addEventListener('change', debounce(() => cb(), PIN_DELAY));
};

const resetSuccessForm = (message) => {
  resetForms();
  showSuccessAlert(message);
};

const setInitialMapAndForms = (cb) => {
  resetButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForms();
    cb();
  });

  const pristine = new Pristine(adFormElement, {
    classTo: 'form__item',
    errorClass: 'form__item--invalid',
    successClass: 'form__item--valid',
    errorTextParent: 'form__item',
    errorTextTag: 'div',
    errorTextClass: 'form__error'
  });

  pristine.addValidator(roomsNumberElement, validateGuests, getGuestsErrorMessage);
  pristine.addValidator(capacityElement, validateGuests, getGuestsErrorMessage);

  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      const formData = new FormData(adFormElement);
      sendAdvertisement(
        resetSuccessForm,
        showErrorAlert,
        formData
      );
    }

  });
};

timeinElement.addEventListener('change', () => {
  timeoutElement.value = timeinElement.value;
});

timeoutElement.addEventListener('change', () => {
  timeinElement.value = timeoutElement.value;
});

updateMinOption(MIN_PRICE[typeElement.value]);
typeElement.addEventListener('change', () => {
  const customerPrice = priceElement.value;
  updateMinOption(MIN_PRICE[typeElement.value]);
  priceElement.value = customerPrice;
  priceElement.min = MIN_PRICE[typeElement.value];
  typeElement.placeholder = MIN_PRICE[typeElement.value];
});

export {setFilters, setInitialMapAndForms};

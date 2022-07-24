import {formValidate,
  setFilters} from './form.js';
import {createPins} from './map.js';
import './slider.js';
import {getAdvertisements} from './data.js';
import './alert.js';
import {showSuccessAlert} from './alert.js';
import './filter.js';

formValidate();

getAdvertisements((data) => {
  createPins(data);
  setFilters(() => createPins(data));
},
showSuccessAlert);

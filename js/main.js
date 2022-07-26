import {formValidate,
  setFilters, setInitialMapAndForms} from './form.js';
import {createPins} from './map.js';
import './slider.js';
import {getAdvertisements} from './data.js';
import './alert.js';
import {showErrorAlert} from './alert.js';
import './filter.js';
import './images.js';

formValidate();

getAdvertisements((data) => {
  createPins(data);
  setFilters(() => createPins(data));
  setInitialMapAndForms(() => createPins(data));
},
showErrorAlert);

import {formValidate} from './form.js';
import {createPin} from './map.js';
import './slider.js';
import {getAdvertisements} from './data.js';
import './alert.js';
import {showSuccessAlert} from './alert.js';

formValidate();

getAdvertisements((data)=> data.forEach((item) => createPin(item)), showSuccessAlert);

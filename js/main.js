import {createAdvertisements} from './data-gen.js';
import {formValidate} from './form.js';
import {createPin} from './map.js';
import './slider.js';


const similarAdvertisementsData = createAdvertisements();
similarAdvertisementsData.forEach((adv) => {
  createPin(adv);
});

formValidate();

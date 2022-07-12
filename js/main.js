import {generateCard} from './card.js';
import {createAdvertisements} from './data-gen.js';
import {turnActiveModeOff, turnActiveModeOn} from './form.js';

const similarAdvertisementsData = createAdvertisements();

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(generateCard(similarAdvertisementsData[0]));

turnActiveModeOn();

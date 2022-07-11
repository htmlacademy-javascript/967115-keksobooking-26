import {generateCard} from './card.js';
import {createAdvertisements} from './data-gen.js';

const similarAdvertisementsData = createAdvertisements();

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(generateCard(similarAdvertisementsData[0]));

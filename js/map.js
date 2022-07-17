import {toggleActiveMode} from './form.js';
import {generateCard} from './card.js';

const FLOAT_COORDINATES = 5;
const INITIAL_MAP_COORDINATES = {
  lat: 35.67500,
  lng: 139.75000
};
const INITIAL_PIN_COORDINATES = {
  lat: 35.67500,
  lng: 139.75000
};
const INITIAL_MAP_SCALE = 13;
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANCHOR = [26, 52];
const MAIN_ICON_URL = '../img/main-pin.svg';
const ORDINARY_ICON_SIZE = [40, 40];
const ORDINARY_ICON_ANCHOR = [20, 40];
const ORDINARI_ICON_URL = '../img/pin.svg';

const map = L.map('map-canvas')
  .on('load', () => {
    toggleActiveMode(false);
  })
  .setView(
    {
      lat: INITIAL_MAP_COORDINATES.lat,
      lng: INITIAL_MAP_COORDINATES.lng
    }, INITIAL_MAP_SCALE
  );

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const advGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon(
  {
    iconUrl: MAIN_ICON_URL,
    iconSize: MAIN_ICON_SIZE,
    iconAnchor: MAIN_ICON_ANCHOR
  }
);

const mainPinCoordinates = {
  lat: INITIAL_PIN_COORDINATES.lat,
  lng: INITIAL_PIN_COORDINATES.lng
};

const ordinaryPinIcon = L.icon(
  {
    iconUrl: ORDINARI_ICON_URL,
    iconSize: ORDINARY_ICON_SIZE,
    iconAnchor: ORDINARY_ICON_ANCHOR
  }
);

function createPinMarker (icon, isDraggable) {
  return function (lat, lng) {
    const pinMarker = L.marker(
      {
        lat,
        lng
      },
      {
        draggable: isDraggable,
        icon
      }
    );
    pinMarker.addTo(advGroup);
    return pinMarker;
  };
}
const createMainPinMarker = createPinMarker(mainPinIcon, true);
const createOrdinaryPinMarker = createPinMarker(ordinaryPinIcon, false);

function createPin (advData) {
  const nn = createOrdinaryPinMarker(advData.location.lat, advData.location.lng);
  nn.bindPopup(generateCard(advData));
}

const mainPin = createMainPinMarker(mainPinCoordinates.lat, mainPinCoordinates.lng);
mainPin.addTo(advGroup);

const address = document.querySelector('#address');

mainPin.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  address.value = `${lat.toFixed(FLOAT_COORDINATES)  }, ${  lng.toFixed(FLOAT_COORDINATES)}`; // вынести магическое число
});

export {createPin};

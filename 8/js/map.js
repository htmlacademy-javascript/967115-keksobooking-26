import {toggleActiveMode} from './form.js';
import {generateCard} from './card.js';

const FLOAT_COORDINATES = 5;

const map = L.map('map-canvas')
  .on('load', () => {
    toggleActiveMode(false);
  })
  .setView(
    {
      lat: 35.67500,
      lng: 139.75000
    }, 13
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
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52]
  }
);

const mainPinCoordinates = {
  lat: 35.67500,
  lng: 139.75000
};

const ordinaryPinIcon = L.icon(
  {
    iconUrl: '../img/pin.svg',
    iconSize: [40,40],
    iconAnchor: [20, 40]
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

import {generateCard} from './card.js';

const FLOAT_COORDINATES = 5;
const InitialMapCoordinates = {
  lat: 35.67500,
  lng: 139.75000
};
const InitialPinCoordinates = {
  lat: 35.67500,
  lng: 139.75000
};
const INITIAL_MAP_SCALE = 13;
const MAIN_ICON_SIZE_X = 52;
const MAIN_ICON_SIZE_Y = 52;
const MAIN_ICON_URL = '../img/main-pin.svg';
const ORDINARY_ICON_SIZE_X = 40;
const ORDINARY_ICON_SIZE_Y = 40;
const ORDINARI_ICON_URL = '../img/pin.svg';

const addressElement = document.querySelector('#address');

const adFormElement = document.querySelector('.ad-form');
const adFieldElements = adFormElement.querySelectorAll('fieldset');
const filtersFormElement = document.querySelector('.map__filters');
const filtersFormSelectsElements = filtersFormElement.querySelectorAll('select');
const filtersFormFeaturesElement = filtersFormElement.querySelector('fieldset');

function toggleActiveMode (isActive) {
  adFormElement.classList.toggle('ad-form--disabled', isActive);
  adFieldElements.forEach((advertisementField) => {
    advertisementField.disabled = isActive;
  });
  filtersFormElement.classList.toggle('ad-form--disabled', isActive);
  filtersFormSelectsElements.forEach((filtersFormSelect) => {
    filtersFormSelect.disabled = isActive;
  });
  filtersFormFeaturesElement.disabled = isActive;
}

const map = L.map('map-canvas')
  .on('load', () => {
    toggleActiveMode(false);
  })
  .setView(
    {
      lat: InitialMapCoordinates.lat,
      lng: InitialMapCoordinates.lng
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
    iconSize: [MAIN_ICON_SIZE_X, MAIN_ICON_SIZE_Y],
    iconAnchor: [MAIN_ICON_SIZE_X / 2, MAIN_ICON_SIZE_Y]
  }
);

const mainPinCoordinates = {
  lat: InitialPinCoordinates.lat,
  lng: InitialPinCoordinates.lng
};

const ordinaryPinIcon = L.icon(
  {
    iconUrl: ORDINARI_ICON_URL,
    iconSize: [ORDINARY_ICON_SIZE_X, ORDINARY_ICON_SIZE_Y],
    iconAnchor: [ORDINARY_ICON_SIZE_X / 2, ORDINARY_ICON_SIZE_Y]
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
    //pinMarker.addTo(advGroup);
    return pinMarker;
  };
}
const createMainPinMarker = createPinMarker(mainPinIcon, true);
const createOrdinaryPinMarker = createPinMarker(ordinaryPinIcon, false);

function createPin (advData) {
  const pin = createOrdinaryPinMarker(advData.location.lat, advData.location.lng);
  pin.addTo(advGroup);
  pin.bindPopup(generateCard(advData));
}

const mainPin = createMainPinMarker(mainPinCoordinates.lat, mainPinCoordinates.lng);
mainPin.addTo(advGroup);

function setAddress (point) {
  const lat = point.getLatLng().lat.toFixed(FLOAT_COORDINATES);
  const lng = point.getLatLng().lng.toFixed(FLOAT_COORDINATES);
  addressElement.value = `${lat}, ${lng}`;
}
setAddress(mainPin);

mainPin.on('moveend', () => {
  setAddress(mainPin);
});

function resetCoordinates () {
  mainPin.setLatLng(InitialPinCoordinates);
  setAddress(mainPin);
  map.setView(
    {
      lat: InitialMapCoordinates.lat,
      lng: InitialMapCoordinates.lng
    }, INITIAL_MAP_SCALE
  );
}


export {createPin, createMainPinMarker, resetCoordinates};

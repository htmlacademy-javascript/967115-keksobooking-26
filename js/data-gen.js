import {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  getRandomSubArray
} from './util.js';

const NUMBER_OF_ADVERTISEMENTS = 10;
const MIN_ROOMS = 1;
const MAX_ROOMS = 20; // вряд ли больше
const MIN_GUESTS = 1;
const MAX_GUESTS = 200; // вряд ли больше
const MIN_PRICE = 0; // акционная цена
const MAX_PRICE = 1000000;
const FLOAT_COORDINATES = 5;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_NLG = 139.70000;
const MAX_NLG = 139.80000;
const AVATARS = createAvatars(NUMBER_OF_ADVERTISEMENTS);
const HOUSING_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const BOOKING_TIME = [
  '12:00',
  '13:00',
  '14:00'
];
const HOUSING_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

function createAvatars (numberOfAvatars) {
  function createAvatar (index) {
    const zeroIndex = String(index).padStart(2, 0);
    return `img/avatars/user${zeroIndex}.png`;
  }
  const avatars = [];
  for (let i = 0; i < numberOfAvatars; i++) {
    avatars.push(createAvatar(i + 1));
  }
  return avatars;
}

function getUniqueAvatar () {
  const index = getRandomPositiveInteger(0, AVATARS.length - 1);
  const avatar = AVATARS[index];
  AVATARS.splice(index, 1);
  return avatar;
}

function createAdvertisement () {
  const lat = getRandomPositiveFloat(MIN_LAT, MAX_LAT, FLOAT_COORDINATES);
  const lng = getRandomPositiveFloat(MIN_NLG, MAX_NLG, FLOAT_COORDINATES);
  const address = `${lat}, ${lng}`;
  return {
    author: {
      avatar: getUniqueAvatar(),
    },
    location: {
      lat: lat,
      lng: lng
    },
    offer: {
      title: 'Компактная квартира для семьи из трёх человек',
      address: address,
      price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE), // 0 - акционная цена
      type: getRandomArrayElement(HOUSING_TYPE),
      rooms: getRandomPositiveInteger(MIN_ROOMS, MAX_ROOMS), // вряд ли больше
      guests: getRandomPositiveInteger(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayElement(BOOKING_TIME),
      checkout: getRandomArrayElement(BOOKING_TIME),
      features: getRandomSubArray(HOUSING_FEATURES),
      description: 'Вы будете жить на холме в окрушении леса и таких же интровертов как и вы',
      photos: getRandomSubArray(PHOTOS)
    }
  };
}

const createAdvertisements = () => Array.from({length: NUMBER_OF_ADVERTISEMENTS}, createAdvertisement);

export {createAdvertisements};

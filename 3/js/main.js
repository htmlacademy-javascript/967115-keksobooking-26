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


// Взяты функции Кекса по генерации случайного положительного целого числа
// и числа с плавающей точкой из диапазона
// Механику изучил, приемы взял на вооружение
// Первоисточник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

function getRandomSubArray (arr) {
  const shuffled = arr.slice();
  let swap, index, i = arr.length;
  while (i--) {
    index = Math.floor(Math.random() * (i + 1));
    swap = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = swap;
  }
  return shuffled.slice(0, getRandomPositiveInteger(0, shuffled.length));
}

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
  const LAT = getRandomPositiveFloat(MIN_LAT, MAX_LAT, FLOAT_COORDINATES);
  const LNG = getRandomPositiveFloat(MIN_NLG, MAX_NLG, FLOAT_COORDINATES);
  const ADDRESS = `${LAT}, ${LNG}`;
  return {
    author: {
      avatar: getUniqueAvatar(),
    },
    location: {
      lat: LAT,
      lng: LNG
    },
    offer: {
      title: 'Компактная квартира для семьи из трёх человек',
      address: ADDRESS,
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

const severalAdvericements = Array.from({length: NUMBER_OF_ADVERTISEMENTS}, createAdvertisement);

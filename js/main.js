const NUMBER_OF_ADVERTISEMENTS = 10;
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
    const avatar = `img/avatars/user${zeroIndex}.png`;
    return avatar;
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
  return {
    author: {
      avatar: getUniqueAvatar(),
    },
    offer: {
      title: 'Компактная квартира для семьи из трёх человек',
      get address() {return `${this.location.lat}, ${this.location.lng}`;}, // придумать, как переопределить через location
      price: getRandomPositiveInteger(0, 1000000), // 0 - акционная цена
      type: getRandomArrayElement(HOUSING_TYPE),
      rooms: getRandomPositiveInteger(1, 20), // вряд ли больше
      guests: getRandomPositiveInteger(1, 200), // вряд ли больше
      checkin: getRandomArrayElement(BOOKING_TIME),
      checkout: getRandomArrayElement(BOOKING_TIME),
      features: getRandomSubArray(HOUSING_FEATURES),
      description: 'Вы будете жить на холме в окрушении леса и таких же интровертов как и вы',
      photos: getRandomSubArray(PHOTOS)
    },
    location: {
      lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
      lng: getRandomPositiveFloat(139.70000, 139.80000, 5)
    },
  };
}

const severalAdvericements = Array.from({length: NUMBER_OF_ADVERTISEMENTS}, createAdvertisement);


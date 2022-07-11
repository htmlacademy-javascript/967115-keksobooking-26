import {getSubList} from './util.js';

const HOUSING_TYPE = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

function emptynessCheck (data, field) {
  if (data) {
    field.textContent = data;
  } else {
    field.classList.add('visually-hidden');
  }
}

function photosList (photosContainer, photos, photoTemplate) {
  photosContainer.innerHTML = '';
  photos.forEach((photo) => {
    const photoItem = photoTemplate.cloneNode(true);
    photoItem.src = photo;
    photosContainer.appendChild(photoItem);
  });
}

function generateCard (cardData) { // Это данные для одной карточки
  const card = cardTemplate.cloneNode(true);

  const popupTitle = card.querySelector('.popup__title');
  emptynessCheck(cardData.offer.title, popupTitle);

  const popupAddress = card.querySelector('.popup__text--address');
  popupAddress.textContent = cardData.offer.address;

  const popupPrice = card.querySelector('.popup__text--price');
  popupPrice.textContent = `${cardData.offer.price} ₽/ночь`;

  const popupType = card.querySelector('.popup__type');
  popupType.textContent = HOUSING_TYPE[cardData.offer.type];

  const popupCapacity = card.querySelector('.popup__text--capacity');
  popupCapacity.textContent = `${cardData.offer.rooms} комнат для ${cardData.offer.guests} гостей `;

  const popupTime = card.querySelector('.popup__text--time');
  popupTime.textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkin}`;

  const featuresContainer = card.querySelector('.popup__features');
  const popupFeatures = featuresContainer.querySelectorAll('.popup__feature');
  const featuresData = cardData.offer.features;
  getSubList(popupFeatures, featuresData);

  const popupDescription = card.querySelector('.popup__description');
  popupDescription.textContent = cardData.offer.description;

  const popupPhotos = card.querySelector('.popup__photos');
  const photoTemplate = cardTemplate.querySelector('.popup__photo');
  photosList(popupPhotos, cardData.offer.photos, photoTemplate);

  const popupAvatar = card.querySelector('.popup__avatar');
  popupAvatar.src = cardData.author.avatar;

  return card;
}

export {generateCard};

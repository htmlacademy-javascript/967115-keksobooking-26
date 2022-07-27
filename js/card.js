import {getSubList} from './util.js';

const HOUSING_TYPE = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const checkEmptiness = (data, field) => {
  if (data) {
    field.textContent = data;
  } else {
    field.classList.add('visually-hidden');
  }
};

const getPhotosList = (photosContainer, photos, photoTemplate) => {
  photosContainer.innerHTML = '';
  photos.forEach((photo) => {
    const photoItem = photoTemplate.cloneNode(true);
    photoItem.src = photo;
    photosContainer.appendChild(photoItem);
  });
  if (!photos) {photosContainer.classList.add('visually-hidden');}
};

const generateCard = (cardData) => {
  const card = cardTemplate.cloneNode(true);

  const popupTitleElement = card.querySelector('.popup__title');
  checkEmptiness(cardData.offer.title, popupTitleElement);

  const popupAddressElement = card.querySelector('.popup__text--address');
  checkEmptiness(cardData.offer.address, popupAddressElement);

  const popupPriceElement = card.querySelector('.popup__text--price');
  checkEmptiness(cardData.offer.price, popupPriceElement);
  popupPriceElement.textContent += ' ₽/ночь';

  const popupTypeElement = card.querySelector('.popup__type');
  checkEmptiness(HOUSING_TYPE[cardData.offer.type], popupTypeElement);

  const popupCapacityElement = card.querySelector('.popup__text--capacity');
  popupCapacityElement.textContent = `${cardData.offer.rooms} комнат для ${cardData.offer.guests} гостей `;

  const popupTimeElement = card.querySelector('.popup__text--time');
  popupTimeElement.textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkin}`;

  const featuresElement = card.querySelector('.popup__features');
  const popupFeaturesElement = featuresElement.querySelectorAll('.popup__feature');
  const featuresData = cardData.offer.features;
  if (featuresData) {
    getSubList(popupFeaturesElement, featuresData);
  } else {
    featuresElement.classList.add('visually-hidden');
  }


  const popupDescriptionElement = card.querySelector('.popup__description');
  popupDescriptionElement.textContent = cardData.offer.description;


  const popupPhotosElement = card.querySelector('.popup__photos');
  const photoTemplate = cardTemplate.querySelector('.popup__photo');
  if (!cardData.offer.photos){
    popupPhotosElement.classList.add('visually-hidden');
  } else {
    getPhotosList(popupPhotosElement, cardData.offer.photos, photoTemplate);
  }

  const popupAvatarElement = card.querySelector('.popup__avatar');
  popupAvatarElement.src = cardData.author.avatar;

  return card;
};

export {generateCard};

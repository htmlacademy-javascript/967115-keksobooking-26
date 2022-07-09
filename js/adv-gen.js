import { createAdvericements } from './data-gen.js';

const LIVING_TYPE = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const canvas = document.querySelector('#map-canvas');
const similarAdverticementsData = createAdvericements();
const similarAdverticements = document.createDocumentFragment();

// Если нет данных для заполнения, тэг скрывается.
// Альтернативный вариант - сначала собрать карточку, затем рекурсией пройтись по листьям и скрыть пустые.
// Проработать альтернативный вариант
function emptynessCheck (data, field) {
  if (data) {
    field.textContent = data;
  } else {
    field.classList.add('visually-hidden');
  }
}

for (let i = 0; i < similarAdverticementsData.length; i++) {
  const similarAdverticementsItem = cardTemplate.cloneNode(true);

  const popupTitle = similarAdverticementsItem.querySelector('.popup__title');
  //popupTitle.textContent = similarAdverticementsData[i].offer.title;
  emptynessCheck(similarAdverticementsData[i].offer.title, popupTitle); // вызвать для всех атрибутов. Не элегантно :(

  const popupAddress = similarAdverticementsItem.querySelector('.popup__text--address');
  popupAddress.textContent = similarAdverticementsData[i].offer.address;

  const popupPrice = similarAdverticementsItem.querySelector('.popup__text--price');
  popupPrice.textContent = `${similarAdverticementsData[i].offer.price  } ₽/ночь`;

  const popupType = similarAdverticementsItem.querySelector('.popup__type');
  popupType.textContent = LIVING_TYPE[similarAdverticementsData[i].offer.type];

  const popupCapacity = similarAdverticementsItem.querySelector('.popup__text--capacity');
  popupCapacity.textContent = `${similarAdverticementsData[i].offer.rooms  } комнат для ${  similarAdverticementsData[0].offer.guests  } гостей `;

  const popupTime = similarAdverticementsItem.querySelector('.popup__text--time');
  popupTime.textContent = `Заезд после ${  similarAdverticementsData[i].offer.checkin  }, выезд до ${  similarAdverticementsData[0].offer.checkin}`;

  const featuresContainer = similarAdverticementsItem.querySelector('.popup__features');
  const popupFeatures = featuresContainer.querySelectorAll('.popup__feature');
  const featuresData = similarAdverticementsData[i].offer.features;
  popupFeatures.forEach((popupFeature) => {
    const isNecessary = featuresData.some((featureData) =>
      popupFeature.classList.contains(`popup__feature--${  featureData}`));

    if(!isNecessary) {
      popupFeature.remove();
    }
  });

  const popupDescription = similarAdverticementsItem.querySelector('.popup__description');
  popupDescription.textContent = similarAdverticementsData[i].offer.description;

  const popupPhotos = similarAdverticementsItem.querySelector('.popup__photos');
  const photoTemplate = cardTemplate.querySelector('.popup__photo');
  popupPhotos.innerHTML = '';
  for (let j = 0; j < similarAdverticementsData[i].offer.photos.length; j++) {
    const photoItem = photoTemplate.cloneNode(true);
    photoItem.src = similarAdverticementsData[i].offer.photos[j];
    popupPhotos.appendChild(photoItem);
  }

  const popupAvatar = similarAdverticementsItem.querySelector('.popup__avatar');
  popupAvatar.src = similarAdverticementsData[i].author.avatar;

  similarAdverticements.appendChild(similarAdverticementsItem);
}

canvas.appendChild(similarAdverticements.firstChild);

const mapFiltersFormElement = document.querySelector('.map__filters');
const housingTypeFilterElement = mapFiltersFormElement.querySelector('#housing-type');
const housingPriceFilterElement = mapFiltersFormElement.querySelector('#housing-price');
const housingRoomsFilterElement = mapFiltersFormElement.querySelector('#housing-rooms');
const housingGuestsFilterElement = mapFiltersFormElement.querySelector('#housing-guests');
//const housingFeaturesFilterElements = mapFiltersFormElement.querySelectorAll('[name = "features"]');

const PriceOptions = [
  {name: 'low', maxValue: 10000},
  {name: 'middle',maxValue: 50000},
  {name: 'high', maxValue: 100000}
];

function compareHousingType (ad) {
  if (housingTypeFilterElement.value === ad.offer.type
        || housingTypeFilterElement.value === 'any') {
    return true;
  }
  return false;
}

function compareHousingPrice (ad) {
  let cat = 'any';
  for (let i = PriceOptions.length - 1; i >= 0; i--) {
    if (ad.offer.price <= PriceOptions[i].maxValue) {
      cat = PriceOptions[i].name;
    }
  }
  if (cat === housingPriceFilterElement.value
        || housingPriceFilterElement.value === 'any') {
    return true;
  }
  return false;
}

function compareHousingRooms (ad) {
  if (housingRoomsFilterElement.value === ad.offer.rooms.toString()
        || housingRoomsFilterElement.value === 'any') {
    return true;
  }
  return false;
}

function compareHousinGuests (ad) {
  if (housingGuestsFilterElement.value === ad.offer.guests.toString()
        || housingGuestsFilterElement.value === 'any') {
    return true;
  }
  return false;
}

function compareHousingFeatures (ad) {
  //Чтобы lint не ругался, удалить
  let flag;
  if(ad) {flag = true;}

  // let flag = true;
  // housingFeaturesFilterElements.forEach((feature) => {
  //     if (feature.checked) {
  //Помоги разобраться, плз. Не могу понять, почему includes не отрабатывает на массиве ad.offer.features
  //         flag *= ad.offer.features.includes(feature.value);
  //     }
  // });
  // return flag;
  return flag;
}


function compareAds (ad) {
  if (compareHousingType(ad)
        && compareHousingPrice(ad)
        && compareHousingRooms(ad)
        && compareHousinGuests(ad)
        && compareHousingFeatures(ad)
  ) {
    return true;
  }
  return false;
}

export {compareAds};

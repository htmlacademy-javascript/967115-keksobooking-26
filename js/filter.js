const mapFiltersFormElement = document.querySelector('.map__filters');
const housingTypeFilterElement = mapFiltersFormElement.querySelector('#housing-type');
const housingPriceFilterElement = mapFiltersFormElement.querySelector('#housing-price');
const housingRoomsFilterElement = mapFiltersFormElement.querySelector('#housing-rooms');
const housingGuestsFilterElement = mapFiltersFormElement.querySelector('#housing-guests');
const housingFeaturesFilterElements = mapFiltersFormElement.querySelectorAll('[name = "features"]');

const PriceOptions = [
  {name: 'low', minValue: 0},
  {name: 'middle',minValue: 10000},
  {name: 'high', minValue: 50000}
];

function compareHousingType (ad) {
  return housingTypeFilterElement.value === ad.offer.type || housingTypeFilterElement.value === 'any';
}

function compareHousingPrice (ad) {
  let cat = 'any';
  PriceOptions.forEach((option) => {
    if (ad.offer.price >= option.minValue) {
      cat = option.name;
    }});
  return cat === housingPriceFilterElement.value || housingPriceFilterElement.value === 'any';
}

function compareHousingRooms (ad) {
  return housingRoomsFilterElement.value === ad.offer.rooms.toString() || housingRoomsFilterElement.value === 'any';
}

function compareHousinGuests (ad) {
  return housingGuestsFilterElement.value === ad.offer.guests.toString() || housingGuestsFilterElement.value === 'any';
}

function compareHousingFeatures (ad) {
  for (const feature of housingFeaturesFilterElements) {
    if (feature.checked && (!ad.offer.features || !ad.offer.features.includes(feature.value))) {
      return false;
    }
  }
  return true;
}

function compareAds (ad) {
  return (
    compareHousingType(ad)
    && compareHousingPrice(ad)
    && compareHousingRooms(ad)
    && compareHousinGuests(ad)
    && compareHousingFeatures(ad)
  );
}

export {compareAds};

const PriceOptions = [
  {name: 'low', minValue: 0, maxValue: 10000},
  {name: 'middle', minValue: 10000, maxValue: 50000},
  {name: 'high', minValue: 50000, maxValue: 100000}
];
const mapFiltersFormElement = document.querySelector('.map__filters');
const housingTypeFilterElement = mapFiltersFormElement.querySelector('#housing-type');
const housingPriceFilterElement = mapFiltersFormElement.querySelector('#housing-price');
const housingRoomsFilterElement = mapFiltersFormElement.querySelector('#housing-rooms');
const housingGuestsFilterElement = mapFiltersFormElement.querySelector('#housing-guests');
const housingFeaturesFilterElements = mapFiltersFormElement.querySelectorAll('[name = "features"]');

const compareHousingType = (ad) =>
  housingTypeFilterElement.value === ad.offer.type || housingTypeFilterElement.value === 'any';

const compareHousingPrice = (ad) => {
  const category = PriceOptions.find((element) => ad.offer.price <= element.maxValue).name;
  return category === housingPriceFilterElement.value || housingPriceFilterElement.value === 'any';
};

const compareHousingRooms = (ad) =>
  housingRoomsFilterElement.value === ad.offer.rooms.toString() || housingRoomsFilterElement.value === 'any';

const compareHousingGuests = (ad) =>
  housingGuestsFilterElement.value === ad.offer.guests.toString() || housingGuestsFilterElement.value === 'any';

const compareHousingFeatures = (ad) => {
  for (const feature of housingFeaturesFilterElements) {
    if (feature.checked && (!ad.offer.features || !ad.offer.features.includes(feature.value))) {
      return false;
    }
  }
  return true;
};

const compareAds = (ad) =>
  compareHousingType(ad)
    && compareHousingPrice(ad)
    && compareHousingRooms(ad)
    && compareHousingGuests(ad)
    && compareHousingFeatures(ad);

export {compareAds};

const INITIAL_SLIDER_MIN_VALUE = 0;
const INITIAL_SLIDER_MAX_VALUE = 100000;
const INITIAL_SLIDER_START_VALUE = 50000;
const INITIAL_SLIDER_STEP = 1;
const FLOAT_PRICE = 0;

const sliderElement = document.querySelector('.ad-form__slider');
const priceElement = document.querySelector('#price');
priceElement.value = INITIAL_SLIDER_START_VALUE;

noUiSlider.create(sliderElement, {
  range: {
    min: INITIAL_SLIDER_MIN_VALUE,
    max: INITIAL_SLIDER_MAX_VALUE,
  },
  start: INITIAL_SLIDER_START_VALUE,
  step: INITIAL_SLIDER_STEP,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(FLOAT_PRICE),
    from: (value) => parseFloat(value)
  }
}
);

const updateMinOption = (minValue) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: INITIAL_SLIDER_MAX_VALUE
    }
  });
};

const resetSlider = () => {
  sliderElement.noUiSlider.set(INITIAL_SLIDER_START_VALUE);
};

priceElement.addEventListener('input', () => {
  sliderElement.noUiSlider.set(priceElement.value);
});

sliderElement.noUiSlider.on('update', (value) => {
  priceElement.value = value;
});

export {resetSlider, updateMinOption};

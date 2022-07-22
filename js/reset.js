import {resetCoordinates} from './map.js';
import {resetSlider} from './slider.js';

function resetForms () {
  //Найти все поля, которые нужно сбросить
  //присвоить им значения по умолчанию
  //вернуть на место пин
  //вернуть на место масштаб карты
  //не должен добавляться дополнительный мэйн пин
  //сбросить поле адреса
  //вернуть на место слайдер
  //сбросить значение слайдера
  const form = document.querySelector('.ad-form');
  form.querySelector('#title').value = '';
  form.querySelector('#type').querySelector('[value = "flat"]').selected = true;
  form.querySelector('#room_number').querySelector('[value = "1"]').selected = true;
  form.querySelector('#capacity').querySelector('[value = "3"]').selected = true;
  form.querySelector('#description').value = '';
  form.querySelector('#timein').querySelector('[value = "12:00"]').selected = true;
  form.querySelector('#timeout').querySelector('[value = "12:00"]').selected = true;
  form.querySelectorAll('.features__checkbox').forEach((checkBox) => {checkBox.checked = false;});
  resetSlider();
  resetCoordinates();
}

export {resetForms};

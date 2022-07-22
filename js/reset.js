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
  const formElement = document.querySelector('.ad-form');
  formElement.querySelector('#title').value = '';
  formElement.querySelector('#type').querySelector('[value = "flat"]').selected = true;
  formElement.querySelector('#room_number').querySelector('[value = "1"]').selected = true;
  formElement.querySelector('#capacity').querySelector('[value = "3"]').selected = true;
  formElement.querySelector('#description').value = '';
  formElement.querySelector('#timein').querySelector('[value = "12:00"]').selected = true;
  formElement.querySelector('#timeout').querySelector('[value = "12:00"]').selected = true;
  formElement.querySelectorAll('.features__checkbox').forEach((checkBox) => {checkBox.checked = false;});
  resetSlider();
  resetCoordinates();
}

export {resetForms};

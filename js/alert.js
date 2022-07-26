const bodyElement = document.querySelector('body');


//Строим окно с ошибкой
const errorAlertTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const errorAlertElement = errorAlertTemplate.cloneNode(true);
const errorButtonElement = errorAlertElement.querySelector('.error__button');
errorAlertElement.classList.add('visually-hidden');
bodyElement.appendChild(errorAlertElement);

function showErrorAlert (message) {
  errorAlertElement.querySelector('.error__message').textContent = message;
  errorAlertElement.classList.remove('visually-hidden');
  document.addEventListener('click', onErrorAlertClick);
  document.addEventListener('keydown', onErrorEscKeydown);
}

errorButtonElement.addEventListener('click', () => {
  closeErrorAlert();
});

function onErrorAlertClick () {
  closeErrorAlert();
}

function onErrorEscKeydown (evt) {
  if (isEscKey) {
    evt.preventDefault();
    closeErrorAlert();
  }
}

function closeErrorAlert () {
  errorAlertElement.classList.add('visually-hidden');
  document.removeEventListener('click', onErrorAlertClick);
  document.removeEventListener('keydown', onErrorEscKeydown);
}

//Строим окно с успехом
const successAlertTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const successAlertElement = successAlertTemplate.cloneNode(true);
successAlertElement.classList.add('visually-hidden');
bodyElement.appendChild(successAlertElement);

function showSuccessAlert (message) {
  successAlertElement.querySelector('.success__message').textContent = message;
  successAlertElement.classList.remove('visually-hidden');
  document.addEventListener('click', onSuccessAlertClick);
  document.addEventListener('keydown', onSuccessEscKeydown);
}

function onSuccessAlertClick () {
  closeSuccessAlert();
}

function onSuccessEscKeydown (evt) {
  if (isEscKey) {
    evt.preventDefault();
    closeSuccessAlert();
  }
}

function closeSuccessAlert () {
  successAlertElement.classList.add('visually-hidden');
  document.removeEventListener('click', onSuccessAlertClick);
  document.removeEventListener('keydown', onSuccessEscKeydown);
}

function isEscKey (evt) {
  return evt.key === 'Escape';
}

export {showSuccessAlert, showErrorAlert};

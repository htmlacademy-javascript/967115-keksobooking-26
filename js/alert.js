const bodyElement = document.querySelector('body');
const errorAlertTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const errorAlertElement = errorAlertTemplate.cloneNode(true);
const errorButtonElement = errorAlertElement.querySelector('.error__button');
const successAlertTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const successAlertElement = successAlertTemplate.cloneNode(true);
errorAlertElement.classList.add('visually-hidden');
bodyElement.appendChild(errorAlertElement);
successAlertElement.classList.add('visually-hidden');
bodyElement.appendChild(successAlertElement);

const isEscKey = (evt) => evt.key === 'Escape';

const onErrorAlertClick = () => {
  closeErrorAlert();
};

const onErrorEscKeydown = (evt) => {
  if (isEscKey) {
    evt.preventDefault();
    closeErrorAlert();
  }
};

const showErrorAlert = (message) => {
  errorAlertElement.querySelector('.error__message').textContent = message;
  errorAlertElement.classList.remove('visually-hidden');
  document.addEventListener('click', onErrorAlertClick);
  document.addEventListener('keydown', onErrorEscKeydown);

};

function closeErrorAlert () {
  errorAlertElement.classList.add('visually-hidden');
  document.removeEventListener('click', onErrorAlertClick);
  document.removeEventListener('keydown', onErrorEscKeydown);
}

const onSuccessAlertClick = () => {
  closeSuccessAlert();
};

const onSuccessEscKeydown = (evt) => {
  if (isEscKey) {
    evt.preventDefault();
    closeSuccessAlert();
  }
};

const showSuccessAlert = (message) => {
  successAlertElement.querySelector('.success__message').textContent = message;
  successAlertElement.classList.remove('visually-hidden');
  document.addEventListener('click', onSuccessAlertClick);
  document.addEventListener('keydown', onSuccessEscKeydown);
};

function closeSuccessAlert () {
  successAlertElement.classList.add('visually-hidden');
  document.removeEventListener('click', onSuccessAlertClick);
  document.removeEventListener('keydown', onSuccessEscKeydown);
}

errorButtonElement.addEventListener('click', () => {
  closeErrorAlert();
});

export {showSuccessAlert, showErrorAlert};

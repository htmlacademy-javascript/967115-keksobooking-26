const ALERT_SHOW_TIME = 3000;

const alertTemplate = document.querySelector('#form-error')
  .content
  .querySelector('.form-error-container');
const submitSelect = document.querySelector('.ad-form__element--submit');

function showAlert (message) {
  const alertElement = alertTemplate.cloneNode(true);
  alertElement.querySelector('.form-error-message').textContent = message;
  submitSelect.appendChild(alertElement);
  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
}

export {showAlert};

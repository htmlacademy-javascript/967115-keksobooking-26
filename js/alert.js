const ALERT_SHOW_TIME = 3000;

const alertTemplate = document.querySelector('#form-error')
  .content
  .querySelector('.form-error-container');
const formElement = document.querySelector('.ad-form');

function showAlert (message) {
  const alertElement = alertTemplate.cloneNode(true);
  alertElement.querySelector('.form-error-message').textContent = message;
  formElement.appendChild(alertElement);
  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
}

export {showAlert};

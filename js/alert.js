const ALERT_SHOW_TIME = 3000;
const bodyElement = document.querySelector('body');

//В 12-м модуле добавить обработку кнопки «Отправить снова» и нажатие ESC
function showAlert (alertType) {
  return (message) => {
    const messageTemplate = document.querySelector(`#${alertType}`)
      .content
      .querySelector(`.${alertType}`);
    const messageElement = messageTemplate.cloneNode(true);
    messageElement.querySelector(`.${alertType}__message`).textContent = message;
    bodyElement.appendChild(messageElement);
    setTimeout(() => {
      messageElement.remove();
    }, ALERT_SHOW_TIME);
  };
}

const showSuccessAlert = showAlert('success');
const showErrorAlert = showAlert('error');

export {showSuccessAlert, showErrorAlert};

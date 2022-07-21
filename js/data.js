const getAdvertisements = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => onFail('Мы не смогли загрузить данные для карты с сервера, попробуйте позже'));
};

const sendAdverisement = (onSuccess, onFail, body, form) => {
  fetch(
    'https://26.javascript.pages.academy2/keksobooking',
    {
      method: 'POST',
      body
    }
  )
    .then(() => {
      onSuccess('Данные успешно отправлены');
      form.reset(); //Как будто неудачное место обнулить форму -- если не передать форму, не получится передать данные
    })
    .catch(() => {
      onFail('Что-то пошло не так, попробуйте позже');
    });
};

export {getAdvertisements, sendAdverisement};

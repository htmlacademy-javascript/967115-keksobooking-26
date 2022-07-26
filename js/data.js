const getAdvertisements = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => onFail('Мы не смогли загрузить данные для карты с сервера, попробуйте позже'));
};

const sendAdvertisement = (onSuccess, onFail, data) => {
  fetch(
    'https://26.javascript.pages.academy/keksobooking2',
    {
      method: 'POST',
      body: data,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess('Данные успешно отправлены');
      } else {
        onFail('Что-то пошло не так, попробуйте позже');
      }
    })
    .catch(() => {
      onFail('Что-то пошло не так, попробуйте позже');
    });
};

export {getAdvertisements, sendAdvertisement};

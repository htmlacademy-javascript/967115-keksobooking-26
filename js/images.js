const FILE_TYPES = ['png', 'jpg', 'jpeg'];

const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const avatarChooserElement = document.querySelector('#avatar');
const imagesPreviewElement = document.querySelector('.ad-form__photo');
const imagesChooserElement = document.querySelector('#images');

function setAvatar (preview, file) {
  preview.src = URL.createObjectURL(file);
}

function setImage (preview, file) {
  const src = URL.createObjectURL(file);
  preview.style.backgroundImage = `URL('${src}')`;
  preview.style.backgroundSize = 'cover';
}

function chooseImage (preview, cb) {
  return (evt) => {
    const file = evt.target.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (matches) {
      cb(preview, file);
    }
  };
}

avatarChooserElement.addEventListener('change', chooseImage(avatarPreviewElement, setAvatar));
imagesChooserElement.addEventListener('change', chooseImage(imagesPreviewElement, setImage));

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from './img/error-icon.svg';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const formEl = document.querySelector('.form');

function showError(message) {
  iziToast.error({
    message,
    position: 'topRight',
    theme: 'dark',
    backgroundColor: 'rgba(239, 64, 64, 1)',
    messageColor: '#fafafb',
    iconUrl: errorIcon,
    progressBarColor: '#b51b1b',
    maxWidth: 432,
  });
}

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        showError(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }

      createGallery(data.hits);
    })
    .catch(error => {
      showError(`Something went wrong: ${error.message}`);
    })
    .finally(() => {
      hideLoader();
      formEl.reset();
    });
}

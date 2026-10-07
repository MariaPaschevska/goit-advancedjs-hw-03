import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '16287282-bb4aa79813232011e036abcfd';

export function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 9,
      },
    })
    .then(response => response.data);
}

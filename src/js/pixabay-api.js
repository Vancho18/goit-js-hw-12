import axios from 'axios';
// axios Settings
axios.defaults.baseURL = 'https://pixabay.com/api/';
const myApiKey = '49354290-35d6e1dc5d842ed86975730ff';
const axiosOptions = (key, page) => {
  const params = {
    params: {
      key: myApiKey,
      q: key,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: page,
    },
  };
  return params;
};

export async function apiRequest(requestKey, page) {
  const response = await axios.get('', axiosOptions(requestKey, page));
  return response.data;
}

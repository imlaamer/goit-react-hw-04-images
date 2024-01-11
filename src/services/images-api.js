import axios from 'axios';

const API_KEY = '40654328-1d494b77cf448b3eaf3a4f517';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getImages = async (q, page) => {
  const { data } = await axios.get(`?q=${q}&page=${page}`);
  return data;
};

import axios from 'axios';

export const BASE_URL = 'https://newsapi.org/v2/';
const API_KEY = 'bf623e8ccba74e7f9bbd822149b32985';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getHeadlineByCountry = async () => {
  try {
    const response = await api.get(`top-headlines?country=in&apiKey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching headlines by country:', error);
    throw error; // Re-throw to allow handling in calling function
  }
};

export const fetchSearchDataApi = async (query) => {
  try {
    const response = await api.get(`everything?q=${query}&sortBy=popularity&apiKey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching search data:', error);
    throw error; // Re-throw to allow handling in calling function
  }
};

import axios from 'axios';

const API_BASE = 'https://ytflow.onrender.com/api';


const API = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Request:', config.method.toUpperCase(), config.baseURL + config.url);
  return config;
});

API.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export default API;
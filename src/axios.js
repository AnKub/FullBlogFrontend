import axios from 'axios';

// Создание экземпляра Axios с базовым URL
const instance = axios.create({
  baseURL: 'http://localhost:4444',
});

// Интерцептор для добавления токена авторизации к каждому запросу
instance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('token');
    if (token) {
     
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
  
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response, 
  (error) => {
    console.error('Axios error:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
  if (error.response && error.response.status === 403) {
      console.error('403 Forbidden: Access denied');
   }
    return Promise.reject(error); // Возвращаем ошибку для дальнейшей обработки
  }
);

export default instance;

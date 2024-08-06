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

// Интерцептор для обработки ответов
instance.interceptors.response.use(
  (response) => response, 
  async (error) => {
    console.error('Axios error:', error);
    
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      
      // Обработка ошибок для различных статусов
      if (error.response.status === 401) {
        console.error('401 Unauthorized: Token might be invalid or expired');
        // Например, перенаправляем пользователя на страницу входа
        // window.location.href = '/login';
      } else if (error.response.status === 403) {
        console.error('403 Forbidden: Access denied');
      } else if (error.response.status === 400) {
        console.error('400 Bad Request: Check request parameters');
      }
    }
    
    return Promise.reject(error); // Возвращаем ошибку для дальнейшей обработки
  }
);

export default instance;

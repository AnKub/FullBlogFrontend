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
      const { data, status } = error.response;

      console.error('Response data:', data);
      console.error('Response status:', status);

      // Обработка ошибок для различных статусов
      switch (status) {
        case 401:
          console.error('401 Unauthorized: Token might be invalid or expired');
          // Очистка токена и перенаправление на страницу входа
          window.localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          console.error('403 Forbidden: Access denied');
          // Можно добавить логику для уведомления пользователя
          break;
        case 400:
          console.error('400 Bad Request: Check request parameters');
          // Можно добавить логику для уведомления пользователя
          break;
        default:
          console.error(`Unhandled error status: ${status}`);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;

import axios from 'axios';

// Создание экземпляра Axios с базовым URL
const instance = axios.create({
  baseURL: 'http://localhost:4444',
});

// Интерцептор для добавления токена авторизации к каждому запросу
instance.interceptors.request.use(
  (config) => {
    // Получение токена из localStorage
    const token = window.localStorage.getItem('token');
    if (token) {
      // Добавление токена в заголовки запроса
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Обработка ошибки запроса
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Интерцептор для обработки ошибок ответа
instance.interceptors.response.use(
  (response) => response, // Возвращаем ответ, если всё прошло успешно
  (error) => {
    // Логирование ошибки ответа
    console.error('Axios error:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    // Дополнительная обработка ошибок может быть добавлена здесь
    // Например, можно проверять статус ошибки и выполнять соответствующие действия
    if (error.response && error.response.status === 403) {
      console.error('403 Forbidden: Access denied');
      // Дополнительные действия, такие как перенаправление пользователя или показ уведомления
    }
    return Promise.reject(error); // Возвращаем ошибку для дальнейшей обработки
  }
);

export default instance;

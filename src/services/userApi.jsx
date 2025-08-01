import axios from 'axios';

const userApi = axios.create({
  baseURL: 'https://atelierluphien.com/api/',
  // baseURL: 'http://localhost:3001/api/',

});

userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token_user');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

userApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token_user');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default userApi;

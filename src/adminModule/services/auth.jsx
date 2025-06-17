import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/admin/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logout = () => {
  return api.post('/auth/logout');
};

export const getProfile = () => {
  return api.get('/users/profile/me');
};

export const registerAdmin = (userData) => {
  return api.post('/auth/admin/register', userData);
};

export const registerUser = (userData) => {
  return api.post('/auth/register', userData);
};
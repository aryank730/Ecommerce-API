import api from './api';

export const getUsers = () => {
  return api.get('/users');
};

export const getUser = (id) => {
  return api.get(`/users/${id}`);
};

export const getRoles = () => {
  return api.get(`/users/roles`);
};

export const createUser = (userData) => {
  return api.post('/users', userData);
};

export const updateUser = (id, userData) => {
  return api.put(`/users/${id}`, userData);
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

export const assignRoles = (userId, roles) => {
  return api.post(`/users/${userId}/roles`, { roles });
};
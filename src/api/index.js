import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:3001/api/',
  withCredentials: true
});

export const fetchUsers = () => API.get('users');
export const signin = data => API.post('signin', data);
export const getUser = () => API.get('user');

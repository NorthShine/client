import axios from 'axios';
import { setAccessTokenAction, setAuthAction } from '../store/reducers/auth/authReducer';

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

export const fetchUsers = () => API.get('users');
export const getUser = email => API.get(`profiles/${email}`);
export const register = data => API.post('register/', data);
export const setCompetenceLevel = data => API.post('competency/level', data);
export const addCompetence = data => API.post('competency', data); // { name, level: {name}, user: {email}}
export const removeCompetence = data => API.delete('competency', data); // { id }
export const refresh = () => API.get('api/token/refresh/');
export const addSkillToken = data => API.post('skilltoken/', data); // { name, level: {name}, user: {email}}
export const fetchSkillTokens = ({ name }) => API.get(`search?q=${name}`);

export const ApiInterceptors = store => {
  API.interceptors.request.use(async req => {
    const { accessToken } = store.getState().auth;
    if (accessToken) req.headers.authorization = `Bearer ${accessToken}`;
    return req;
  });

  API.interceptors.response.use(
    req => {
      return req;
    },
    async error => {
      const { config } = error;

      if (!config) {
        throw error;
      }

      if (error.response?.status === 401 && !config._isRetry && !config.url.startsWith('refresh')) {
        config._isRetry = true;
        try {
          const result = await refresh();
          if ('accessToken' in result.data) {
            const { accessToken } = result.data;
            store.dispatch(setAccessTokenAction(accessToken));
            return API.request(config);
          }
        } catch (err) {
          console.error(err);
          if (err.response?.status) {
            store.dispatch(setAuthAction(false));
          }
          throw error;
        }
      }

      throw error;
    }
  );
};

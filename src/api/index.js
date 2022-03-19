import axios from 'axios';
import { setAccessTokenAction, setAuthAction } from '../store/reducers/auth/authReducer';

export const API = axios.create({
  baseURL: 'http://129.153.8.155:7777/admin/',
  withCredentials: true
});

export const fetchUsers = () => API.get('users');
export const signin = data => API.post('api/token/', data);
export const getUser = () => API.get('user');
export const refresh = () => API.get('api/token/refresh/');

export const ApiInterceptors = store => {
  API.interceptors.request.use(async req => {
    const { method } = req;
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

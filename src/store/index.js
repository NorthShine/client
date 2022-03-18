import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/auth/authReducer';
import { userReducer } from './reducers/user/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export const store = setupStore();

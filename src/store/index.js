import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/auth/authReducer';
import { userReducer } from './reducers/user/userSlice';
import { skillTokenReducer } from './reducers/skillToken/skillTokenReducer';

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  skillToken: skillTokenReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export const store = setupStore();

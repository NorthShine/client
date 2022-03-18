import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  accessToken: null,
  status: 'idle'
};

export const setAuthAction = createAction('auth/setAuth');
export const setAccessTokenAction = createAction('auth/setAccessToken');

export const authReducer = createReducer(initialState, builder => {
  builder.addCase(setAuthAction, (state, action) => {
    state.isAuth = action.payload;
    if (state.status !== 'ready') state.status = 'ready';
  });
  builder.addCase(setAccessTokenAction, (state, action) => {
    state.accessToken = action.payload;
  });
});

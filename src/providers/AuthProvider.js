import React, { createContext, useEffect } from 'react';
import { setAuthAction } from '../store/reducers/auth/authReducer';
import { getUserAction } from '../store/reducers/user/actionCreators';
import { useDispatch, useSelector } from 'react-redux';

const initialAuthContext = {
  isAuth: false,
  status: 'idle',
  setAuth: () => {}
};

export const AuthContext = createContext(initialAuthContext);

export const AuthProvider = ({ children }) => {
  const { isAuth, status } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const setAuth = val => dispatch(setAuthAction(val));

  useEffect(() => {
    dispatch(getUserAction())
      .unwrap()
      .then(() => setAuth(true))
      .catch(err => setAuth(false));
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, status, setAuth }}>{children}</AuthContext.Provider>
  );
};

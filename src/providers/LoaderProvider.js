import { createContext, useState } from 'react';
import { Loader } from '../components/Loader/Loader';

export const LoaderContext = createContext({
  loading: false,
  setLoading: () => {}
});

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const context = {
    loading,
    setLoading
  };

  return (
    <LoaderContext.Provider value={context}>
      {children}
      {loading && <Loader />}
    </LoaderContext.Provider>
  );
};

import { useContext } from 'react';
import { LoaderContext } from '../providers/LoaderProvider';

export const useLoader = () => {
  const { loading, setLoading } = useContext(LoaderContext);

  function show() {
    setLoading(true);
  }

  function hide() {
    setLoading(false);
  }

  return {
    loading,
    setLoading,
    hide,
    show
  };
};

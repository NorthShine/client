import { useRoutes } from 'react-router-dom';
import { routes } from './config';

export const Routes = () => {
  const routing = useRoutes(routes);
  return routing;
};

import { Home } from '../components/Home/Home';
// import { PrivateElement } from './PrivateElement';
import { AppLayout } from '../components/AppLayout/AppLayout';
import { MainLayout } from '../components/MainLayout/MainLayout';
import { Login } from '../components/Login/Login';
import { Outlet } from 'react-router-dom';

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Outlet />,
        children: [
          // {
          //   path: '/',
          //   element: <PrivateElement element={<AppLayout />} />,
          //   children: [{ path: '/', element: <Home /> }]
          // },
          {
            path: '/login',
            element: <Login />
          },
          {
            path: '/',
            element: <AppLayout />,
            children: [{ path: '/', element: <Home /> }]
          }
        ]
      }
    ]
  }
];

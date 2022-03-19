import { Home } from '../components/Home/Home';
// import { PrivateElement } from './PrivateElement';
import { AppLayout } from '../components/AppLayout/AppLayout';
import { MainLayout } from '../components/MainLayout/MainLayout';
import { Login } from '../components/Login/Login';
import { Outlet } from 'react-router-dom';
import { OpenForm } from '../components/OpenForm/OpenForm';
import { Profile } from '../components/Profile/Profile';
import { SkillToken } from '../components/SkillToken/SkillToken';

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
            path: '/open-form',
            element: <OpenForm />
          },
          {
            path: '/',
            element: <AppLayout />,
            children: [
              { path: '/', element: <Home /> },
              { path: '/token/:tokenId', element: <SkillToken /> },
              {
                path: '/profile',
                element: <Profile />
              }
            ]
          }
        ]
      }
    ]
  }
];

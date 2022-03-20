import { Home } from '../components/Home/Home';
import { PrivateElement } from './PrivateElement';
import { AppLayout } from '../components/AppLayout/AppLayout';
import { MainLayout } from '../components/MainLayout/MainLayout';
import { Login } from '../components/Login/Login';
import { Outlet } from 'react-router-dom';
import { OpenForm } from '../components/OpenForm/OpenForm';
import { Profile } from '../components/Profile/Profile';
import { ProfileEditor } from '../components/ProfileEditor/ProfileEditor';
import { SkillToken } from '../components/SkillToken/SkillToken';
import { SkillTokenSearch } from '../components/SkillTokenSearch/SkillTokenSearch';
import { UserNotifications } from '../components/UserNotifications/UserNotifications';
import { EmployerElement } from './EmployerElement';

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Outlet />,
        children: [
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
            element: <PrivateElement element={<AppLayout />} />,
            // element: <AppLayout />,
            children: [
              { path: '/', element: <Home /> },
              { path: '/token/:tokenId', element: <SkillToken /> },
              { path: '/notifications', element: <UserNotifications /> },
              {
                path: '/search',
                element: <EmployerElement element={<SkillTokenSearch />} />
              },
              {
                path: '/profile',
                element: <Profile />
              },
              {
                path: '/profile/edit',
                element: <ProfileEditor />
              }
            ]
          }
        ]
      }
    ]
  }
];

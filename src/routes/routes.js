import { Navigate, useRoutes } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
//
import Blog from '../views/Blog';
import User from '../views/User';
import Login from '../views/auth/Login';
import NotFound from '../views/Page404';
import Products from '../views/Products';
import DashboardApp from '../views/dashboard/app/DashboardApp';

import Lab from "../views/dashboard/lab/Lab";
// ----------------------------------------------------------------------

export default function Router() {
  const [showCookieUserID, setCookieUserID] = useState(Cookies.get('name'));
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: showCookieUserID !== undefined ? <DashboardApp /> : <Navigate to="/login" replace /> },
        { path: 'user', element: showCookieUserID !== undefined ? <User /> : <Navigate to="/login" replace /> },
        { path: 'products', element: showCookieUserID !== undefined ? <Products /> : <Navigate to="/login" replace /> },
        { path: 'blog', element: showCookieUserID !== undefined ? <Blog /> : <Navigate to="/login" replace /> },
        { path: 'lab', element: showCookieUserID !== undefined ? <Lab /> : <Navigate to="/login" replace /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

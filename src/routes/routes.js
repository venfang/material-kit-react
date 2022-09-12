import { Navigate, useRoutes } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
//----------------------------------------------------------------------------
import User from '../views/dashboard/user/User';
import CreateUser from '../views/dashboard/user/CreateUser';
import EditUser from '../views/dashboard/user/EditUser';
//----------------------------------------------------------------------------
import Login from '../views/auth/Login';
import NotFound from '../views/Page404';
import DashboardApp from '../views/dashboard/app/DashboardApp';
//----------------------------------------------------------------------------
import Lab from "../views/dashboard/lab/Lab";
import EditLab from "../views/dashboard/lab/EditLab";
//----------------------------------------------------------------------------
import ViewHealthReport from '../views/dashboard/health-report/ViewHealthReport';
import HealthReport from '../views/dashboard/health-report/HealthReport';
//----------------------------------------------------------------------------
import Profile from '../views/dashboard/profile/Profile';
import ChangePassword from '../views/dashboard/profile/ChangePassword';
//----------------------------------------------------------------------------


export default function Router() {
  const [showCookieUserID, setCookieUserID] = useState(Cookies.get('user_name'));
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: showCookieUserID !== undefined ? <DashboardApp /> : <Navigate to="/login" replace /> },
        { path: 'lab', element: showCookieUserID !== undefined ? <Lab /> : <Navigate to="/login" replace /> },
        { path: 'lab/edit/:report_id', element: showCookieUserID !== undefined ? <EditLab /> : <Navigate to="/login" replace /> },
        { path: 'health-report', element: showCookieUserID !== undefined ? <HealthReport /> : <Navigate to="/login" replace />, },
        { path: 'view-health-report/:report_id', element: showCookieUserID !== undefined ? <ViewHealthReport /> : <Navigate to="/login" replace />, },
        { path: 'user', element: showCookieUserID !== undefined ? <User /> : <Navigate to="/login" replace /> },
        { path: 'user/create', element: showCookieUserID !== undefined ? <CreateUser /> : <Navigate to="/login" replace /> },
        { path: 'user/edit/:user_name', element: showCookieUserID !== undefined ? <EditUser /> : <Navigate to="/login" replace /> },
        { path: 'profile/:user_name', element: showCookieUserID !== undefined ? <Profile /> : <Navigate to="/login" replace /> },
        { path: 'change-password', element: showCookieUserID !== undefined ? <ChangePassword /> : <Navigate to="/login" replace />, },
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

import { useEffect, useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import AdminLayout from './layouts/admin';
import MentorLayout from './layouts/mentor';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import CodeLayout from './layouts/code';
//
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import CodingArena from './pages/CodingArena';
import AddModules from './pages/admin/addModules';
import AddCourses from './pages/admin/addCourse';
import AddLesson from './pages/admin/addLesson';
import AddInstructor from './pages/admin/addInstructor';
import { Dashboard } from './pages/mentor/Dashboard';
import { useAuth } from './contexts/AuthContext';

// ----------------------------------------------------------------------

export default function Router() {
  let routes = [];
  const { user, refresh, adminOn } = useAuth();

  // const [email, setEmail] = useState('');

  // /// ///////////////////To fetch the user and update it to the redux store
  // useEffect(() => {
  //   fetch('/auth/profile')
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log('response', res);
  //       setEmail(res.email);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [email]);
  if (!refresh) {
    if (user && user.email !== 'none' && user.email !== '') {
      routes =
        user.admin && user.redirectToAdmin
          ? [
              {
                path: '/admin',
                element: <AdminLayout />,
                children: [
                  { path: '/', element: <Navigate to="/admin/course" replace /> },
                  { path: 'course', element: <AddCourses /> },
                  { path: 'modules', element: <AddModules /> },
                  { path: 'lession', element: <AddLesson /> },
                  { path: 'instructor', element: <AddInstructor /> }
                ]
              },
              {
                path: '/',
                element: <LogoOnlyLayout />,
                children: [
                  { path: '/login', element: <Navigate to="/admin" replace /> },
                  { path: '404', element: <NotFound /> },
                  { path: '/', element: <Navigate to="/admin" /> },
                  { path: '*', element: <Navigate to="/404" /> }
                ]
              },

              { path: '*', element: <Navigate to="/404" replace /> }
            ]
          : user.mentor
          ? [
              {
                path: '/mentor',
                element: <MentorLayout />,
                children: [
                  { path: '/', element: <Navigate to="/mentor/dashboard" replace /> },
                  { path: 'dashboard', element: <Dashboard /> }
                ]
              },
              {
                path: '/',
                element: <LogoOnlyLayout />,
                children: [
                  { path: '/login', element: <Navigate to="/mentor" replace /> },
                  { path: '404', element: <NotFound /> },
                  { path: '/', element: <Navigate to="/mentor" /> },
                  { path: '*', element: <Navigate to="/404" /> }
                ]
              },

              { path: '*', element: <Navigate to="/404" replace /> }
            ]
          : [
              {
                path: '/dashboard',
                element: <DashboardLayout />,
                children: [
                  { path: '/', element: <Navigate to="/dashboard/app" replace /> },
                  { path: 'app', element: <DashboardApp /> },
                  { path: 'modules', element: <User /> },
                  { path: 'doubts', element: <Products /> },
                  { path: 'blog', element: <Blog /> }
                ]
              },
              {
                path: '/code',
                element: <CodeLayout />,
                children: [
                  { path: '/', element: <Navigate to="/dashboard" replace /> },
                  { path: '/*', element: <CodingArena /> }
                ]
              },
              {
                path: '/',
                element: <LogoOnlyLayout />,
                children: [
                  { path: '/login', element: <Navigate to="/dashboard" replace /> },
                  { path: '404', element: <NotFound /> },
                  { path: '/', element: <Navigate to="/dashboard" /> },
                  { path: '*', element: <Navigate to="/404" /> }
                ]
              },

              { path: '*', element: <Navigate to="/404" replace /> }
            ];
    } else if (user && user.email === 'none') {
      routes = [
        {
          path: '/',
          element: <LogoOnlyLayout />,
          children: [
            { path: '/', element: <Navigate to="/login" replace /> },
            { path: 'login', element: <Login /> }
          ]
        },

        { path: '*', element: <Navigate to="/login" replace /> }
      ];
    }
  }

  return useRoutes(routes);
}

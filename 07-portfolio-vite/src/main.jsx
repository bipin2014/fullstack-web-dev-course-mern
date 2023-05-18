import React from 'react';
import ReactDOM from 'react-dom/client';
import Homepage from './Portfolio/Homepage.jsx';
import './index.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Body from './Portfolio/Body.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    children: [
      {
        path: '',
        element: <Body />,
      },
      {
        path: 'Projects',
        element: <h1>Projects</h1>,
      },
      {
        path: 'Works',
        element: <h1>Works</h1>,
      },

      {
        path: 'admin',
        element: (
          <div>
            <h1>Admin</h1>
            <Outlet />
            <h1>Admin End</h1>
          </div>
        ),
        children: [
          {
            path: 'dashboard',
            element: <h1>Dashbaoard</h1>,
          },
        ],
      },

      {
        path: 'users',
        element: (
          <div>
            <h1>User</h1>
            <Outlet />
            <h1>User End</h1>
          </div>
        ),
        children: [
          {
            path: 'dashboard',
            element: <h1>Dashbaoard</h1>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

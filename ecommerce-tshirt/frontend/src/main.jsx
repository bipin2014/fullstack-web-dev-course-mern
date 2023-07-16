import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homepage from './module/Home/Homepage.jsx'
import SignUp from './module/auth/Signup/index.jsx'
import Login from './module/auth/Login/index.jsx'
import AuthProvier from './context/auth/AuthProvier.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Homepage />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'login',
        element: <Login />
      }
    ]
  }
])

/*
global-> isAuth,user
AuthProvider->isAuth,user,login,logout
  Router
    App
      Navbar->reflect
      Footer
      Outlet
        Homepage
        SignUp
        Login- login state change
*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvier>
      <RouterProvider router={router} />
    </AuthProvier>
  </React.StrictMode>,
)

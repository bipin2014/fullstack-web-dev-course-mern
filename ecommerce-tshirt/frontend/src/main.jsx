import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homepage from './module/Home/Homepage.jsx'
import SignUp from './module/auth/Signup/index.jsx'
import Login from './module/auth/Login/index.jsx'
import AuthProvier from './context/auth/AuthProvier.jsx'
import Toaster from './module/common/Toaster/index.jsx'
import ToastProvider from './context/toast/ToastProvider.jsx'
import BlockAuthRoute from './routes/BlockAuthRoute.jsx'
import Dashboard from './module/admin/Dashboard/index.jsx'
import Users from './module/admin/Users/index.jsx'
import Products from './module/admin/Products/index.jsx'
import Brands from './module/admin/Brands/index.jsx'
import UploadProvider from './context/uploadfile/UploadProvider.jsx'
import Cart from './module/user/Cart/index.jsx'
import CartProvider from './context/cart/CartProvider.jsx'
import AdminPrivateRoute from './routes/AdminPrivateRoute.jsx'
import EsewaSuccess from './module/user/Cart/esewa/EsewaSuccess.jsx'
import EsewaFailed from './module/user/Cart/esewa/EsewaFailed.jsx'
import OrderDetails from './module/user/order/OrderDetails.jsx'
import Orders from './module/admin/Orders/index.jsx'

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
        element: <BlockAuthRoute><SignUp /></BlockAuthRoute>
      },
      {
        path: 'login',
        element: <BlockAuthRoute><Login /></BlockAuthRoute>
      },
      {
        path: 'admin',
        element: <AdminPrivateRoute><Dashboard /></AdminPrivateRoute>,
        children: [
          {
            path: 'dashboard',
            element: <Homepage />
          },
          {
            path: 'users',
            element: <Users />
          },
          {
            path: 'products',
            element: <Products />
          },
          {
            path: 'brands',
            element: <Brands />
          },
          {
            path: 'orders',
            element: <Orders />
          },

        ]
      },
      {
        path: 'users',
        children: [
          {
            path: 'cart',
            element: <Cart />
          },
          {
            path: 'esewa_payment_success',
            element: <EsewaSuccess />
          },
          {
            path: 'esewa_payment_failed',
            element: <EsewaFailed />
          },
          {
            path: 'orders/:orderId',
            element: <OrderDetails />
          },
        ]
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
    <ToastProvider>
      <AuthProvier>
        <UploadProvider>
          <CartProvider>
            <Toaster />
            <RouterProvider router={router} />
          </CartProvider>
        </UploadProvider>
      </AuthProvier>
    </ToastProvider>
  </React.StrictMode>,
)

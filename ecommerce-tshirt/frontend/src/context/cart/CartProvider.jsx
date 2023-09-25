import { useContext, useState } from "react";
import { apiUrl } from "../../constants";
import { CartContext } from "./CartContext";
import { ToastContext } from "../toast/ToastContext";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { showToast } = useContext(ToastContext)
  const { user } = useContext(AuthContext)

  // Login function to update the authentication state
  const getCarts = () => {
    let token = localStorage.getItem('token');

    axios.get(`${apiUrl}/api/carts/${user._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
    )
      .then(res => {
        console.log(res.data);
        setCart(res.data)
      }).catch(err => {
        console.log(err);
        showToast({ show: true, title: 'Error', message: err.response?.data.error || 'Server Error', type: 'error' })

      })
  };
  const saveCarts = (payload) => {
    let token = localStorage.getItem('token');

    axios.post(`${apiUrl}/api/carts/${user._id}`, payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
    )
      .then(res => {
        console.log(res.data);
        showToast({ show: true, title: 'Success', message: res.data.message, type: 'success' })

        getCarts()
      }).catch(err => {
        console.log(err);
        showToast({ show: true, title: 'Error', message: err.response?.data.error || 'Server Error', type: 'error' })

      })
  };

  const addToCart = (product) => {
    if (user._id) {
      let token = localStorage.getItem('token');
      axios.post(`${apiUrl}/api/carts/addToCart/${user._id}`, { product: product._id }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        showToast({ show: true, title: 'Success', message: 'Added To cart successfully', type: 'success' })

        console.log(res);
      }).catch(err => {
        console.log(err);
        showToast({ show: true, title: 'Error', message: err.response?.data.error || 'Server Error', type: 'error' })

      })
    } else {
      //goto login
    }

  }


  // Provide the updated values to the context
  const uploadContextValue = {
    cart,
    getCarts,
    addToCart,
    saveCarts
  };

  return (
    <CartContext.Provider value={uploadContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/auth/AuthContext'
import { ToastContext } from '../../../context/toast/ToastContext'
import axios from 'axios'
import { apiUrl } from '../../../constants'
import Modal from '../../common/Modal'
import SignUp from '../../auth/Signup'
import EditProduct from './components/EditProduct'

export default function Products() {

  const [products, setProducts] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [editProductObj, setEditProductObj] = useState({})
  const { user } = useContext(AuthContext)
  const { showToast } = useContext(ToastContext)

  useEffect(() => {
    if (user && !showModal) {
      getProductsFromApi()
    }
  }, [user, showModal])

  const getProductsFromApi = () => {
    let token = localStorage.getItem('token');

    axios.get(`${apiUrl}/api/products/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res.data);
      setProducts(res.data)
    }).catch(err => {
      console.log(err);
      showToast({ show: true, title: 'Error', message: err.response?.data.error || 'Server Error', type: 'error' })

    })

  }

  const addProductApi = (productObj) => {
    let token = localStorage.getItem('token');
    axios.post(`${apiUrl}/api/products/create/${user._id}`, productObj, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      showToast({ show: true, title: 'Success', message: 'Product Add Sucessfull', type: 'success' })

      getProductsFromApi()
    }).catch(err => {
      console.log(err);
      showToast({ show: true, title: 'Error', message: err.response?.data.error || 'Server Error', type: 'error' })
    })
  }

  const updateProductApi = (productObj) => {
    let token = localStorage.getItem('token');
    axios.put(`${apiUrl}/api/products/${productObj._id}/${user._id}`, productObj, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      showToast({ show: true, title: 'Success', message: 'Product updated Sucessfull', type: 'success' })

      getProductsFromApi()
    }).catch(err => {
      console.log(err);
      showToast({ show: true, title: 'Error', message: err.response?.data.error || 'Server Error', type: 'error' })

    })
  }
  const deleteProductApi = (productObj) => {
    setShowModal(false)
    let token = localStorage.getItem('token');
    axios.delete(`${apiUrl}/api/products/${productObj._id}/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      showToast({ show: true, title: 'Success', message: 'Product deleted Sucessfull', type: 'success' })

      getProductsFromApi()
    }).catch(err => {
      console.log(err);
      showToast({ show: true, title: 'Error', message: err.response?.data.error || 'Server Error', type: 'error' })

    })
  }

  const addAction = () => {
    setModalType('add')
    setShowModal(true)
  }
  const editAction = (productObj) => {
    setModalType('edit')
    setEditProductObj(productObj)
    setShowModal(true)
  }
  const deleteAction = (productObj) => {
    setModalType('delete')
    setEditProductObj(productObj)
    setShowModal(true)
  }

  const productItem = (product) => (
    <tr key={product._id}>
      <td className="whitespace-nowrap px-4 py-4">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={`${apiUrl}/api/${product.image}`}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{product.title}</div>
          </div>
        </div>
      </td>

      <td className="whitespace-nowrap px-4 py-4">
        {product.description.length < 10 ?
          product.description :
          product.description.substring(0, 10) + '...'}
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
        <span className="line-through mr-2">
          Rs.{product.price}
        </span>
        Rs.{product.discounted_price}
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
        <button onClick={() => editAction(product)} className="text-gray-700 px-2">
          Edit
        </button>
        <button onClick={() => deleteAction(product)} className="text-red-700 px-2">
          Delete
        </button>
      </td>
    </tr>
  )


  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Products</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all Products. You can add new Products, edit or delete existing
              ones.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={addAction}
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new Product
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>Product Title</span>
                      </th>


                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Description
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Price
                      </th>
                      <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {products.map((user) => (
                      <>{productItem(user)}</>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showModal && modalType === "add" &&
        <Modal show={showModal} setShowModal={setShowModal}>
          <EditProduct user={user} setShowModal={setShowModal} addProductApi={addProductApi} />
        </Modal>
      }
      {showModal && modalType === "edit" &&
        <Modal show={showModal} setShowModal={setShowModal}>
          <EditProduct user={user} product={editProductObj} setShowModal={setShowModal} updateProductApi={updateProductApi} />
        </Modal>
      }
      {showModal && modalType === "delete" &&
        <Modal show={showModal} setShowModal={setShowModal}>
          <div>
            <div>Are you sure want to delete?</div>
            <div className="flex py-4">
              <button className='px-2' onClick={() => setShowModal(false)}>Cancel</button>
              <button className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() => deleteProductApi(editProductObj)}>Delete</button>
            </div>
          </div>
        </Modal>
      }

    </>
  )
}

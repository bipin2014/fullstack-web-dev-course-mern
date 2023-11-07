import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { apiUrl } from '../../../constants'
import { useContext } from 'react'
import { AuthContext } from '../../../context/auth/AuthContext'
import { ToastContext } from '../../../context/toast/ToastContext'
import Modal from '../../common/Modal'
import EditOrder from './components/EditOrder'

export default function Orders() {

  const [orders, setOrders] = useState([])
  const { user } = useContext(AuthContext)
  const { showToast } = useContext(ToastContext)

  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [editOrderObj, setEditOrderObj] = useState({})

  useEffect(() => {
    if (user && !showModal) {
      getordersFromApi()
    }
  }, [user, showModal])

  const getordersFromApi = () => {
    let token = localStorage.getItem('token');
    axios.get(`${apiUrl}/api/orders/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res.data);
      setOrders(res.data)
    }).catch(err => {
      console.log(err);
      showToast({ show: true, title: 'Error', message: err.response?.data.error || 'Server Error', type: 'error' })

    })
  }

  const updateOrderApi = (productObj) => {
    let token = localStorage.getItem('token');
    axios.put(`${apiUrl}/api/orders/${productObj._id}/${user._id}`, productObj, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      showToast({ show: true, title: 'Success', message: 'Update Sucessfull', type: 'success' })

      getordersFromApi()
    }).catch(err => {
      console.log(err);
      showToast({ show: true, title: 'Error', message: err.response?.data.error || 'Server Error', type: 'error' })
    })
  }

  const editAction = (orderObj) => {
    setModalType('edit')
    setEditOrderObj(orderObj)
    setShowModal(true)
  }

  const orderItem = (order) => (
    <tr key={order.name}>
      <td className="whitespace-nowrap px-4 py-4">
        <div className="flex items-center">

          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{order.products.length} Products</div>
          </div>
        </div>
      </td>

      <td className="whitespace-nowrap px-4 py-4">
        {order.status}
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
        Rs.{order.amount}

      </td>
      <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
        <button className="text-gray-700 px-2" onClick={() => editAction(order)}>
          Edit
        </button>
      </td>
    </tr>
  )






  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all orders. You can add new orders, edit or delete existing
              ones.
            </p>
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
                        <span>Products</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Amount
                      </th>
                      <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {orders.map((product) => (
                      <>{orderItem(product)}</>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      {
        showModal && modalType === "edit" &&
        <Modal setShowModal={setShowModal} show={showModal}>
          <EditOrder order={editOrderObj} setShowModal={setShowModal} updateOrderApi={updateOrderApi} />
        </Modal>
      }
      
    </>
  )
}

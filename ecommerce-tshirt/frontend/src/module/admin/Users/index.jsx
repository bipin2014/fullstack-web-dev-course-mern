import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/auth/AuthContext'
import { ToastContext } from '../../../context/toast/ToastContext'
import axios from 'axios'
import { apiUrl } from '../../../constants'
import Modal from '../../common/Modal'
import SignUp from '../../auth/Signup'
import EditUser from './components/EditUser'

export default function Users() {

  const [users, setUsers] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [editUserObj, setEditUserObj] = useState({})
  const { user } = useContext(AuthContext)
  const { showToast } = useContext(ToastContext)

  useEffect(() => {
    if (user && !showModal) {
      getUsersFromApi()
    }
  }, [user, showModal])

  const getUsersFromApi = () => {
    let token = localStorage.getItem('token');

    axios.get(`${apiUrl}/api/users/users/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res.data);
      setUsers(res.data)
    }).catch(err => {
      console.log(err);
      showToast({ show: true, title: 'Error', message: err.response?.data.error || 'Server Error', type: 'error' })

    })

  }

  const updateUserApi = (userObj) => {
    let token = localStorage.getItem('token');
    axios.put(`${apiUrl}/api/users/users/admin/update/${user._id}`, userObj, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      getUsersFromApi()
    }).catch(err => {
      console.log(err);
      showToast({ show: true, title: 'Error', message: err.response?.data.error || 'Server Error', type: 'error' })

    })
  }
  const deleteUserApi = (userObj) => {
    setShowModal(false)
    let token = localStorage.getItem('token');
    axios.delete(`${apiUrl}/api/users/users/${userObj._id}/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      getUsersFromApi()
    }).catch(err => {
      console.log(err);
      showToast({ show: true, title: 'Error', message: err.response?.data.error || 'Server Error', type: 'error' })

    })
  }

  const addAction = () => {
    setModalType('add')
    setShowModal(true)
  }
  const editAction = (userObj) => {
    setModalType('edit')
    setEditUserObj(userObj)
    setShowModal(true)
  }
  const deleteAction = (userObj) => {
    setModalType('delete')
    setEditUserObj(userObj)
    setShowModal(true)
  }

  const userItem = (user) => (
    <tr key={user.name}>
      <td className="whitespace-nowrap px-4 py-4">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={user.photo}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-700">{user.email}</div>
          </div>
        </div>
      </td>

      <td className="whitespace-nowrap px-4 py-4">
        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
          Active
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
        {user.role === 1 ? 'Admin' : 'User'}
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
        <button onClick={() => editAction(user)} className="text-gray-700 px-2">
          Edit
        </button>
        <button onClick={() => deleteAction(user)} className="text-red-700 px-2">
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
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all Users. You can add new Users, edit or delete existing
              ones.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={addAction}
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new User
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
                        <span>User</span>
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
                        Role
                      </th>
                      <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {users.map((user) => (
                      <>{userItem(user)}</>
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
          <SignUp setShowModal={setShowModal} />
        </Modal>
      }
      {showModal && modalType === "edit" &&
        <Modal show={showModal} setShowModal={setShowModal}>
          <EditUser user={editUserObj} setShowModal={setShowModal} updateUserApi={updateUserApi} />
        </Modal>
      }
      {showModal && modalType === "delete" &&
        <Modal show={showModal} setShowModal={setShowModal}>
          <div>
            <div>Are you sure want to delete?</div>
            <div className="flex py-4">
              <button className='px-2' onClick={() => setShowModal(false)}>Cancel</button>
              <button className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() => deleteUserApi(editUserObj)}>Delete</button>
            </div>
          </div>
        </Modal>
      }

    </>
  )
}

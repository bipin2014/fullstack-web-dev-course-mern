import { useContext, useState } from "react";
import { apiUrl } from "../../constants";
import { UploadContext } from "./UploadContext";
import { ToastContext } from "../toast/ToastContext";
import axios from "axios";

const UploadProvider = ({ children }) => {
  const [uploadFile, setUploadFile] = useState(null);
  const { showToast } = useContext(ToastContext)

  // Login function to update the authentication state
  const uploadFileToServer = (payload, user) => {
    let token = localStorage.getItem('token');


    const formData = new FormData();
    formData.append('file', payload.file);
    formData.append('name', payload.name);
    formData.append('type', 'image');


    axios.post(`${apiUrl}/api/upload-files/${user._id}`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
    )
      .then(res => {
        console.log(res.data);
        setUploadFile(res.data)
      }).catch(err => {
        console.log(err);
        showToast({ show: true, title: 'Error', message: err.response?.data.error || 'Server Error', type: 'error' })

      })
  };

  const clearFile = () => {
    setUploadFile(null);
  };

  // Provide the updated values to the context
  const uploadContextValue = {
    uploadFile,
    uploadFileToServer,
    clearFile,
  };

  return (
    <UploadContext.Provider value={uploadContextValue}>
      {children}
    </UploadContext.Provider>
  );
};

export default UploadProvider
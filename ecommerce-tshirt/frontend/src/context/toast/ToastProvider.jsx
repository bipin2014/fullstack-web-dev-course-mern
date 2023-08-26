import React, { useState } from 'react'
import { ToastContext } from './ToastContext';

export default function ToastProvider({ children }) {
    const [toastData, setToastData] = useState({ show: false, title: '', message: '', type: '' });

    const showToast = (newToastData) => {
        console.log({ ...toastData, ...newToastData });
        setToastData({ ...toastData, ...newToastData });
        setTimeout(() => {
            clearToast()
        }, 8000);
    };

    const clearToast = () => {
        setToastData({
            ...toastData,
            show: false,
            title: '',
            message: '',
            type: ''
        })
    }

    const { show, title, message, type } = toastData

    // Provide the updated values to the context
    const toastContextValue = {
        show,
        title,
        message,
        type,
        showToast
    };

    return (
        <ToastContext.Provider value={toastContextValue}>
            {children}
        </ToastContext.Provider>
    )
}

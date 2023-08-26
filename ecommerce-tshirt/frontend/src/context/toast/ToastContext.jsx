import { createContext } from 'react';

export const ToastContext = createContext({
    show: false,
    title: '',
    message: '',
    type: '',
    showToast: () => { }
});
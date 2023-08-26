import { createContext } from 'react';

export const UploadContext = createContext({
    uploadFile: null,
    uploadFileToServer: () => { },
    clearFile: () => { }
});
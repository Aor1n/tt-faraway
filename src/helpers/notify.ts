import { toast, type TypeOptions } from 'react-toastify';

export const notify = (type: TypeOptions, message: string): void => {
  toast(message, {
    type,
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

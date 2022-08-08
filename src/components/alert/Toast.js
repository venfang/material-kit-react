import { ToastContainer, toast } from 'react-toastify';
// eslint-disable-next-line prefer-template
import 'react-toastify/dist/ReactToastify.css';

export function ErrorToast(inputTitle) {

    toast.error(inputTitle, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });

};

export function SuccessToast(inputTitle) {

    toast.success(inputTitle, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });

};

export function InfoToast(inputTitle) {

    toast.info(inputTitle, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });


};  

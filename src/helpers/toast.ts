import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (
    type: 'success' | 'error',
    message: string
) => {
    return toast[type](message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}
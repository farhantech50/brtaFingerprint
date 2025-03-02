import { toast } from "react-toastify";

const showToast = (message, type) => {
  if (type == true) {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      style: { background: "#50b50d" },
      progress: undefined,
      theme: "colored",
    });
  } else {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      style: { background: "#de0d0d" },
      progress: undefined,
      theme: "colored",
    });
  }
};

export default showToast;

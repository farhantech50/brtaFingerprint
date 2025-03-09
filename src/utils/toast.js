import { toast } from "react-toastify";

const showToast = (message, type) => {
  if (type == "success") {
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
  } else if (type === "error") {
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
  } else if (type === "warn") {
    toast.warn(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      style: { background: "#ed7718" },
      progress: undefined,
      theme: "colored",
    });
  }
};

export default showToast;

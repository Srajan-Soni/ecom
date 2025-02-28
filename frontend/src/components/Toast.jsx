import { useEffect } from "react";

const Toast = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose(); 
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed bottom-5 right-[50%] bg-green-500 text-white px-4 py-2 rounded-lg shadow-md transition-transform ${
        show ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;

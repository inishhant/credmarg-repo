// components/Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center z-50 max-h-min">
      <div
        className="p-4 rounded-lg relative w-full max-w-sm mx-4 max-h-min"
        style={{ background: "linear-gradient(to right, #000000, #434343)" }}
      >
        <button
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

import React from "react";
import "./Modal.css"; // Add some basic styling for the modal

const Modal = ({ show, handleClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

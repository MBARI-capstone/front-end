import React from 'react';

const Modal = ({ isOpen, closeModal, confirmAction, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            {/* Icon or Image */}
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">{children}</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Are you sure you want to deny this pre-cruise? This action cannot be undone.
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={confirmAction}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Confirm Deny
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

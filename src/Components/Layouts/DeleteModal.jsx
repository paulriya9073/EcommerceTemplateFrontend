import { useEffect, useState } from 'react';
import { GoAlertFill } from "react-icons/go";


export default function DeleteModal({heading,title1,title2,onClose,deleteHandler,buttonName}) {
  
  const [isOpen, setIsOpen] = useState(true);
  
  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };
  
  const handleCancel = () => {
    handleClose();
  };
  
  
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex flex-col items-center mb-4">
          <div className="bg-red-100 p-3 rounded-full mb-4">
            <GoAlertFill className="text-red-500 w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{heading}</h2>
        </div>
        
        <div className="mb-6 text-center">
          <p className="text-gray-700 mb-4">
            {title1}
          </p>
          <p className="text-sm text-gray-500">
            {title2}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={handleCancel}
            className="px-5 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={deleteHandler}
            className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-medium transition-colors"
          >
            {buttonName}
          </button>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { FaCity } from "react-icons/fa";
import { GiPostOffice } from "react-icons/gi";
import { MdPhone, MdPerson, MdPublic, MdHome, MdClose } from "react-icons/md";

const AddressModal = ({ 
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  mode = 'create',
  title = 'Address'
}) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Phone number validation
    if (name === 'phone') {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData({ ...formData, [name]: value });
      }
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const buttonText = mode === 'create' ? 'Create' : 'Save';
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white shadow-xl border-2 rounded-lg p-8 w-80 md:w-96 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <MdClose size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
            <MdPerson className="absolute left-3 top-3 text-blue-600" size={24} />
            <input
              className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
              type="text"
              name="name"
              placeholder="First and Last Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="relative">
            <MdPhone className="absolute left-3 top-3 text-blue-600" size={24} />
            <input
              className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="relative">
            <MdHome className="absolute left-3 top-3 text-blue-600" size={24} />
            <input
              className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="relative">
            <FaCity className="absolute left-3 top-3 text-blue-600" size={24} />
            <input
              className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="relative">
            <MdPublic className="absolute left-3 top-3 text-blue-600" size={24} />
            <input
              className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="relative">
            <GiPostOffice className="absolute left-3 top-3 text-blue-600" size={24} />
            <input
              className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
              type="text"
              name="pincode"
              placeholder="Pin Code"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="relative">
            <MdPublic className="absolute left-3 top-3 text-blue-600" size={24} />
            <input
              className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex justify-center items-center gap-4">
            <button
              type="button"
              className="w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-all"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
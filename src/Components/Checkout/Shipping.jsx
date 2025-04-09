import React, { useState, useEffect } from 'react'
import Navbar from '../Layouts/Navbar'
import Footer from '../Layouts/Footer'
import CheckOutSteps from './CheckOutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { GetShippingAddress } from '../../Actions/Order'
import { createAddress, updateSingleAddress, loadSingleAddresses } from '../../Actions/Address'

import toast from 'react-hot-toast'
import AddressModal from '../Address/AddressModal'

const Shipping = () => {
  const { user } = useSelector((state) => state.user)
  const { address } = useSelector((state) => state.address)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [selectAddress, setSelectAddress] = useState(null)
  
  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('create') // 'create' or 'edit'
  const [currentAddressId, setCurrentAddressId] = useState(null)
  
  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: ""
  })

  // Load single address when editing
  useEffect(() => {
    if (currentAddressId && modalMode === 'edit') {
      dispatch(loadSingleAddresses(currentAddressId))
    }
  }, [currentAddressId, modalMode, dispatch])

  // Set form data when address is loaded for editing
  useEffect(() => {
    if (address && modalMode === 'edit') {
      setFormData({
        name: address.name || "",
        phone: address.phone || "",
        address: address.address || "",
        city: address.city || "",
        state: address.state || "",
        pincode: address.pincode || "",
        country: address.country || ""
      })
    }
  }, [address, modalMode])

  const handleSelectAddress = (addressId) => {
    setSelectAddress(addressId)
    dispatch(GetShippingAddress(addressId))
  }

  // Open create modal
  const openCreateModal = () => {
    setModalMode('create')
    setCurrentAddressId(null)
    setFormData({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: ""
    })
    setShowModal(true)
  }

  // Open edit modal
  const openEditModal = (id) => {
    setModalMode('edit')
    setCurrentAddressId(id)
    setShowModal(true)
  }

  // Close modal
  const closeModal = () => {
    setShowModal(false)
    setCurrentAddressId(null)
  }

  // Handle form submission
  const handleSubmit = (data) => {
    if (modalMode === 'create') {
      // Create new address
      dispatch(createAddress(
        data.name,
        data.phone,
        data.address,
        data.city,
        data.state,
        data.pincode,
        data.country
      ))
      toast.success("Address Created!!")
    } else {
      // Update existing address
      dispatch(updateSingleAddress(
        currentAddressId,
        data.name,
        data.phone,
        data.address,
        data.city,
        data.state,
        data.pincode,
        data.country
      ))
      toast.success("Address Updated!!")
    }
    
    closeModal()
    // Reload user data to get updated addresses
    dispatch({ type: 'LOAD_USER_REQUEST' })
  }

  return (
    <>
      <Navbar />
      <div className='w-full h-full bg-blue-50'>
        <div id='progress' className='w-full h-20 py-6 md:py-10'>
          <CheckOutSteps activeStep={0} />
        </div>
        <div className='h-full w-full flex justify-center'>
          <div className='h-full w-[90vw] p-8 flex flex-col gap-3'>
            {/* Add New Address Button */}
            <div 
              onClick={openCreateModal} 
              className='w-full h-22 md:h-32 bg-white flex flex-col justify-center items-center md:gap-2 p-2 rounded-md shadow-md cursor-pointer hover:bg-blue-50 transition-all'
            >
              <h1 className='text-[1rem] md:text-xl'>Add New Address</h1>
              <i className="ri-add-circle-line text-2xl md:text-5xl"></i>
            </div>
            
            {/* Address List */}
            {user && user.username && user.addresses.map((add, index) => (
              <div 
                key={index}
                onClick={() => handleSelectAddress(add._id)}
                className={`w-full h-auto bg-white flex flex-col p-4 rounded-md shadow-xl cursor-pointer ${selectAddress === add._id ? 'border-2 border-blue-500' : ''}`}
              >
                <div className='flex flex-col md:gap-2 p-2'>
                  <h1 className='text-[1.1rem] md:text-2xl pb-1'>{add.name}</h1>
                  <p className='text-[1rem] md:text-xl'>
                    {add.address}
                    <br />
                    {add.city}
                    <br />
                    {add.state}-{add.pincode}
                    <br />
                    {add.country}
                  </p>
                  <h1 className='text-[1.1rem] md:text-2xl pt-1'>{add.phone}</h1>
                </div>
                <div className='w-full flex justify-end gap-2 p-2'>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();  // Prevent selection of address
                      openEditModal(add._id);
                    }} 
                    className='bg-blue-100 text-blue-500 hover:bg-blue-300 transition-colors duration-300 rounded w-12 text-center'
                  >
                    <i className="ri-pencil-line text-xl md:text-2xl"></i>
                  </button>
                </div>
              </div>
            ))}
            
            {/* Continue Button */}
            <Link to='/checkout/confirmorder' className='flex justify-center'>
              <button
                disabled={!selectAddress}
                className={`w-full md:w-96 h-14 rounded-full md:rounded-md text-xl md:text-2xl ${!selectAddress ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold shadow-xl`}
              >
                Continue
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Address Modal */}
      <AddressModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        mode={modalMode}
        title={modalMode === 'create' ? 'New Address' : 'Update Address'}
      />
      
      <Footer />
    </>
  )
}

export default Shipping
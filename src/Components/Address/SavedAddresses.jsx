import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { deleteAddresses, createAddress, updateSingleAddress, loadSingleAddresses } from '../../Actions/Address';
import { loadUser } from '../../Actions/User';
import { LoadAdminImages } from '../../Actions/AdminImg';
import AddressModal from './AddressModal';

const SavedAddresses = () => {
  const { user } = useSelector((state) => state.user);
  const { address } = useSelector((state) => state.address);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [visibleAddresses, setVisibleAddresses] = useState(2);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [currentAddressId, setCurrentAddressId] = useState(null);
  
  // Single form data state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: ""
  });

  useEffect(() => {
    dispatch(loadUser());
    dispatch(LoadAdminImages());
  }, [dispatch]);
  
  useEffect(() => {
    if (currentAddressId && modalMode === 'edit') {
      dispatch(loadSingleAddresses(currentAddressId));
    }
  }, [currentAddressId, modalMode, dispatch]);
  
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
      });
    }
  }, [address, modalMode]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const deleteAddressHandler = (id) => {
    setLoading(true);
    dispatch(deleteAddresses(id));
    toast.success("Address Deleted!");
    dispatch(loadUser());
    setLoading(false);
  };

  const loadMoreAddress = () => {
    setVisibleAddresses((prev) => prev + 2);
  };
  
  // Open create modal
  const openCreateModal = () => {
    setModalMode('create');
    setCurrentAddressId(null);
    setFormData({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: ""
    });
    setShowModal(true);
  };
  
  // Open edit modal
  const openEditModal = (id) => {
    setModalMode('edit');
    setCurrentAddressId(id);
    setShowModal(true);
  };
  
  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setCurrentAddressId(null);
  };
  
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
      ));
      toast.success("Address Created!!");
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
      ));
      toast.success("Address Updated!!");
    }
    
    closeModal();
    dispatch(loadUser());
  };

  return (
    <>
      {/* Addresses */}
      <div className='h-full mx-8'>
        <div 
          onClick={openCreateModal} 
          className='w-full h-22 md:h-44 bg-white flex flex-col justify-center items-center md:gap-2 p-2 rounded-md shadow-md cursor-pointer hover:bg-blue-50 transition-all'
        >
          <h1 className='text-[1rem] md:text-xl'>Add New Address</h1>
          <i className="ri-add-circle-line text-2xl md:text-5xl"></i>
        </div>
        
        <div className='flex flex-col gap-2 justify-center items-center py-4'>
          {
            user && user?.addresses && user?.addresses?.length === 0 ?
              (
                <h1 className='md:text-2xl'>Add Address</h1>
              ) :
              (
                <>
                  <div className='w-full flex flex-col gap-2'>
                    {
                      user && user?.username && user?.addresses?.slice(0, visibleAddresses).map((add, index) => (
                        <div key={index} className='w-full h-auto bg-white flex flex-col md:gap-2 p-2 rounded-md shadow-md'>
                          <div className='flex flex-col md:gap-2 p-2'>
                            <h1 className='text-[1.1rem] md:text-2xl pb-1'>{add.name}</h1>
                            <p className='text-[1rem] md:text-xl'>{add.address}
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
                              onClick={() => openEditModal(add._id)} 
                              className='bg-blue-100 text-blue-500 hover:bg-blue-300 transition-colors duration-300 rounded w-12 text-center'
                            >
                              <i className="ri-pencil-line text-xl md:text-2xl"></i>
                            </button>
                            <button 
                              className='bg-red-100 text-red-500 hover:bg-red-300 transition-colors duration-300 rounded w-12' 
                              onClick={() => deleteAddressHandler(add._id)}
                            >
                              <i className="ri-delete-bin-line text-xl md:text-2xl"></i>
                            </button>
                          </div>
                        </div>
                      ))
                    }
                  </div>

                  {user?.addresses?.length > visibleAddresses && (
                    <button
                      onClick={loadMoreAddress}
                      className='bg-blue-500 text-white mt-2 px-6 py-2 rounded-md hover:bg-blue-600'
                    >
                      Load More
                    </button>
                  )}
                </>
              )
          }
        </div>
      </div>
      
      {/* Reusable Address Modal */}
      <AddressModal 
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        mode={modalMode}
        title={modalMode === 'create' ? 'New Address' : 'Update Address'}
      />
    </>
  );
};

export default SavedAddresses;
import React, { useEffect, useState } from 'react'
import UserSidebar from '../Layouts/UserSidebar'
import Navbar from '../Layouts/Navbar'
import Footer from '../Layouts/Footer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAddresses } from '../../Actions/Address'
import { loadUser } from '../../Actions/User'
import toast from 'react-hot-toast'

const SavedAddresses = () => {
  const { user } = useSelector((state) => state.user) 
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false) 
  const [visibleAddresses, setVisibleAddresses] = useState(2)
  
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  useEffect(()=>{
    dispatch(loadUser())
    // // dispatch({type:"clearErrors"})
  })

  const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
  };

  const deleteAddressHandler = (id) => {
    setLoading(true) 
    dispatch(deleteAddresses(id))
    toast.success("Address Deleted!")
    dispatch(loadUser())
    
  }

  const loadMoreAddress = () => {
    setVisibleAddresses((prev) => prev + 2)
  }

  

  return (
    <>
      <Navbar />
      <div className='w-full h-auto bg-blue-50 grid grid-cols-12'>

             <div className={`fixed top-0 left-0 z-40 w-72 md:w-full h-full bg-white transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:col-span-3`}
                >
                    <UserSidebar />
                </div>

                <div className={`md:col-span-9 h-full ${sidebarOpen ? 'hidden md:block' : 'col-span-12'}`}>
                    <div className="w-full h-16 md:h-24 text-xl md:text-2xl flex justify-center items-center">
                    <h1 className='md:text-3xl ml-3 font-bold'>Saved Addresses</h1>
                        <button className="md:hidden ml-auto mr-4" onClick={toggleSidebar}>
                            <i className="ri-menu-line text-2xl"></i>
                        </button>
                    </div>
          <div className='mx-8'>
          <Link to="/account/newaddress" className='w-full h-22 md:h-44  bg-white flex flex-col justify-center items-center md:gap-2 p-2 rounded-md shadow-md'>
            <h1 className='text-[1rem] md:text-xl  '>Add New Address</h1>
            <i className="ri-add-circle-line text-2xl md:text-5xl"></i>
          </Link>
          <div className='flex flex-col gap-2 justify-center items-center py-4 '>
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
                              <Link to={`/account/address/${add._id}`} className=' bg-blue-100 text-blue-500 hover:bg-blue-300 transition-colors duration-300 rounded w-12 text-center '>
                                <i className="ri-pencil-line text-xl md:text-2xl"></i>
                              </Link>
                              <button className=' bg-red-100 text-red-500 hover:bg-red-300 transition-colors duration-300 rounded w-12 ' onClick={() => deleteAddressHandler(add._id)}>
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
        </div>

        <div className='col-span-1'></div>
      </div>
      <Footer />
    </>
  )
}

export default SavedAddresses

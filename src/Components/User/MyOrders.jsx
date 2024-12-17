import React, { useEffect, useState } from 'react'
import Navbar from '../Layouts/Navbar'
import Footer from '../Layouts/Footer'
import UserSidebar from '../Layouts/UserSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { LoadAllMyOrders } from '../../Actions/Order'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const MyOrders = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { myOrders } = useSelector((state) => state.order)

  const navigate = useNavigate()

  const [visibleOrders, setVisibleOrders] = useState(2) 

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
};

  useEffect(() => {
    dispatch(LoadAllMyOrders())
  }, [dispatch])

  const gotoDetails = (id) => {
    navigate(`/account/myorders/${id}`)
  }

  const loadMoreOrders = () => {
    setVisibleOrders((prev) => prev + 1) 
  }

   const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'text-yellow-500';
      case 'Shipped':
        return 'text-orange-500';
      case 'Delivered':
        return 'text-green-500';
      case 'Canceled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <>
      <Navbar />
      <div className='w-full h-auto bg-blue-50 grid grid-cols-12'>
      <aside
          className={`fixed top-0 left-0 z-40 w-full h-full bg-white transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:col-span-3`}
        >
          <div className="relative">
            <UserSidebar/>
            <button
              className="absolute top-4 right-4 md:hidden text-black text-2xl p-2 rounded-full"
              onClick={toggleSidebar}
            >
            <FaArrowLeft/>
            </button>
          </div>
        </aside>

                <div className={`md:col-span-9 h-full ${sidebarOpen ? 'hidden md:block' : 'col-span-12'}`}>
                    <div className="w-full h-16 md:h-24 text-xl md:text-2xl flex justify-center items-center">
                        <h1 className="px-4 md:text-3xl font-bold">My Orders</h1>
                        <button className="md:hidden ml-auto mr-4" onClick={toggleSidebar}>
                            <i className="ri-menu-line text-2xl"></i>
                        </button>
                    </div>
          {myOrders && myOrders.length > 0 ? (
            myOrders.slice(0, visibleOrders).map((order) => (
              <div key={order._id} className='mx-4 p-4 mb-8 pb-6 rounded-md shadow-md bg-white border-b border-gray-300'>
                <div className='flex justify-between'>
                  <div className='flex flex-col'>
                  <h1 className='text-lg font-semibold text-gray-600 mb-4'>
                    Order Placed At: {new Date(order.createdAt).toLocaleDateString()}
                  </h1>
    
                    {order && order?.deliveredAt ? (
                    <h1 className={`text-lg font-semibold mb-4 `}>Status : <em className={`${getStatusColor(order.shippingStatus)}`}>{order.shippingStatus}</em> On {new Date(order.deliveredAt).toLocaleDateString()}</h1>
                  ) : (<h1 className={`text-lg font-semibold mb-4`}>Status : <em className={`${getStatusColor(order.shippingStatus)}`}>{order.shippingStatus}</em></h1>)}
                  
                  
                  </div>
                  <div>
                    <button
                      onClick={() => gotoDetails(order._id)}
                      className='m-4 bg-blue-500 text-white w-24 h-10 rounded-md hover:bg-blue-600 transition duration-200'
                    >
                      Details
                    </button>
                    
                  </div>
                </div>
                {order.orderItems.map((item) => (
                  <div key={item._id} className='flex flex-col md:flex-row items-center py-4 border-b border-gray-200 last:border-b-0'>
                    <Link to={`/product/${item.product?._id}`} className='w-full md:w-1/3 flex justify-center mb-4 md:mb-0'>
                      <img
                        className='w-40 h-40 object-contain rounded-md shadow-sm'
                        src={item.product?.images[0]?.url}
                        alt={item.product?.productName}
                      />
                    </Link>
                    <div className='w-full md:w-2/3 flex flex-col justify-between px-4'>
                      <div className='flex justify-between items-start'>
                        <Link to={`/product/${item.product?._id}`}>
                          <h1 className='text-xl font-semibold text-gray-800 mb-2'>
                            {item.product?.productName}
                          </h1>
                        </Link>
                      </div>
                      <p className='mb-2'>{item.product?.description}</p>
                      <p className='text-gray-600 mb-2'>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className='text-center text-gray-500'>No orders found</p>
          )}

          {myOrders && visibleOrders < myOrders.length && (
            <div className='flex justify-center items-center py-6'>
              <button
                        onClick={loadMoreOrders}
                        className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600'
                      >
                        Load More
                      </button>
            </div>
          )}
        </div>

       
      </div>
      <Footer />
    </>
  )
}

export default MyOrders

import * as React from 'react';
import Navbar from '../Layouts/Navbar';
import AdminSidebar from '../Layouts/AdminSidebar';
import Footer from '../Layouts/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllUser } from '../../Actions/User';
import { useNavigate } from 'react-router-dom';
import { LoadAllOrders } from '../../Actions/Order';
import { FaArrowLeft, FaEye, FaFileInvoice, FaRupeeSign } from 'react-icons/fa';

export default function AllOrders() {


  const { orders, totalAmountOfAllOrders, totalNoOfOrders } = useSelector((state) => state.order);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const [visibleAllOrders, setVisibleAllOrders] = React.useState(6)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    dispatch(LoadAllOrders())
  }, [dispatch])

  const detailsHandler = (id) => {
    navigate(`/admin/order-details/${id}`)
  }

  const loadMoreOrders = () => {
    setVisibleAllOrders((prev) => prev + 4)
  }

  // console.log(orders);

  //  console.log(user.role);


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'text-yellow-500 bg-yellow-100';
      case 'Shipped':
        return 'text-orange-500 bg-orange-100';
      case 'Delivered':
        return 'text-green-500 bg-green-100';
      case 'Canceled':
        return 'text-red-500 bg-red-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  const invoiceHandler = (id) => {
    navigate(`/invoice/${id}`)
  }

  return (
    <>
      <Navbar disableSearch={true} />
      <div className='w-full h-auto bg-blue-50 grid grid-cols-12'>
        <aside
          className={`fixed top-0 left-0 z-40 w-full h-full bg-white transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:col-span-2`}
        >
          <div className="relative">
            <AdminSidebar />
            <button
              className="absolute top-4 right-4 md:hidden text-black text-2xl p-2 rounded-full"
              onClick={toggleSidebar}
            >
              <FaArrowLeft />
            </button>
          </div>
        </aside>
        <div className={`md:col-span-10 h-full ${sidebarOpen ? 'hidden md:block' : 'col-span-12'}`}>
          <div className="w-full h-16 md:h-24 text-xl md:text-3xl flex justify-center items-center">
            <h1 className="px-4 font-bold">Orders</h1>
            <button className="md:hidden ml-auto mr-4" onClick={toggleSidebar}>
              <i className="ri-menu-line text-2xl"></i>
            </button>
          </div>
          <div className='mx-8 pb-8'>
            <div className="w-full border border-gray-300 rounded-lg shadow-md bg-white">
              <div className='grid grid-cols-5 w-full justify-items-center items-center text-[.7rem] md:text-xl shadow-md py-4 font-medium'>
                <div>Order ID</div>
                <div>Date</div>
                <div>Status</div>
                <div>Amount</div>
                <div>Details</div>
              </div>
              {orders && orders.orders && orders.orders.length > 0 ? (
                orders.orders.slice(0, visibleAllOrders).map((o) => (
                  <div key={o._id} className='grid grid-cols-5 w-full h-20 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out justify-items-center items-center text-[.7rem] md:text-xl border-b px-4'>
                    <div className="py-2">
                      <span className="hidden md:block">{o._id}</span>
                      <span className="md:hidden">{`${o._id.slice(0, 6)}...`}</span>
                    </div>
                    <div className='py-2'>{new Date(o.createdAt).toLocaleDateString()}</div>
                    <div className={`py-2 rounded-md w-16 md:w-28 text-center ${getStatusColor(o.shippingStatus)}`}>{o.shippingStatus}</div>
                    <div className='py-2 flex justify-center items-center'><FaRupeeSign />{o.totalAmount.toFixed(2)}</div>
                    <div className='flex justify-center ite gap-2 py-2'>
                      <button className='bg-blue-200 flex justify-center items-center  text-blue-600 w-8 h-6 md:w-14 md:h-10  rounded-md hover:bg-blue-300 transition-colors duration-300' onClick={() => detailsHandler(o._id)}><FaEye /></button>
                      <button
                        className={`bg-purple-200 flex justify-center items-center text-purple-600 w-8 h-6 md:w-14 md:h-10 rounded-md hover:bg-purple-300 transition-colors duration-300 ${o.shippingStatus === "Delivered" ? "" : "cursor-not-allowed opacity-50"}`}
                        onClick={() => invoiceHandler(o._id)}
                        disabled={o.shippingStatus !== "Delivered"}
                      >
                        <FaFileInvoice />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className='col-span-4 text-center py-4'>No orders found.</div>
              )}

            </div>
            <div className='mt-5 flex justify-center items-center'>
              {orders && orders.orders && orders?.orders?.length > visibleAllOrders && (
                <button onClick={loadMoreOrders} className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600'>Load More</button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

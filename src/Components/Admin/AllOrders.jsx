import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaFileInvoice, FaRupeeSign, FaEdit } from 'react-icons/fa';
import { LoadAllOrders, UpdateShippingStatus, LoadSingleOrder } from '../../Actions/Order';
import toast from 'react-hot-toast';

export default function AllOrders() {
  const { orders } = useSelector((state) => state.order);
  const [visibleAllOrders, setVisibleAllOrders] = React.useState(6);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedOrderId, setSelectedOrderId] = React.useState(null);
  const [shippingStatus, setShippingStatus] = React.useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(LoadAllOrders());
  }, [dispatch]);

  const detailsHandler = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  const invoiceHandler = (id) => {
    navigate(`/invoice/${id}`);
  };

  const loadMoreOrders = () => {
    setVisibleAllOrders((prev) => prev + 4);
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

  const openModal = (id, currentStatus) => {
    setSelectedOrderId(id);
    setShippingStatus(currentStatus);
    setModalOpen(true);
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setShippingStatus(newStatus);
  };

  const handleStatusUpdate = () => {
    dispatch(UpdateShippingStatus(selectedOrderId, shippingStatus));
    dispatch(LoadSingleOrder(selectedOrderId));
    dispatch(LoadAllOrders());
    toast.success('Status Updated!');
    setModalOpen(false);
  };

  return (
    <>
      <div className='h-full lg:mx-8 pb-8'>
        <div className="w-full border border-gray-300 rounded-lg shadow-md bg-white">
          <div className='grid grid-cols-5 w-full justify-items-center items-center text-[.7rem] md:text-xl shadow-md py-4 font-medium'>
            <div>Order ID</div>
            <div>Date</div>
            <div>Status</div>
            <div>Amount</div>
            <div>Details</div>
          </div>
          {orders?.orders?.length > 0 ? (
            orders.orders.slice(0, visibleAllOrders).map((o) => (
              <div key={o._id} className='grid grid-cols-5 w-full h-20 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out justify-items-center items-center text-[.7rem] lg:text-xl border-b px-4'>
                <div className="py-2 lg:pl-6">
                  <span className="hidden lg:block">{o._id}</span>
                  <span className="lg:hidden">{`${o._id.slice(0, 6)}...`}</span>
                </div>
                <div className='py-2'>{new Date(o.createdAt).toLocaleDateString()}</div>
                <div className={`py-2 rounded-md w-20 lg:w-32 text-center flex items-center justify-center gap-2 ${getStatusColor(o.shippingStatus)}`}>
                  {o.shippingStatus}
                  <button onClick={() => openModal(o._id, o.shippingStatus)} className="text-blue-500 hover:text-black">
                    <FaEdit />
                  </button>
                </div>
                <div className='py-2 flex justify-center items-center'><FaRupeeSign />{o.totalAmount.toFixed(2)}</div>
                <div className='flex justify-center gap-2 py-2'>
                  <button className='bg-blue-200 flex justify-center items-center text-blue-600 w-8 h-6 lg:w-14 lg:h-10 rounded-md hover:bg-blue-300 transition-colors duration-300' onClick={() => detailsHandler(o._id)}><FaEye /></button>
                  <button
                    className={`bg-purple-200 flex justify-center items-center text-purple-600 w-8 h-6 lg:w-14 lg:h-10 rounded-md hover:bg-purple-300 transition-colors duration-300 ${o.shippingStatus === "Delivered" ? "" : "cursor-not-allowed opacity-50"}`}
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
          {orders?.orders?.length > visibleAllOrders && (
            <button onClick={loadMoreOrders} className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600'>Load More</button>
          )}
        </div>
      </div>

      {/* Modal for Updating Shipping Status */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Update Shipping Status</h2>
            <div className="flex flex-col gap-3">
              {["Processing", "Shipped", "Delivered", "Canceled"].map((status) => (
                <label
                  key={status}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer border ${shippingStatus === status ? "bg-blue-100 border-blue-500" : "border-gray-300"} hover:bg-blue-50 transition`}
                >
                  <input
                    type="radio"
                    name="shippingStatus"
                    value={status}
                    checked={shippingStatus === status}
                    onChange={handleStatusChange}
                    className="accent-blue-500"
                  />
                  <span className="text-gray-700">{status}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

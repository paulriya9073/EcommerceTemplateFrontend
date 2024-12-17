import React, { useEffect, useState } from 'react'
import Navbar from '../Layouts/Navbar'
import Footer from '../Layouts/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOrderAdmin, LoadSingleOrder, UpdateShippingStatus } from '../../Actions/Order'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CreateInvoice } from '../../Actions/Invoice'

const ShippingStatus = () => {

  const dispatch = useDispatch()

  const { id } = useParams()

  const { order } = useSelector(state => state.order)

  const [shippingStatus, setShippingStatus] = useState("");

  const navigate = useNavigate()


  useEffect(() => {
    dispatch(LoadSingleOrder(id))
  }, [dispatch, id])

 

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setShippingStatus(newStatus);

    dispatch(UpdateShippingStatus(id, newStatus));
    dispatch(LoadSingleOrder(id))
    toast.success("Status Updated!");

  };

  const handleCreateInvoice=()=>{

    if(order.shippingStatus === "Delivered")
      {
        dispatch(CreateInvoice(id))
        toast.success("Invoice Created!!")
      }
      
  }

  const handleBackClick = () => {
    navigate('/admin/dashboard/orders')
  }

  const deleteHandler = () => {
    dispatch(DeleteOrderAdmin(id))
    toast.success('Order Deleted!')
    navigate('/admin/dashboard/orders')
  }
  return (
    <>
      <Navbar />
      <div className='w-full bg-blue-50 py-8'>


        {/* Order Details */}
        <div className='max-w-96 md:max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-md mb-6'>
          <h1 className='text-2xl font-semibold mb-6 text-gray-700'>View Order Details</h1>
          <div className='flex flex-col md:flex-row justify-evenly gap-4 mb-10'>
            <div>
              <h2 className='text-lg font-medium text-gray-600'>Order Date</h2>
              <p className='text-gray-800'>{new Date(order?.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <h2 className='text-lg font-medium text-gray-600'>Order </h2>
              <p className='text-gray-800'>#ORD-{order?._id}</p>
            </div>
            <div>
              <h2 className='text-lg font-medium text-gray-600'>Order Total</h2>
              <p className='text-gray-800'>₹{order?.totalAmount} ({order?.orderItems?.length} {order?.orderItems?.length == 1 ? "item" : "items"})</p>
            </div>
          </div>


          {/*Payment Details*/}

          <h1 className='text-2xl font-semibold mb-6 text-gray-700'>Payment Details</h1>
          <div className='flex flex-col md:flex-row justify-evenly gap-4'>
          <div>
              <h2 className='text-lg font-medium text-gray-600'>Payment</h2>
              <p className='text-gray-800'>{order?.user?.username}</p>
              <p className='text-gray-800'>phone : +91 {order?.user?.phone}</p>
            </div>
            <div>
              <h2 className='text-lg font-medium text-gray-600'>Payment Date</h2>
              <p className='text-gray-800'>{new Date(order?.paymentInfo?.paidAt).toLocaleDateString()}</p>
            </div>
            <div>
              <h2 className='text-lg font-medium text-gray-600'>Status</h2>
              <p className={`${order?.paymentInfo?.razorpay_payment_id ? "text-green-800 font-semibold" : "text-red-700"}`}>{order?.paymentInfo?.razorpay_payment_id ? "Paid" : "Payment Pendeing"}</p>
            </div>
          </div>
        </div>

        {/* Shipment Details */}
        <div className='max-w-96 md:max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-md mb-6'>
          <h1 className='text-2xl font-semibold mb-2 text-gray-700'>Shipment Details</h1>
          <div className='flex flex-col md:flex-row md:justify-between h-20 mb-4 gap-2'>
            <div className='w-48 flex gap-3 justify-center items-center'>
              <h2 className='text-lg font-medium text-gray-600'>Status :</h2>
              <select
                value={order?.shippingStatus}
                onChange={handleStatusChange}
                className='p-2 border border-gray-300 rounded-md'
              >
                <option value="Processing" >Processing</option>
                <option value="Shipped" >Shipped</option>
                <option value="Delivered">Delivered</option>
                <option className='text-red-600 bg-red-100' value="Canceled">Canceled</option>
              </select>
            </div>
            {order?.shippingStatus === "Delivered" ?
              (
                <div className='w-48 flex gap-3 items-center'>
                  <h2 className='text-lg font-medium text-gray-600'>Date :</h2>
                  <p>{new Date(order?.deliveredAt).toLocaleDateString()}</p>
                </div>
              ) : null}
          </div>
          {order && order?.orderItems?.map((items) => {
            const { product, quantity } = items;
            const { _id, productName, description, price, images } = product;

            
            const imageUrl = images?.length > 0 ? images[0]?.url : 'public\noImg.png';  

            return (
              <div className='grid grid-cols-1 gap-4 mb-8'>
                <div className='flex items-start'>
                  <div className='w-32 h-32 bg-gray-200 rounded-md mr-4'>
                    <img src={imageUrl} alt="Product" className='object-cover w-full h-full rounded-md' />
                  </div>
                  <div>
                    <h2 className='text-lg font-medium text-gray-800'>{productName}</h2>
                    <p className='text-gray-600'>{description}</p>
                    <h1 className='font-medium mb-3'>₹{price}</h1>
                    <h2 className='text-md text-gray-800'>Qty: {quantity}</h2>
                  </div>
                </div>
              </div>
            );
          })}



          {/* Shipping Address */}

          <h1 className='text-2xl font-semibold mb-6 text-gray-700'>Shipping Address</h1>
          <div>
            <h2 className='text-lg font-medium text-gray-800'>{order?.deliveryAddress?.name}</h2>
            <h2 className='text-md font-medium text-gray-700'>Ph: +91 {order?.deliveryAddress?.phone}</h2>
            <p className='text-gray-600 mt-2'>

              {order?.deliveryAddress?.address}
              <br />
              {order?.deliveryAddress?.city} <br />{order?.deliveryAddress?.state} - {order?.deliveryAddress?.pincode}
              <br />
              {order?.deliveryAddress?.country}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className='max-w-96 md:max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-md'>
          <h1 className='text-2xl font-semibold mb-6 text-gray-700'>Order Summary</h1>
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex justify-between'>
              <h2 className='text-lg font-medium text-gray-600'>Total</h2>
              <h2 className='text-lg font-medium text-gray-800'>₹{order?.total}</h2>
            </div>
            <div className='flex justify-between'>
              <h2 className='text-lg font-medium text-gray-600'>Shipping Charge</h2>
              <h2 className='text-lg font-medium text-gray-800'>₹{order?.shippingCharges}</h2>
            </div>
            {/* <div className='flex justify-between'>
              <h2 className='text-lg font-medium text-gray-600'>Discount</h2>
              <h2 className='text-lg font-medium text-gray-800'>₹{order?.discount}</h2>
            </div> */}
          
            <div className='flex justify-between'>
              <h2 className='text-lg font-medium text-gray-600'>Order Total</h2>
              <h2 className='text-lg font-medium text-gray-800'>₹{order?.totalAmount}</h2>
            </div>
          </div>
        </div>

        <div className='max-w-96 md:max-w-4xl mx-auto flex justify-between m-4'>
          <div className='flex justify-center items-center gap-6'>
          <button
            onClick={handleBackClick}
            className='bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition'
          >
            Back
          </button>
          {order && order?.shippingStatus === "Delivered" ? (
            <button
            onClick={handleCreateInvoice}
            className='bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 transition'
          >
            Create Invoice
          </button>
          ) : null}
          </div>
          <button
            // onClick={handleDeleteClick}
            className='bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition'
            onClick={deleteHandler}>
            Delete Order
          </button>
        </div>

      </div>
      <Footer />
    </>

  )
}

export default ShippingStatus
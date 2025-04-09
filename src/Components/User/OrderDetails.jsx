import React, { useEffect } from 'react'
import Navbar from '../Layouts/Navbar'
import Footer from '../Layouts/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { CancelOrder, LoadSingleOrder } from '../../Actions/Order'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CreateInvoice } from '../../Actions/Invoice'

const OrderDetails = () => {

  const dispatch=useDispatch()

  const {id}=useParams()

  const {order}=useSelector(state=>state.order)

  const navigate=useNavigate()

  useEffect(()=>{
    dispatch(LoadSingleOrder(id))
  },[])

  const handleBack=()=>{
    navigate('/account/dashboard')
  }

  const invoiceHandler = () => {
      
      navigate(`/invoice/${id}`);
    
  };
  

  const cancelHandler=()=>{

    if(order && order?.shippingStatus === "Shipped")
    {
      toast.error("Order is already Shipped !!")
    }
    else{
      dispatch(CancelOrder(id))
      toast.success("Order Canceled!!")
      navigate('/account/dashboard')
    }
    
  }

    
  return (
    <>
      <Navbar />
      <div className='w-full bg-blue-50 py-8'>
        {/* Order Details */}
        <div className='max-w-96 md:max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-md mb-6'>
          <h1 className='text-2xl font-semibold mb-6 text-gray-700'>View Order Details</h1>
          <div className='flex justify-evenly items-center gap-4 pb-4'>
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
              <p className='text-gray-800'>₹{order?.totalAmount} ({order?.orderItems?.length} {order?.orderItems?.length==1 ? "item":"items"})</p>
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
          <div className='flex h-12 mb-4 w-40 justify-between items-center'>
              <h2 className='text-lg font-medium text-gray-600'>Status :</h2>
              <p className='text-gray-800 text-lg font-medium'>{order?.shippingStatus}</p>
            </div>
          {
            order && order?.orderItems?.map((items)=>{
              const { product, quantity } = items;
              const { _id, productName,description, price, images} = product;
              
                  return (
            <div className='grid grid-cols-1 gap-4 mb-4'>
            <div className='flex items-start'>
              <div className='w-32 h-32 bg-gray-200 rounded-md mr-4'>
                <img src={images[0]?.url} alt="Product" className='object-cover w-full h-full rounded-md' />
              </div>
              <div>
                <h2 className='text-lg font-medium text-gray-800'>{productName}</h2>
                <p className='text-gray-600'>{description}</p>
                <h1  className='font-medium mb-3'>₹{price}</h1>
                <h2 className='text-md text-gray-800'>Qty: {quantity}</h2>
              </div>
            </div>
          </div>
                  )
            })
          }
  

        {/* Shipping Address */}
       
          <h1 className='text-2xl font-semibold mb-6 text-gray-700'>Shipping Address</h1>
          <div>
            <h2 className='text-lg font-medium text-gray-800'>{order?.deliveryAddress?.name}</h2>
            <h2 className='text-md font-medium text-gray-700'>Ph: +91 {order?.deliveryAddress?.phone}</h2>
            <p className='text-gray-600 mt-2'>
              
              {order?.deliveryAddress?.address}
              <br />
              {order?.deliveryAddress?.city} - {order?.deliveryAddress?.pincode} <br />{order?.deliveryAddress?.state} 
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
              <h2 className='text-lg font-medium text-gray-600'>Total (IGST Inc)</h2>
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
        <div className="flex justify-center items-center mt-4">
  {order?.shippingStatus === "Canceled" || order?.shippingStatus==="Shipped" ? (
    // Show only the "Back" button if the order is canceled
    <button
      onClick={handleBack}
      className="bg-blue-500 text-white px-4 py-2 w-44 rounded-md shadow-md hover:bg-blue-600 transition"
    >
      Back
    </button>
  ) : order?.shippingStatus === "Delivered" ? (
    // Show both "Back" and "Download Invoice" buttons if the order is delivered
    <>
      <button
        onClick={handleBack}
        className="bg-blue-300 text-blue-800 px-4 py-2 w-44 rounded-md shadow-md hover:bg-blue-400 transition"
      >
        Back
      </button>
      <button
        onClick={invoiceHandler}
        className="m-4 bg-purple-300 text-purple-800 px-4 py-2 w-44 rounded-md shadow-md hover:bg-purple-400 transition duration-200"
      >
        Invoice
      </button>
    </>
  ) : (
    // Show both "Back" and "Cancel Order" buttons for other statuses
    <>
      <button
        onClick={handleBack}
        className="bg-blue-300 text-blue-800 px-4 py-2 w-44 rounded-md shadow-md hover:bg-blue-400 transition"
      >
        Back
      </button>
      <button
        onClick={cancelHandler}
        className="m-4 bg-red-300 text-red-800 px-4 py-2 w-44 rounded-md shadow-md hover:bg-red-400 transition duration-200"
      >
        Cancel Order
      </button>
    </>
  )}
</div>

      </div>
      <Footer />
    </>
  )
}

export default OrderDetails

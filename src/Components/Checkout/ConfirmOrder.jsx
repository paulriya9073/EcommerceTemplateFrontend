import React, { useEffect, useState } from 'react'
import Navbar from '../Layouts/Navbar'
import Footer from '../Layouts/Footer'
import CheckOutSteps from './CheckOutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { loadSingleAddresses } from '../../Actions/Address'
import { Link, useNavigate } from 'react-router-dom'
import Rating from '@mui/material/Rating'
import { LoadSingleProduct } from '../../Actions/Product'
import axios from 'axios'
import Shipping from './Shipping'
import toast from 'react-hot-toast'
import { deleteCart } from '../../Actions/Cart'
import { FaRupeeSign } from 'react-icons/fa'

const ConfirmOrder = () => {
  const { shippingAddress } = useSelector((state) => state.order)
  const { singleProduct, quantity } = useSelector((state) => state.order)
  const { address } = useSelector((state) => state.address)
  const { product } = useSelector((state) => state.product)
  const { user } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productId = singleProduct?.singleProduct
  const productQuantity = singleProduct?.quantity
  const addressId = shippingAddress?.shippingAddress

  const [quantities, setQuantities] = useState([])

  const productPrice = product?.price

  // Gross Total calculation
  const grossTotal = productId
    ? productPrice * productQuantity
    : user?.cart?.reduce((acc, item, index) => {
      const amount = item.product.price
      return acc + amount * quantities[index]
    }, 0)

  useEffect(() => {
    if (addressId) {
      dispatch(loadSingleAddresses(addressId))
    }
    if (productId) {
      dispatch(LoadSingleProduct(productId))
    }
  }, [dispatch, addressId, productId])

  useEffect(() => {
    if (user?.cart) {
      setQuantities(user.cart.map((item) => item.quantity))
    }
  }, [user])


  const shippingCharge = grossTotal < 1000 ? 50 : 0
  const totalAmount = grossTotal + shippingCharge

  let orderItems = []
  if (productId) {
    orderItems = [{ product: productId, quantity: productQuantity }]
  } else {
    orderItems = user?.cart?.map((cartItem) => ({
      product: cartItem.product._id,
      quantity: cartItem.quantity
    }))
  }

  const paymentHandler = async () => {
    try {
      const res = await axios.post('/api/v1/payment/amount', { amount: totalAmount })
      const data = res.data
      handlePaymentVerify(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePaymentVerify = (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: 'RiRi Jewels',
      order_id: data.id,
      handler: async (response) => {
        try {
          const res = await axios.post(`/api/v1/payment/verify/${address?._id}`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderItems,
            total: grossTotal,
            shippingCharges: shippingCharge,
            discount: 0,
            totalAmount,
            shippingStatus: 'Processing',
            user: user._id
          })

          const verifyData = res.data
          if (verifyData.message) {
            toast.success(verifyData.message)
            dispatch(deleteCart())
            navigate('/account/myorders')
          }
        } catch (error) {
          console.error(error)
          toast.error('Payment verification failed. Please try again.')
        }
      },
      theme: {
        color: '#5f63b8'
      }
    }

    const rzp1 = new window.Razorpay(options)
    rzp1.open()
  }

  return (
    <>
      <Navbar />
      <div className='w-full h-full bg-blue-50'>
        <div id='progress' className='w-full md:h-32 flex justify-center items-center py-6'>
          <CheckOutSteps activeStep={1} />
        </div>

        <div id='confirmOrder' className='flex flex-col h-full w-full bg-white'>
          <div className='w-full h-full flex flex-col pt-4 px-4'>
            <h1 className='text-xl md:text-2xl p-1'>Shipping Details</h1>
            <div className='h-auto bg-white flex flex-col p-4'>
              <div className='flex flex-col md:gap-2 p-2'>
                <div className='flex justify-between'>
                  <div>
                    <h1 className='text-[1.1rem] md:text-xl font-medium'>{address?.name}</h1>
                    <h1 className='text-[1.1rem] md:text-xl font-medium'>{address?.phone}</h1>
                  </div>
                  {address ? (
                    <Link to='/checkout/shipping' className='w-16 h-14 md:w-24 md:text-xl bg-blue-600 text-white rounded-md flex justify-center items-center'>
                      Change
                    </Link>
                  ) : (
                    <Link to='/checkout/shipping' className='w-16 h-14 md:w-24 md:text-xl bg-blue-600 text-white rounded-md flex justify-center items-center'>
                      Select
                    </Link>
                  )}
                </div>
                <p className='text-[1rem] md:text-xl'>{address?.address}
                  <br />
                  {address?.city}
                  <br />
                  {address?.state}-{address?.pincode}
                  <br />
                  {address?.country}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full h-auto bg-white flex flex-col px-4'>
          <h1 className='text-xl md:text-2xl p-1'>Order Details</h1>
          <div className='container mx-auto p-4'>
            {productId ? (
              <>
                <div key={product._id} className='mb-6 border-b pb-6 flex flex-col md:flex-row items-center'>
                  <Link to={`/product/${product._id}`} className='flex-shrink-0 w-full md:w-1/3 mb-4 md:mb-0 flex justify-center'>
                    <img className='w-48 h-48 object-contain' src={product.images[0]?.url} />
                  </Link>
                  <div className='flex-grow w-full md:w-2/3 px-4'>
                    <div className='flex justify-between'>
                      <Link to={`/product/${product._id}`}><h1 className='text-lg md:text-xl font-semibold mb-2'>{product.productName}</h1></Link>
                    </div>
                    <div className='flex items-center mb-2'>
                      <Rating value={product.ratings} precision={0.5} readOnly />
                      <span className='ml-2'>{product.ratings}</span>
                    </div>
                    <p className='mb-2 text-gray-600'>
                      {product.numOfReviews} Review{product.numOfReviews > 1 ? 's' : ''}
                    </p>
                    <div className='flex justify-start items-center text-xl font-bold mb-2'>
                      <FaRupeeSign />{productPrice}
                    </div>
                    <div className='flex items-center mb-2'>
                      <h1 className='text-xl'>Quantity : {productQuantity}</h1>
                    </div>
                  </div>
                </div>
                <div className='w-full h-56 md:h-64 bg-[#F0F5FF] flex-col justify-center items-center shadow-xl border-2 rounded-lg'>
                  <div className='w-full flex flex-col gap-1 md:gap-4 text-xl md:text-3xl py-8'>
                    <div className='w-full h-6 flex justify-between items-center'>
                      <h1 className='mx-8'>
                        Total (1 item)
                      </h1>
                      <p className='mx-8'> ₹ {grossTotal}</p>
                    </div>
                    <div className='w-full h-6 flex justify-between items-center'>
                      <h1 className='mx-8'>Shipping</h1>
                      <p className='mx-8'> ₹ {shippingCharge}</p>
                    </div>
                    <div className='w-full h-6 flex justify-between items-center'>
                      <h1 className='mx-8'>Total Amount (IGST Inc)</h1>
                      <p className='mx-8'> ₹ {totalAmount}</p>
                    </div>
                  </div>
                  <div className='flex justify-center items-center w-full p-2'>
                    <button onClick={paymentHandler} className='h-10 md:h-14 rounded-md w-44 text-xl md:text-3xl md:w-56 justify-items-center bg-blue-600 text-white font-semibold shadow-xl hover:bg-blue-700'>Place Order</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {user?.cart?.map((cartItem) => {
                  const { product, quantity } = cartItem;
                  const { _id, productName, price, images, ratings, numOfReviews } = product;

                  return (
                    <div key={cartItem._id} className='mb-6 border-b pb-6 flex flex-col md:flex-row items-center'>
                      <Link to={`/product/${_id}`} className='flex-shrink-0 w-full md:w-1/3 mb-4 md:mb-0 flex justify-center'>
                        <img className='w-48 h-48 object-contain' src={images[0]?.url} />
                      </Link>
                      <div className='flex-grow w-full md:w-2/3 px-4'>
                        <div className='flex justify-between'>
                          <Link to={`/product/${_id}`}><h1 className='text-lg md:text-xl font-semibold mb-2'>{productName}</h1></Link>
                        </div>
                        <div className='flex items-center mb-2'>
                          <Rating value={ratings || 0} precision={0.5} readOnly />
                          <span className='ml-2'>{ratings}</span>
                        </div>
                        <p className='mb-2 text-gray-600'>{numOfReviews} Review{numOfReviews > 1 ? 's' : ''}</p>
                        <div className='flex justify-start items-center text-xl font-bold mb-2'>
                          <FaRupeeSign /> {price}
                        </div>
                        <div className='flex items-center mb-2'>
                          <h1 className='text-xl'>Quantity : {quantity}</h1>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div className='w-full h-56 md:h-64 bg-[#F0F5FF] flex-col justify-center items-center shadow-xl border-2 rounded-lg'>
                  <div className='w-full flex flex-col gap-1 md:gap-4 text-xl md:text-3xl py-8'>
                    <div className='w-full h-6 flex justify-between items-center'>
                      <h1 className='mx-8'>
                        Total ({user?.cart?.length} items)
                      </h1>
                      <p className='mx-8'> ₹ {grossTotal}</p>
                    </div>
                    <div className='w-full h-6 flex justify-between items-center'>
                      <h1 className='mx-8'>Shipping</h1>
                      <p className='mx-8'> ₹ {shippingCharge}</p>
                    </div>
                    <div className='w-full h-6 flex justify-between items-center'>
                      <h1 className='mx-8'>Total Amount (IGST Inc)</h1>
                      <p className='mx-8'> ₹ {totalAmount}</p>
                    </div>
                  </div>
                  <div className='flex justify-center items-center w-full p-2'>
                    <button onClick={paymentHandler} className='h-10 md:h-14 rounded-md w-44 text-xl md:text-3xl md:w-56 justify-items-center bg-blue-600 text-white font-semibold shadow-xl hover:bg-blue-700'>
                      Place Order
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ConfirmOrder

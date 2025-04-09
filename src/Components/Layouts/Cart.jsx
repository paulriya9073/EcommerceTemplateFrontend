import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../Actions/Cart';
import { Link, useNavigate } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { loadUser } from '../../Actions/User';

const Cart = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState([]);

  const navigate = useNavigate();

  // Load user data
  useEffect(() => {
    dispatch(loadUser());
    dispatch({ type: 'clearErrors' });
  }, [dispatch]);

  // Update quantities from the cart
  useEffect(() => {
    if (user?.cart) {
      setQuantities(user.cart.map((item) => item.quantity));
    }
  }, [user?.cart]);

  const increaseQuantity = (index, stock) => {
    if (quantities[index] >= stock) return;

    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const decreaseQuantity = (index) => {
    if (quantities[index] <= 1) return;

    const newQuantities = [...quantities];
    newQuantities[index] -= 1;
    setQuantities(newQuantities);
  };

  // Calculate total price
  const totalPrice = user?.cart?.reduce((acc, item, index) => {
    return acc + item.product.price * quantities[index];
  }, 0);
  
  const shippingCharge = totalPrice < 1000 ? 50 : 0;

  const totalAmount = totalPrice + shippingCharge || 0;

  

  

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Removed from cart!');
  };

  const checkoutHandler = () => {
    user?.cart?.forEach((cartItem, index) => {
      dispatch(addToCart(cartItem.product._id, quantities[index]));
    });
    navigate('/checkout/shipping', { state: { fromCart: true } });
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-full mx-auto">
        {user ? (
          <>
            {user?.cart?.length === 0 ? (
              <div className="h-full w-full flex justify-center">
                <img src="empty-cart.png" alt="Empty Cart" />
              </div>
            ) : (
              <div className='w-full h-full'>
                {user?.cart?.map((cartItem, index) => {
                  const { product } = cartItem;
                  const { _id, productName, price, images, stock, ratings, numOfReviews } = product;

                  const options = {
                    value: ratings || 0,
                    readOnly: true,
                    precision: 0.5,
                  };

                  return (
                    <div
                      key={cartItem._id}
                      className="my-6 border-b pb-6 flex flex-col md:flex-row items-center"
                    >
                      <Link
                        to={`/product/${_id}`}
                        className="flex-shrink-0 w-full md:w-56 p-4 flex justify-center"
                      >
                        <img
                          className="w-full object-contain"
                          src={images[0]?.url}
                          alt={productName}
                        />
                      </Link>
                      <div className="flex-grow w-full md:w-2/3 px-4">
                        <div className="flex justify-between">
                          <Link to={`/product/${_id}`}>
                            <h1 className="text-lg md:text-xl font-semibold mb-2">{productName}</h1>
                          </Link>
                          <button
                            className="w-20 md:w-24 h-8 md:h-10 bg-gray-300 hover:bg-gray-400 md:text-xl rounded-md"
                            onClick={() => removeFromCartHandler(_id)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="flex items-center mb-2">
                          <Rating {...options} />
                          <span className="ml-2">{ratings}</span>
                        </div>
                        <p className="mb-2 text-gray-600">
                          {numOfReviews} Review{numOfReviews > 1 ? 's' : ''}
                        </p>
                        <h2 className="text-xl font-bold mb-2">
                          <div className="flex items-center">
                            <FaRupeeSign className="text-2xl p-1" />
                            {price}
                          </div>
                        </h2>
                        <div className="flex items-center mb-2">
                          {stock === 0 ? null : (
                            <>
                              <button
                                className="w-8 h-8 bg-gray-300 rounded-md text-xl font-bold flex justify-center items-center mr-2"
                                onClick={() => decreaseQuantity(index)}
                              >
                                -
                              </button>
                              <input
                                className="border-2 w-16 text-center"
                                readOnly
                                type="number"
                                value={quantities[index]}
                              />
                              <button
                                className="w-8 h-8 bg-gray-300 rounded-md text-xl font-bold flex justify-center items-center ml-2"
                                onClick={() => increaseQuantity(index, stock)}
                              >
                                +
                              </button>
                            </>
                          )}
                        </div>
                        <p
                          className={`text-lg font-bold ${
                            stock === 0 ? 'text-red-600' : 'text-green-800'
                          }`}
                        >
                          {stock === 0 ? 'Out Of Stock' : 'In Stock'}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div className="w-full h-56 md:h-64 bg-[#F0F5FF] flex-col justify-center items-center shadow-xl border-2 rounded-lg">
                  <div className="w-full flex flex-col gap-1 md:gap-5 text-xl md:text-3xl py-8">
                    <div className="w-full h-6 flex justify-between items-center">
                      <h1 className="mx-8">
                        Total (
                        {user?.cart?.length === 1
                          ? `${user?.cart?.length} item`
                          : `${user?.cart?.length} items`}
                        )
                      </h1>
                      <p className="mx-8"> ₹ {totalPrice}</p>
                    </div>
                    <div className="w-full h-6 flex justify-between items-center">
                      <h1 className="mx-8">Shipping</h1>
                      <p className="mx-8">₹ {shippingCharge}</p>
                    </div>
                    <div className="w-full h-6 flex justify-between items-center">
                      <h1 className="mx-8">Total Amount (GST Inc)</h1>
                      <p className="mx-8">₹ {totalAmount}</p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-full p-2">
                    <button
                      onClick={checkoutHandler}
                      className="h-10 md:h-14 rounded-md w-44 text-xl md:text-3xl md:w-56 justify-items-center border-2 shadow-md shadow-slate-500 bg-white"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="h-full w-full flex flex-col justify-center items-center">
            <h1 className="text-xl md:text-3xl p-2">Login first to access your cart</h1>
            <img className="w-full" src="cart.png" alt="Cart" />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { LoadSingleProduct } from '../../Actions/Product';
import Rating from "@mui/material/Rating";
import CreateReview from '../User/CreateReview';
import { deleteReview, LoadAllReviewsOfProduct } from '../../Actions/Review';
import { addToCart } from '../../Actions/Cart';
import { GetSingleOrderPlaced } from '../../Actions/Order';
import { FaRupeeSign } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product } = useSelector((state) => state.product);
  const { user,isAuthenticated } = useSelector((state) => state.user);

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [numOfReviews, setNumOfReviews] = useState(0);
  const [images, setImages] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    dispatch(LoadSingleProduct(id));
    
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setProductName(product.productName);
      setDescription(product.description);
      setStock(product.stock);
      setPrice(product.price);
      setRatings(product.ratings);
      setNumOfReviews(product.numOfReviews);
      setImages(product.images[0].url);
    }
  }, [product]);

  const options = {
    size: "large",
    value: ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const cartHandler = () => {
  
    if (isAuthenticated) {
      dispatch(addToCart(id, quantity));
      toast.success("Added to the Cart!!");
    } else {
      toast.error("Log In First!");
      dispatch({ type: "clearErrors" });
    }
  };

  const reviewHandler = () => {
    if(isAuthenticated)
    {
      setShowReviewForm(true);
      dispatch(LoadSingleProduct(id));
    }
    else {
      toast.error("Log In First!");
      dispatch({ type: "clearErrors" });
    }
    
  };

  const closeReviewForm = () => {
    setShowReviewForm(false);
  };

  const reviewDeleteHandler = (revId) => {
    dispatch(deleteReview(revId));
    toast.success("Review Deleted!!")
    dispatch(LoadSingleProduct(id));
  };

  const placeOrderHandler = () => {
    dispatch(GetSingleOrderPlaced(id, quantity));
    if (user) {
      navigate('/checkout/shipping');
    } else {
      toast.error("Log In First!!")
      navigate('/login');
    }
  };

  return (
    <>
      {!showReviewForm ? (
        <>
          <Navbar />
          <div id="mainCointainer" className="h-full">
            <div id="productDetails" className="md:grid md:grid-cols-12 w-full h-full md:h-[70vh] flex flex-col md:justify-center items-center gap-1">
              <div className="md:col-span-1"></div>
              <div className="md:col-span-4 justify-center items-center md:h-[60vh] w-full">
                <img className="h-full w-full" src={images} alt="product" />
              </div>
              <div className="md:col-span-1"></div>
              <div className="md:col-span-5 md:h-[60vh] w-full p-4">
                <h1 className="text-2xl p-2 md:p-3">{productName}</h1>
                <p className="text-xl p-2 md:p-3">{description}</p>
                <div className="flex flex-row p-2 md:p-3">
                  <Rating {...options} />
                  <span className="p-1">({numOfReviews} Reviews)</span>
                </div>
                <div className="flex justify-start items-center text-3xl p-2 md:p-3">
                  <FaRupeeSign/>
                  {price}
                </div>
                <div className="flex p-2 md:p-3">
                  {stock === 0 ? null : (
                    <>
                      <button className="w-8 h-8 bg-[#dddfe2] rounded-md text-2xl font-bold text-center mr-2" onClick={decreaseQuantity}>-</button>
                      <input className="border-2 h-8 w-12 text-center p-1" readOnly type="number" value={quantity} />
                      <button className="w-8 h-8 bg-[#dddfe2] rounded-md text-2xl font-bold items-center ml-2" onClick={increaseQuantity}>+</button>
                    </>
                  )}
                </div>
                <div>
                  <p className="p-2 md:p-3 text-xl">
                    Status:{" "}
                    <b className={stock === 0 ? "text-red-600 pl-1" : "text-green-800 pl-1"}>
                      {stock === 0 ? "Out Of Stock" : "In Stock"}
                    </b>
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 justify-center items-center p-2 md:p-3">
                  <button 
                  onClick={cartHandler} 
              
                  className={`w-96 md:w-64 h-16 md:h-14 bg-[#dddfe2] hover:bg-gray-300 rounded-full md:rounded-md text-xl ` }>
                    Add To Cart</button>
                  <button onClick={placeOrderHandler} 
                 
                  className={`w-96 md:w-64 h-16 md:h-14 bg-[#dddfe2] hover:bg-gray-300 rounded-full md:rounded-md text-xl ` }>
                    Place Order</button>
                </div>
              </div>
              <div className="md:col-span-1"></div>
            </div>
            <hr className="border-slate-950" />
            <div id="reviewDetails" className="w-full h-[100vh]">
              <h1 className="text-2xl md:text-3xl text-center p-4">Reviews</h1>
              <div className="flex flex-col justify-center items-center gap-4">
                <button className={`h-16 w-64 bg-[#dddfe2] hover:bg-gray-300 text-xl md:rounded-md rounded-full `} onClick={reviewHandler}
               
                >Create or Edit Review</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                {product?.reviews?.length === 0 ? (
                 <>
                  <div className='col-span-3 justify-center w-full text-center text-2xl '>No Reviews Found</div>
                 </>
                ) : (
                  product?.reviews?.map((rev) => (
                    <div className="w-full md:w-96 h-auto p-4 bg-blue-50 border-2 rounded-md flex flex-col gap-2 shadow-xl" key={rev._id}>
                      <div className="flex justify-between">
                        <h1 className="text-2xl">{rev.userName}</h1>
                        {user && user._id === rev.user && (
                          <button onClick={() => reviewDeleteHandler(rev._id)} className=' bg-red-100 text-red-500 hover:bg-red-300 transition-colors duration-300 rounded-md w-10'>
                            <i className="ri-delete-bin-line text-xl md:text-2xl"></i>
                          </button>
                        )}
                      </div>
                      <p className="text-xl">{rev.comment}</p>
                      <Rating value={rev.rating} readOnly size="large" precision={0.5} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <CreateReview closeReviewForm={closeReviewForm} />
      )}
    </>
  );
};

export default ProductDetails;

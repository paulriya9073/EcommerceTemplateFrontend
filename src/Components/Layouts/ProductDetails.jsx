import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { LoadSingleProduct } from '../../Actions/Product';
import Rating from "@mui/material/Rating";
import { deleteReview, createEditReview } from '../../Actions/Review';
import { addToCart } from '../../Actions/Cart';
import { GetSingleOrderPlaced } from '../../Actions/Order';
import { FaRupeeSign } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product } = useSelector((state) => state.product);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [numOfReviews, setNumOfReviews] = useState(0);
  const [images, setImages] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  
  // For the review form
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

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
      setImages(product.images && product.images.length > 0 ? product.images[0].url : '');
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
    if (isAuthenticated) {
      setShowReviewModal(true);
    } else {
      toast.error("Log In First!");
      dispatch({ type: "clearErrors" });
    }
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    setComment("");
    setRating(0);
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(createEditReview(id, comment, rating));
    toast.success("Review Created or Edited");
    closeReviewModal();
    // Refresh product data to show the new review
    setTimeout(() => {
      dispatch(LoadSingleProduct(id));
    }, 300);
  };

  const reviewDeleteHandler = (revId) => {
    dispatch(deleteReview(revId));
    toast.success("Review Deleted!!");
    setTimeout(() => {
      dispatch(LoadSingleProduct(id));
    }, 300);
  };

  const placeOrderHandler = () => {
    dispatch(GetSingleOrderPlaced(id, quantity));
    if (user) {
      navigate('/checkout/shipping');
    } else {
      toast.error("Log In First!!");
      navigate('/login');
    }
  };

  return (
    <>
      <Navbar />
      <div id="mainContainer" className="h-full">
        <div id="productDetails" className="lg:grid lg:grid-cols-12 w-full h-full lg:h-[70vh] flex flex-col lg:justify-center items-center gap-1">
          <div className="lg:col-span-1"></div>
          <div className="lg:col-span-4 justify-center items-center lg:h-[60vh] w-full">
            <img className="h-full w-full" src={images} alt="product" />
          </div>
          <div className="lg:col-span-1"></div>
          <div className="lg:col-span-5 lg:h-[60vh] w-full p-4">
            <h1 className="text-2xl p-2 lg:p-3">{productName}</h1>
            <p className="text-xl p-2 lg:p-3">{description}</p>
            <div className="flex flex-row p-2 lg:p-3">
              <Rating {...options} />
              <span className="p-1">({numOfReviews} Reviews)</span>
            </div>
            <div className="flex justify-start items-center text-3xl p-2 lg:p-3">
              <FaRupeeSign />
              {price}
            </div>
            <div className="flex p-2 lg:p-3">
              {stock === 0 ? null : (
                <>
                  <button className="w-8 h-8 bg-[#dddfe2] rounded-md text-2xl font-bold text-center mr-2" onClick={decreaseQuantity}>-</button>
                  <input className="border-2 h-8 w-12 text-center p-1" readOnly type="number" value={quantity} />
                  <button className="w-8 h-8 bg-[#dddfe2] rounded-md text-2xl font-bold items-center ml-2" onClick={increaseQuantity}>+</button>
                </>
              )}
            </div>
            <div>
              <p className="p-2 lg:p-3 text-xl">
                Status:{" "}
                <b className={stock === 0 ? "text-red-600 pl-1" : "text-green-800 pl-1"}>
                  {stock === 0 ? "Out Of Stock" : "In Stock"}
                </b>
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 justify-center items-center p-2 lg:p-3">
              <button
                onClick={cartHandler}
                className={`w-96 lg:w-64 h-16 lg:h-14 bg-[#dddfe2] hover:bg-gray-300 rounded-full lg:rounded-md text-xl`}>
                Add To Cart
              </button>
              <button
                onClick={placeOrderHandler}
                className={`w-96 lg:w-64 h-16 lg:h-14 bg-[#dddfe2] hover:bg-gray-300 rounded-full lg:rounded-md text-xl`}>
                Place Order
              </button>
            </div>
          </div>
          <div className="lg:col-span-1"></div>
        </div>
        <hr className="border-slate-950" />
        <div id="reviewDetails" className="w-full min-h-[50vh] pb-8">
          <h1 className="text-2xl lg:text-3xl text-center p-4">Reviews</h1>
          <div className="flex flex-col justify-center items-center gap-4">
            <button
              className={`h-16 w-64 bg-[#dddfe2] hover:bg-gray-300 text-xl lg:rounded-md rounded-full`}
              onClick={reviewHandler}>
              Create or Edit Review
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
            {product?.reviews?.length === 0 ? (
              <>
                <div className='col-span-3 justify-center w-full text-center text-2xl'>No Reviews Found</div>
              </>
            ) : (
              product?.reviews?.map((rev) => (
                <div className="w-full lg:w-96 h-auto p-4 bg-blue-50 border-2 rounded-md flex flex-col gap-2 shadow-xl" key={rev._id}>
                  <div className="flex justify-between">
                    <h1 className="text-2xl">{rev.userName}</h1>
                    {user && user._id === rev.user && (
                      <button onClick={() => reviewDeleteHandler(rev._id)} className='bg-red-100 text-red-500 hover:bg-red-300 transition-colors duration-300 rounded-md w-10'>
                        <i className="ri-delete-bin-line text-xl lg:text-2xl"></i>
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

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-80 md:w-96 max-w-md shadow-xl border-2 animate-fadeIn">
            <h1 className="text-2xl font-semibold text-center mb-4">
              Create or Edit Review
            </h1>
            <form className="flex flex-col gap-4" onSubmit={submitReviewHandler}>
              <textarea
                className="p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full resize-none"
                rows="5"
                placeholder="Write Your Review"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <div className="flex flex-col gap-2">
                <label htmlFor="rating" className="text-sm text-gray-600">Rating (1-5)</label>
                <Rating
                  name="rating"
                  value={parseInt(rating)}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  precision={0.5}
                  size="large"
                />
              </div>
              <div className="flex justify-center items-center gap-4 mt-2">
                <button
                  className="w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-all"
                  onClick={closeReviewModal}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProductDetails;
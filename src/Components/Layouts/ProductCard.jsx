import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Actions/Cart";
import toast from "react-hot-toast";
import { FaRupeeSign } from "react-icons/fa";
import { loadUser } from "../../Actions/User";

const ProductCard = ({ id, images, productName, numOfReviews, price, ratings }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
    dispatch({ type: "clearErrors" });
  }, [dispatch]);

  const cartHandler = (id) => {
    if (isAuthenticated) {
      dispatch(addToCart(id, 1));
      toast.success("Added to the Cart!!");
    } else {
      toast.error("Log In First!");
    }
  };

  const options = {
    value: ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="w-full max-w-xs bg-white shadow-xl border-2 rounded-lg flex flex-col justify-center items-center p-3 sm:p-4">
      {user?.role === "admin" ? (
        <div className="flex-grow flex flex-col justify-center items-center w-full">
          <img
            className="w-full h-36 xs:h-40 sm:h-44 md:h-52 object-contain mb-2 sm:mb-3 cursor-not-allowed"
            src={images}
            alt={productName}
          />
          <p className="text-xs sm:text-sm md:text-base font-medium text-center line-clamp-2">{productName}</p>
          <div className="flex flex-col items-center gap-1 mt-1 sm:mt-2">
            <div className="flex items-center gap-1">
              <Rating size="small" {...options} />
              <span className="text-xs sm:text-sm md:text-base">{ratings.toFixed(1)}</span>
            </div>
            <span className="text-xxs xs:text-xs md:text-sm text-gray-500">
              {numOfReviews} Reviews
            </span>
          </div>
          <span className="text-base sm:text-lg font-semibold text-gray-700 mt-1 sm:mt-2">
            <div className="flex justify-center items-center">
              <FaRupeeSign className="text-sm sm:text-base" />
              {price}
            </div>
          </span>
        </div>
      ) : (
        <Link className="flex-grow flex flex-col items-center w-full" to={`/product/${id}`}>
          <img
            className="w-full h-36 xs:h-40 sm:h-44 md:h-52 object-contain mb-2 sm:mb-3 transform transition-transform duration-300 hover:scale-105"
            src={images}
            alt={productName}
          />
          <p className="text-xs sm:text-sm md:text-base font-medium text-center line-clamp-2">{productName}</p>
          <div className="flex flex-col items-center gap-1 mt-1 sm:mt-2">
            <div className="flex items-center gap-1">
              <Rating size="small" {...options} />
              <span className="text-xs sm:text-sm md:text-base">{ratings.toFixed(1)}</span>
            </div>
            <span className="text-xxs xs:text-xs md:text-sm text-gray-500">
              {numOfReviews} Reviews
            </span>
          </div>
          <span className="text-base sm:text-lg font-semibold text-gray-700 mt-1 sm:mt-2">
            <div className="flex justify-center items-center">
              <FaRupeeSign className="text-sm sm:text-base" />
              {price}
            </div>
          </span>
        </Link>
      )}
      <button
        onClick={() => cartHandler(id)}
        disabled={user?.role === "admin"}
        className={`w-full py-1.5 sm:py-2 text-xs sm:text-sm md:text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 mt-2 sm:mt-4 ${
          user?.role === "admin" ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
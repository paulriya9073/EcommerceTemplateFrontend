import React, { useEffect, useState } from "react";
import logo from "/logo.png";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createEditReview } from "../../Actions/Review";
import { LoadSingleProduct } from "../../Actions/Product";
import toast from "react-hot-toast";

const CreateReview = ({ closeReviewForm }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState();

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadSingleProduct(id));
  }, [dispatch, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createEditReview(id, comment, rating));
    toast.success("Review Created or Edited")
    closeReviewForm();
  };

 

  return (
    <div id="main" className="flex flex-col justify-center h-screen bg-blue-50">
      <div id="logo" className="flex justify-center mb-6">
        <Link to="/">
          <img className="w-36 h-20 md:w-48 md:h-28" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="flex justify-center items-center">
        <form
          className="bg-white shadow-xl border-2 rounded-lg p-8 w-80 md:w-96 space-y-6"
          onSubmit={submitHandler}
        >
          <h1 className="text-2xl font-semibold text-center">
            Create or Edit Review
          </h1>

          <div className="flex flex-col gap-4">
            <textarea
              className="p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full resize-none"
              rows="5"
              placeholder="Write Your Review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <input
              className="p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
              type="number"
              placeholder="Give Rating Out of 5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              required
            />

            <div className="flex justify-center items-center gap-4">
              <button
                className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
                type="submit"
              >
                Submit
              </button>
              <button
                className="w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-all"
                onClick={closeReviewForm}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReview;

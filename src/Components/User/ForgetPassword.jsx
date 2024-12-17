import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgetPassword } from "../../Actions/User";
import logo from "/logo.png";
import { LoadAdminImages } from "../../Actions/AdminImg";

const ForgetPassword = () => {
  const {adminImages}=useSelector((status)=>status.adminImg)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  useEffect(()=>{
    dispatch(LoadAdminImages())
  },[dispatch])

  const cancelHandler = () => {
    navigate("/");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgetPassword(email));
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-50">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div id="logo" className="flex justify-center mb-6">
        <Link to="/"><img className='w-36 h-20 md:w-48 md:h-28 ' src={adminImages[0]?.logoImg?.url} /></Link>
      </div>
        {/* Form Section */}
        <form
          className="bg-white shadow-xl border rounded-lg p-8 space-y-6"
          onSubmit={submitHandler}
        >
          <h1 className="text-2xl font-semibold text-center">Forgot Password</h1>
          <div className="flex flex-col gap-4">
            <input
              className="p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
              type="email"
              placeholder="Enter Your Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-between items-center gap-4">
              <button
                className="w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-all"
                onClick={cancelHandler}
                type="button"
              >
                Cancel
              </button>
              <button
                className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
                type="submit"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;

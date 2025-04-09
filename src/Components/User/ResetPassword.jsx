import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../Actions/User";
import toast from "react-hot-toast";
import logo from "/logo.png";
import { LoadAdminImages } from "../../Actions/AdminImg";

const ResetPassword = () => {
  const { adminImages } = useSelector((state) => state.adminImg);
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(LoadAdminImages());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword === confirmpassword) {
      dispatch(resetPassword(params.token, newPassword));
      toast.success("Password Changed Successfully!!");
      navigate("/");
    } else {
      toast.error("Passwords do not match!");
    }
  };

  const cancelHandler = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-50">
      <div className="w-full max-w-md">
        {/* Form Section with Logo Inside */}
        <div className="bg-white shadow-xl border rounded-lg p-8 space-y-6">
          {/* Logo Section Inside Form Container */}
          <div id="logo" className="flex justify-center mb-4">
            <Link to="/">
              <img 
                className="w-36 h-20 md:w-40 md:h-24" 
                src={adminImages?.[0]?.logoImg?.url} 
                alt="Logo" 
              />
            </Link>
          </div>

          <h1 className="text-2xl font-semibold text-center">Reset Password</h1>
          
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <input
              className="p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              className="p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
              type="password"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
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
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
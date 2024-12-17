import React, { useEffect } from 'react';
import userlogo from '/user.png';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {DeleteUserAccount, loadUser, logoutUser } from '../../Actions/User';
import { FaUser, FaKey, FaAddressBook, FaShoppingBag, FaTrashAlt, FaSignOutAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const UserSidebar = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(()=>{
  //   dispatch(loadUser())
  // },[dispatch])

  const logoutHandler = () => {
    dispatch(logoutUser());
    toast.success("Logged Out!")
    navigate('/');
  };

  const deleteHandler = () => {
    if (user?._id) {
      dispatch(DeleteUserAccount(user._id));
      toast.success('Account Deleted!');
      navigate('/');
    } else {
      toast.error('User not found');
    }
  };

  return (
    <div className="h-auto p-6 ">
      <div className="flex items-center gap-4">
        <img
          className="w-10 h-10 md:w-16 md:h-16 rounded-full shadow-sm"
          src={userlogo}
          alt="User Logo"
        />
        <div>
          <h2 className="text-sm md:text-lg text-gray-700">Hello</h2>
          <h1 className="text-md md:text-2xl font-bold text-gray-800">
            {user ? user.username : 'Guest'}
          </h1>
        </div>
      </div>

      <h1 className="text-lg md:text-3xl text-gray-700 font-medium text-center py-4 md:py-6">
        Account
      </h1>

      <div className="flex flex-col gap-3 md:gap-4 text-sm md:text-lg">
        <Link
          to="/account/me"
          className={`flex items-center gap-3 py-2 px-4 transition-colors duration-300 rounded-lg ${
            location.pathname === '/account/me'
              ? 'bg-blue-100 text-blue-700'
              : 'hover:bg-blue-50'
          }`}
        >
          <FaUser />
          My Profile
        </Link>

        <Link
          to="/account/update/password"
          className={`flex items-center gap-3 py-2 px-4 transition-colors duration-300 rounded-lg ${
            location.pathname === '/account/update/password'
              ? 'bg-blue-100 text-blue-700'
              : 'hover:bg-blue-50'
          }`}
        >
          <FaKey />
          Update Password
        </Link>

        <Link
          to="/account/addresses"
          className={`flex items-center gap-3 py-2 px-4 transition-colors duration-300 rounded-lg ${
            location.pathname === '/account/addresses'
              ? 'bg-blue-100 text-blue-700'
              : 'hover:bg-blue-50'
          }`}
        >
          <FaAddressBook />
          Saved Addresses
        </Link>

        <Link
          to="/account/myorders"
          className={`flex items-center gap-3 py-2 px-4 transition-colors duration-300 rounded-lg ${
            location.pathname === '/account/myorders'
              ? 'bg-blue-100 text-blue-700'
              : 'hover:bg-blue-50'
          }`}
        >
          <FaShoppingBag />
          My Orders
        </Link>

        <button className="flex items-center gap-3 py-2 px-4 hover:bg-red-200 transition-colors duration-300 rounded-lg cursor-pointer text-red-600" onClick={deleteHandler}>
          <FaTrashAlt />
          Delete Account
        </button>

        <button
          className="flex items-center gap-3 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
          onClick={logoutHandler}
        >
          <FaSignOutAlt />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;

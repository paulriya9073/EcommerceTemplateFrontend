import React, { useState, useEffect } from 'react';
import userlogo from '/user.png';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DeleteUserAccount, loadUser, logoutUser } from '../../Actions/User';
import { FaUser, FaKey, FaAddressBook, FaShoppingBag, FaTrashAlt, FaSignOutAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const UserSidebar = ({ activeTab, setActiveTab, tabs, setSidebarOpen }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle tab click - set active tab and close sidebar on mobile
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    // Close sidebar on mobile when a tab is clicked
    if (setSidebarOpen && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
    toast.success("Logged Out!")
    navigate('/');
    // Close sidebar on mobile when logging out
    if (setSidebarOpen && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="h-full relative p-6 ">
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
        {
          tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-3 py-2 px-4 transition-colors duration-300 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-blue-100'
              }`}
            >
              {tab.logo}
              {tab.label}
            </button>
          ))
        }

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
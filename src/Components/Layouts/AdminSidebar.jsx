import React from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../Actions/User';
import { FaCalculator, FaSignOutAlt } from 'react-icons/fa';
import { AiFillLayout } from 'react-icons/ai';

const AdminSidebar = ({ activeTab, setActiveTab, tabs = [], setSidebarOpen }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    toast.success("Logged Out!!");
    navigate("/");
    // Close sidebar on mobile when logging out
    if (setSidebarOpen && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Handle tab click - set active tab and close sidebar on mobile
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    // Close sidebar on mobile when a tab is clicked
    if (setSidebarOpen && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Group tabs by section - adding default empty array in case tabs is undefined
  const dashboardTabs = tabs?.filter(tab => tab.section === 'dashboard') || [];
  const accountTabs = tabs?.filter(tab => tab.section === 'account') || [];
  const layoutTabs = tabs?.filter(tab => tab.section === 'layout') || [];
  const graphsTabs = tabs?.filter(tab => tab.section === 'graphs') || [];
  const featureTabs = tabs?.filter(tab => tab.section === 'feature') || [];

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-4 text-lg p-6 md:p-5 flex-grow">
        {/* Dashboard Section */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Dashboard</h3>
          {dashboardTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
              } transition duration-300`}
            >
              {tab.logo}
              <span className="ml-3">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Account Section */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Account</h3>
          {accountTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
              } transition duration-300`}
            >
              {tab.logo}
              <span className="ml-3">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Layout Section */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Layout</h3>
          {layoutTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
              } transition duration-300`}
            >
              {tab.logo}
              <span className="ml-3">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Graphs Section */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Graphs</h3>
          {graphsTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
              } transition duration-300`}
            >
              {tab.logo}
              <span className="ml-3">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Feature Section */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Feature</h3>
          {featureTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
              } transition duration-300`}
            >
              {tab.logo}
              <span className="ml-3">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="pt-4 w-full">
          <button
            className="flex items-center gap-3 w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
            onClick={logoutHandler}
          >
            <FaSignOutAlt />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
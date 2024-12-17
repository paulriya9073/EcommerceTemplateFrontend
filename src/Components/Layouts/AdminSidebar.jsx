import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useDispatch } from 'react-redux';
import { loadUser, logoutUser } from '../../Actions/User';
import { FaCalculator, FaSignOutAlt } from 'react-icons/fa';
import { AiFillLayout } from 'react-icons/ai';

const AdminSidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const logoutHandler=()=>{
    dispatch(logoutUser())
   
    toast.success("Logged Out!!")
    navigate("/")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-4 text-lg p-6 md:p-5 flex-grow">
        {/* Dashboard Section */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Dashboard</h3>
          <Link
            to="/admin/dashboard"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/admin/dashboard')
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
            } transition duration-300`}
          >
            <DashboardIcon className="mr-3" />
            Dashboard
          </Link>
          <Link
            to="/admin/dashboard/users"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/admin/dashboard/users')
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
            } transition duration-300`}
          >
            <PeopleIcon className="mr-3" />
            Users
          </Link>
          <Link
            to="/admin/dashboard/products"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/admin/dashboard/products')
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
            } transition duration-300`}
          >
            <InventoryIcon className="mr-3" />
            Products
          </Link>
          <Link
            to="/admin/dashboard/orders"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/admin/dashboard/orders')
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
            } transition duration-300`}
          >
            <ShoppingCartIcon className="mr-3" />
            Orders
          </Link>
          <Link
            to="/admin/dashboard/reviews"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/admin/dashboard/reviews')
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
            } transition duration-300`}
          >
            <RateReviewIcon className="mr-3" />
            Reviews
          </Link>
        </div>

        {/* Account Section */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Account</h3>
          <Link
            to="/admin/dashboard/myprofile"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/admin/dashboard/myprofile')
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
            } transition duration-300`}
          >
            <PersonIcon className="mr-3" />
            My Profile
          </Link>
          <Link
            to="/admin/dashboard/update/password"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/admin/dashboard/update/password')
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
            } transition duration-300`}
          >
            <KeyIcon className="mr-3" />
            Update Password
          </Link>
        </div>

        {/* Layout Section */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Layout</h3>
          <Link
            to="/admin/dashboard/layout"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/admin/dashboard/layout') ? 'bg-blue-100 text-blue-600' : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
            } transition duration-300`}
          ><AiFillLayout className="mr-3" />
            Layout</Link>
          </div>

        {/* Bars Section */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Graphs</h3>
          <Link
            to="/admin/dashboard/bars/piechart"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/admin/dashboard/bars/piechart')
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
            } transition duration-300`}
          >
            <PieChartIcon className="mr-3" />
            Pie
          </Link>
          <Link
            to="/admin/dashboard/bars/barchart"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/admin/dashboard/bars/barchart')
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
            } transition duration-300`}
          >
            <BarChartIcon className="mr-3" />
            Bar
          </Link>
          <Link
            to="/admin/dashboard/bars/linechart"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/admin/dashboard/bars/linechart')
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
            } transition duration-300`}
          >
            <TimelineIcon className="mr-3" />
            Line
          </Link>
        </div>

            {/* Feature Section */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Feature</h3>
          <Link
            to="/admin/dashboard/gst"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/admin/dashboard/gst') ? 'bg-blue-100 text-blue-600' : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
            } transition duration-300`}
          ><FaCalculator className="mr-3" />
            TAX Calculator</Link>
            <Link
            to="/admin/dashboard/baseprice"
            className={`flex items-center px-4 py-2 rounded-lg ${
              isActive('/admin/dashboard/baseprice') ? 'bg-blue-100 text-blue-600' : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'
            } transition duration-300`}
          ><FaCalculator className="mr-3" />
            Base Price </Link>
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

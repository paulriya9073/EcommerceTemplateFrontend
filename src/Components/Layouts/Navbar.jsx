import React, { useEffect, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import logo from '/logo.png';
import Dropdown from './Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../Actions/User';
import { LoadAdminImages } from '../../Actions/AdminImg';

const Navbar = ({disableSearch}) => {
  const { user } = useSelector((state) => state.user);
   const {adminImages}=useSelector((status)=>status.adminImg)
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(loadUser())
    dispatch(LoadAdminImages())
    // dispatch({type:"clearErrors"})
  },[dispatch,useSelector])

  // console.log("navbar",user);
  

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?keyword=${searchQuery}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-10 flex justify-between items-center h-16 md:h-20">
        <div className="flex items-center">
          <Link to="/">
            <img className="w-24 md:w-40" src={adminImages[0]?.logoImg?.url}   alt="Logo" />
          </Link>
        </div>

        {/* Search Bar (visible on medium+ screens) */}
        { disableSearch ? null : (
          <form
          className="hidden md:flex items-center bg-blue-50 border-2 border-blue-100 rounded-full px-4 py-2 w-full max-w-lg"
          onSubmit={handleSearch}
        >
          <input
            className="flex-1 bg-transparent outline-none p-2"
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <i className="ri-search-line text-gray-500 text-xl"></i>
          </button>
        </form>
        )
        }

        {/* Right-side icons */}
        <div className="flex items-center space-x-6">
          <Dropdown title={user?.username?.split(' ')[0] || "LogIn"} />
          {/* Cart Icon */}
          {user && user?.role === "admin" ? null :
          (
            <Link to="/cart" className="relative flex items-center text-gray-700 hover:text-black">
            <i className="ri-shopping-cart-2-line text-2xl"></i>
            {user?.cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex justify-center items-center">
                {user.cart.length}
              </span>
            )}
          </Link>
          ) }

          {/* Mobile Menu Toggle */}
          {disableSearch ? null : (
            <button
            className="md:hidden text-gray-700 hover:text-black"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="ri-search-line text-2xl"></i>
          </button>
          )}
        </div>
      </div>

      {/* Collapsible Search Bar (visible on small screens) */}
      {disableSearch ? null : (
        <>
        {menuOpen && (
        <div className="flex flex-col items-center bg-white p-4 md:hidden">
          <form
            className="flex items-center bg-blue-50 border-2 border-blue-100 rounded-full px-4 py-2 w-full max-w-lg"
            onSubmit={handleSearch}
          >
            <input
              className="flex-1 bg-transparent outline-none p-2"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <i className="ri-search-line text-gray-500 text-xl"></i>
            </button>
          </form>
        </div>
      )}
        </>
      )}
    </nav>
  );
};

export default Navbar;

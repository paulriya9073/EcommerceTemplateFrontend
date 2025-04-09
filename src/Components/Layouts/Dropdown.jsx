import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loadUser, logoutUser } from '../../Actions/User';

const Dropdown = ({title}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const { user } = useSelector((state) => state.user)

  const dispatch=useDispatch()
  const navigate=useNavigate()

  // useEffect(()=>{
  //   dispatch(loadUser())
  // },[dispatch,useSelector])

  // console.log("dropdown",user);
  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };



const handleLogout=()=>{
dispatch(logoutUser())
toast.success("Logged Out!")
navigate('/')

}

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          onClick={toggleDropdown}
        >
     <i className="ri-user-3-line text-2xl"></i>
     <h1 className='px-1 text-2xl'>{title}</h1>
        </button>
      </div>

      {isOpen && (
        <>
        <div className='absolute z-50 left-0 w-40 text-[1rem] md:text-xl md:w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>

        {user ? (
            user.role === 'admin' ? (
              <ul>
                <li className="px-4 py-2 md:text-xl"><Link to="/admin/dashboard">Dashboard</Link></li>
                {/* <li className="px-4 py-2 md:text-xl"><Link to="/admin/dashboard/myprofile">My Profile</Link></li> */}
                <button className='px-4 py-2 md:text-xl' onClick={handleLogout}>Log Out</button>
              </ul>
            ) : (
              <ul>
                <li className="px-4 py-2 md:text-xl"><Link to="/account/dashboard">Dashboard</Link></li>
                {/* <li className="px-4 py-2 md:text-xl"><Link to="/account/update/password">Update Password</Link></li>
                <li className="px-4 py-2 md:text-xl"><Link to='/account/addresses'>Saved Address</Link></li>
                <li className="px-4 py-2 md:text-xl"><Link to='/account/myorders'>My Orders</Link></li> */}
                <button className='px-4 py-2 md:text-xl' onClick={handleLogout}>Log Out</button>
              </ul>
            )
          ) : (
            <div className='flex justify-evenly'>
              <Link to="/login" className='px-1 py-2'>Log In</Link>
              <div className="border border-black"></div>
              <Link to="/signup" className='px-1 py-2'>Sign Up</Link>
            </div>
          )}
        
      
        </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;

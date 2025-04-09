import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, registerUser } from '../../Actions/User';
import toast from 'react-hot-toast';
import { LoadAdminImages } from '../../Actions/AdminImg';
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiFillLock } from 'react-icons/ai';
import { FaTransgender } from 'react-icons/fa';
import { MdEmail, MdPhone, MdSupervisedUserCircle } from 'react-icons/md';

const Signup = () => {
  const { adminImages } = useSelector((status) => status.adminImg);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(LoadAdminImages());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(username, email, phone, password, gender));

    if (isAuthenticated) {
      navigate('/');
      toast.success('Registered Successfully!');
    } else {
      toast.error('Failed to Register');
    }
  };

  return (
    <div id="main" className="flex flex-col bg-blue-50 justify-center h-screen">
      <div className="flex justify-center items-center">
        <form
          className="bg-white shadow-xl border-2 rounded-lg p-4 w-80 md:w-96 space-y-6"
          onSubmit={submitHandler}
        >
          {/* Logo inside form */}
          <div id="logo" className="flex justify-center mb-2">
            <Link to="/">
              <img
                className="w-36 h-20 md:w-48 md:h-28"
                src={adminImages[0]?.logoImg?.url}
                alt="Logo"
              />
            </Link>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-evenly gap-4 text-lg">
            <Link
              to="/login"
              className="w-1/2 py-2 rounded-md text-center bg-blue-100 text-blue-500 transition-colors duration-300 hover:bg-blue-600 hover:text-white"
            >
              Log In
            </Link>

            <Link
              to="/signup"
              className={`${
                location.pathname === '/signup'
                  ? 'bg-blue-600 text-white'
                  : 'bg-transparent text-gray-700'
              } w-1/2 py-2 rounded-md text-center transition-colors duration-300`}
            >
              Sign Up
            </Link>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <input
                className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 w-full"
                type="text"
                value={username}
                placeholder="First and Last Name"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <MdSupervisedUserCircle className="absolute left-3 top-3 text-blue-600" size={22} />
            </div>

            <div className="relative">
              <input
                className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 w-full"
                type="email"
                value={email}
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdEmail className="absolute left-3 top-3 text-blue-600" size={22} />
            </div>

            <div className="relative">
              <input
                className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 w-full"
                type="text"
                value={phone}
                placeholder="Phone"
                required
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    setPhone(value);
                  }
                }}
              />
              <MdPhone className="absolute left-3 top-3 text-blue-600" size={22} />
            </div>

            <div className="relative">
              <select
                className="p-3 pl-10 border rounded-md border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                value={gender}
                required
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              <FaTransgender className="absolute left-3 top-3 text-blue-600" size={22} />
            </div>

            <div className="relative">
              <input
                className="p-3 pl-10 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 w-full"
                type="password"
                value={password}
                placeholder="Password must be at least 6 characters"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <AiFillLock className="absolute left-3 top-3 text-blue-600" size={22} />
            </div>

            <button
              className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
              type="submit"
            >
              Sign Up
            </button>
          </div>

          {/* Footer */}
          <div className="flex justify-center items-center space-x-2 pt-4">
            <p className="text-gray-700">Already a member?</p>
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 hover:font-semibold"
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

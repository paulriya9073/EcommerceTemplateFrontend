import React, { useEffect, useState } from 'react';
import logo from '/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, loginUser } from '../../Actions/User';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MdEmail, MdLock } from 'react-icons/md'; // Email & Lock icons
import { LoadAdminImages } from '../../Actions/AdminImg';

const Login = () => {
  const { singleProduct } = useSelector((state) => state.order);
  const { adminImages } = useSelector((status) => status.adminImg);

  const productId = singleProduct?.singleProduct;

  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(LoadAdminImages());
  }, [dispatch, useSelector]);

  const { isAuthenticated } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(input, password));

    if (isAuthenticated) {
      navigate("/");
      toast.success("Logged In Successfully!");
    } else {
      toast.error("Failed to Log In!");
    }
  };

  return (
    <>
      <div id='main' className='flex flex-col justify-center bg-blue-50 h-screen'>
        <div className="flex justify-center items-center">
          <form
            className="bg-white shadow-xl border-2 rounded-lg p-4 w-80 md:w-96 space-y-6"
            onSubmit={submitHandler}
          >
            <div id="logo" className="flex justify-center mb-2">
              <Link to="/"><img className='w-36 h-20 md:w-48 md:h-28' src={adminImages[0]?.logoImg?.url} /></Link>
            </div>

            <div className="flex justify-evenly gap-4 text-lg">
              <Link
                to="/login"
                className={`${
                  location.pathname === '/login'
                    ? 'bg-blue-600 text-white'
                    : 'bg-transparent text-gray-700'
                } w-1/2 py-2 rounded-md text-center transition-colors duration-300`}
              >
                Log In
              </Link>

              <Link
                to="/signup"
                className="w-1/2 py-2 rounded-md text-center bg-blue-100 text-blue-500 transition-colors duration-300 hover:bg-blue-600 hover:text-white"
              >
                Sign Up
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative">
                <MdEmail className="absolute left-3 top-3 text-blue-600" size={24} />
                <input
                  className="pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
                  type="text"
                  placeholder="Email or Phone Number"
                  value={input}
                  required
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>

              <div className="relative">
                <MdLock className="absolute left-3 top-3 text-blue-600" size={24} />
                <input
                  className="pl-10 pr-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-blue-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                </span>
              </div>

              <button
                className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
                type="submit"
              >
                Log In
              </button>

              <div className="flex justify-center">
                <Link
                  to="/forget/password"
                  className="text-blue-600 hover:text-blue-700 hover:font-semibold"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2">
              <p className="text-gray-700">Don't have an account?</p>
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 hover:font-semibold"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

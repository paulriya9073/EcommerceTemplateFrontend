import React, { useEffect, useState } from 'react';
import logo from '/logo.png';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSingleUser, updateUserRole } from '../../Actions/User';
import { FaUser, FaEnvelope, FaUserShield } from 'react-icons/fa';
import { MdSave, MdCancel } from 'react-icons/md';
import toast from 'react-hot-toast';

const UpdateUserRole = () => {
  const { singleUser } = useSelector((state) => state.user);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadSingleUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleUser) {
      setUsername(singleUser.username || '');
      setEmail(singleUser.email || '');
      setRole(singleUser.role || '');
    }
  }, [singleUser]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserRole(id, role));
    toast.success("Role Updated!")
    navigate('/admin/dashboard/users');
  };

  const cancelHandler = () => {
    navigate('/admin/dashboard/users');
  };

  return (
    <div id="main" className="flex flex-col justify-center h-screen bg-blue-50">
      <div id="logo" className="flex justify-center mb-6">
        <Link to="/">
          <img className="w-36 h-20 md:w-48 md:h-28" src={logo} />
        </Link>
      </div>

      <div className="flex justify-center items-center">
        <form
          className="bg-white shadow-xl border-2 rounded-lg p-8 w-80 md:w-96 space-y-6"
          onSubmit={submitHandler}
        >
          <div className="flex justify-center text-lg font-bold mb-4">
            <h1>Update User Role</h1>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center border rounded-md p-3">
              <FaUser className="text-gray-500 mr-3" />
              <input
                className="flex-1 focus:outline-none"
                type="text"
                placeholder="Username"
                value={username}
                readOnly
              />
            </div>

            <div className="flex items-center border rounded-md p-3">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                className="flex-1 focus:outline-none"
                type="email"
                placeholder="Email"
                value={email}
                readOnly
              />
            </div>

            <div className="flex items-center border rounded-md p-3">
              <FaUserShield className="text-gray-500 mr-3" />
              <input
                className="flex-1 focus:outline-none"
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                className="w-1/2 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all mr-2"
                type="submit"
              >
                Save
              </button>
              <button
                className="w-1/2 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-all"
                type="button"
                onClick={cancelHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserRole;

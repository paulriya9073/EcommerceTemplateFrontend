import React, { useState } from 'react';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import UserSidebar from '../Layouts/UserSidebar';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../Actions/User';
import { FaArrowLeft } from 'react-icons/fa';
import { MdLock } from 'react-icons/md';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const dispatch = useDispatch();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const updatePasswordHandler = (e) => {
        e.preventDefault();
        dispatch(updatePassword(oldPassword, newPassword));
    };

    const cancelHandler = () => {
        setOldPassword('');
        setNewPassword('');
    };

    return (
        <>
        {/* update user password */}
                    <div className="h-full flex justify-center items-center">
                        <form
                            className="bg-white mb-10 shadow-lg rounded-lg p-6 md:p-8  md:w-1/2 "
                            onSubmit={updatePasswordHandler}
                        >
                            <div className="flex flex-col pt-8 gap-4">
                                <div className="relative">
                                    <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 text-xl" />
                                    <input
                                        className="pl-10 pr-10 p-3 rounded-md h-12 border border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 w-full"
                                        type={showOldPassword ? 'text' : 'password'}
                                        placeholder="Old Password"
                                        value={oldPassword}
                                        required
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-600"
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                    >
                                        {showOldPassword ? <FiEyeOff className='text-blue-600' /> : <FiEye className='text-blue-600'  />}
                                    </button>
                                </div>

                                <div className="relative">
                                    <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 text-xl" />
                                    <input
                                        className="pl-10 pr-10 p-3 rounded-md h-12 border border-blue-300 focus:outline-none bg-blue-50 focus:ring-2 focus:ring-blue-500 w-full"
                                        type={showNewPassword ? 'text' : 'password'}
                                        placeholder="New Password"
                                        value={newPassword}
                                        required
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-600"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? <FiEyeOff className='text-blue-600' /> : <FiEye className='text-blue-600'  />}
                                    </button>
                                </div>

                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        className="py-2 px-6 bg-red-400 text-white rounded-md hover:bg-red-700 transition duration-300"
                                        onClick={cancelHandler}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                                        type="submit"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
            
        </>
    );
};

export default UpdatePassword;

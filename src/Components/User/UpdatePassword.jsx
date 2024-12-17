import React, { useState } from 'react';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import UserSidebar from '../Layouts/UserSidebar';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../Actions/User';
import { FaArrowLeft } from 'react-icons/fa';

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
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
            <Navbar />
            <div className="w-full h-auto bg-blue-50 grid grid-cols-12">
            <aside
          className={`fixed top-0 left-0 z-40 w-full h-full bg-white transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:col-span-3`}
        >
          <div className="relative">
            <UserSidebar/>
            <button
              className="absolute top-4 right-4 md:hidden text-black text-2xl p-2 rounded-full"
              onClick={toggleSidebar}
            >
            <FaArrowLeft/>
            </button>
          </div>
        </aside>
                <div className={`md:col-span-9 h-full ${sidebarOpen ? 'hidden md:block' : 'col-span-12'}`}>
                    <div className="w-full h-16 md:h-24 flex items-center justify-between px-4">
                        <button className="md:hidden ml-auto mr-4" onClick={toggleSidebar}>
                            <i className="ri-menu-line text-2xl"></i>
                        </button>
                    </div>
                    <div className="h-[50vh] flex justify-center items-center">
                        <form
                            className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-[90%] md:w-[40vw] "
                            onSubmit={updatePasswordHandler}
                        >
                            <h1 className="text-xl md:text-2xl font-bold text-center mb-6">Update Password</h1>
                            <div className="flex flex-col gap-4">
                                <input
                                    className="p-3 rounded-md h-12 border border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 w-full"
                                    type="password"
                                    placeholder="Old Password"
                                    value={oldPassword}
                                    required
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                                <input
                                    className="p-3 rounded-md h-12 border border-blue-300 focus:outline-none bg-blue-50 focus:ring-2 focus:ring-blue-500 w-full"
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    required
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        className="py-2 px-6 bg-red-400 text-white rounded-md hover:bg-gray-500 transition duration-300"
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
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UpdatePassword;

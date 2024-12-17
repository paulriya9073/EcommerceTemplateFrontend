import React, { useState } from 'react';
import Navbar from '../Layouts/Navbar';
import AdminSidebar from '../Layouts/AdminSidebar';
import Footer from '../Layouts/Footer';
import { FaArrowLeft, FaKey, FaLock } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../Actions/User';

const UpdateAdminPassword = () => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const dispatch = useDispatch();

    const updatePasswordHandler = (e) => {
        e.preventDefault();
        dispatch(updatePassword(oldPassword, newPassword));
    };

    const cancelHandler = () => {
        setOldPassword("");
        setNewPassword("");
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <Navbar disableSearch={true} />
            <div className='w-full h-auto bg-blue-50 grid grid-cols-12'>
            <aside
          className={`fixed top-0 left-0 z-40 w-full h-full bg-white transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:col-span-2`}
        >
          <div className="relative">
            <AdminSidebar />
            <button
              className="absolute top-4 right-4 md:hidden text-black text-2xl p-2 rounded-full"
              onClick={toggleSidebar}
            >
            <FaArrowLeft/>
            </button>
          </div>
        </aside>
                <div className={`md:col-span-10 h-full ${sidebarOpen ? 'hidden md:block' : 'col-span-12'}`}>
                    <div className="w-full h-16 md:h-24 text-xl md:text-2xl flex justify-center items-center">
                        <button className="md:hidden ml-auto mr-4" onClick={toggleSidebar}>
                            <i className="ri-menu-line text-2xl"></i>
                        </button>
                    </div>
                    <div className="h-[70vh] w-full flex justify-center items-center">
                        <form
                            className="bg-white h-[35vh] md:h-[40vh] w-72 md:w-[35vw] p-4 rounded-md shadow-lg"
                            onSubmit={updatePasswordHandler}
                        >
                            <h1 className="text-[1.1rem] md:text-2xl text-center font-bold">Update Password</h1>

                            <div className="flex flex-col justify-center items-center gap-4 mt-6">
                                {/* Old Password Input */}
                                <div className="relative w-full">
                                    <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                    <input
                                        className="pl-10 p-3 h-12 w-full border-blue-400 border rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="password"
                                        placeholder="Old Password"
                                        value={oldPassword}
                                        required
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>

                                {/* New Password Input */}
                                <div className="relative w-full">
                                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                    <input
                                        className="pl-10 p-3 h-12 w-full order-blue-400 border rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        required
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-center items-center gap-3 mt-4 w-full">
                                    <button
                                        className="text-sm md:text-[1rem] w-24 md:w-24 h-10 rounded-md hover:bg-red-700 text-white bg-red-500 "
                                        onClick={cancelHandler}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="text-sm md:text-[1rem] w-24 md:w-24 h-10  rounded-md hover:bg-blue-700 text-white  bg-blue-500 h"
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

export default UpdateAdminPassword;

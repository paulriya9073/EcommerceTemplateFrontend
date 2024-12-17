import React, { useEffect, useState } from 'react';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import UserSidebar from '../Layouts/UserSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, updateProfile } from '../../Actions/User';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

const MyProfile = () => {
    const { user } = useSelector((state) => state.user);

    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingGender, setIsEditingGender] = useState(false);

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [gender, setGender] = useState(user.gender);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadUser())
    },[dispatch])

    const handleEdit = (field) => {
        switch (field) {
            case 'username':
                setIsEditingUsername(true);
                break;
            case 'email':
                setIsEditingEmail(true);
                break;
            case 'phone':
                setIsEditingPhone(true);
                break;
            case 'gender':
                setIsEditingGender(true);
                break;
            default:
                break;
        }
    };

    const handleUpdateProfile = () => {
        dispatch(updateProfile(username, email, phone, gender));
        toast.success("Profile Updated!")
        
        setIsEditingUsername(false);
        setIsEditingEmail(false);
        setIsEditingPhone(false);
        setIsEditingGender(false);
    };

    const cancelHandler = () => {
        setUsername(user.username);
        setEmail(user.email);
        setPhone(user.phone);
        setGender(user.gender);

        setIsEditingUsername(false);
        setIsEditingEmail(false);
        setIsEditingPhone(false);
        setIsEditingGender(false);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <Navbar />
            <div className='w-full h-auto grid grid-cols-12 bg-blue-50'>
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
                <div
                    className={`md:col-span-9 h-full ${
                        sidebarOpen ? 'hidden md:block' : 'col-span-12'
                    }`}
                >
                    <div className="w-full h-16 md:h-24 text-xl md:text-2xl flex justify-center items-center">
                        <h1 className="px-4 font-bold">My Profile</h1>
                        <button
                            className="md:hidden ml-auto mr-4"
                            onClick={toggleSidebar}
                        >
                            <i className="ri-menu-line text-2xl"></i>
                        </button>
                    </div>

                    <div className="h-auto mb-8 w-full flex flex-col justify-center items-center">
                        <div className="flex flex-col bg-white shadow-md pb-8 justify-center items-center rounded-md mb-4 p-2 gap-4 md:p-8 md:gap-8">
                            {/* Username Section */}
                            <div className="flex flex-col gap-2 md:gap-4 md:w-full md:h-28 px-3">
                                <label className="md:text-3xl">User Name</label>
                                <div className="flex flex-row items-center gap-4">
                                    <input
                                        className="md:text-2xl border-blue-400 border rounded-lg bg-blue-50 w-80 md:w-[55vw] p-2"
                                        type="text"
                                        value={username}
                                        readOnly={!isEditingUsername}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                    {isEditingUsername ? (
                                        <div className="flex">
                                            <button
                                                className="w-9 h-5 md:w-12 md:h-7 text-[.8rem] md:text-[1rem] rounded text-white bg-blue-500 mr-3"
                                                onClick={handleUpdateProfile}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="w-12 h-5 md:w-16 md:h-7 text-[.8rem] md:text-[1rem] rounded text-white bg-red-500"
                                                onClick={cancelHandler}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="w-8 h-5 md:w-10 md:h-7 rounded text-[.8rem] md:text-[1rem] text-white bg-blue-500"
                                            onClick={() =>
                                                handleEdit('username')
                                            }
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Email Section */}
                            <div className="flex flex-col gap-2 md:gap-4 md:w-full md:h-28 px-3">
                                <label className="md:text-3xl">Email</label>
                                <div className="flex flex-row items-center gap-4">
                                    <input
                                        className="md:text-2xl border-blue-400 border rounded-lg bg-blue-50 w-80 md:w-[55vw] p-2"
                                        type="email"
                                        value={email}
                                        readOnly={!isEditingEmail}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    {isEditingEmail ? (
                                        <div className="flex">
                                            <button
                                                className="w-9 h-5 md:w-12 md:h-7 text-[.8rem] md:text-[1rem] rounded text-white bg-blue-500 mr-3"
                                                onClick={handleUpdateProfile}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="w-12 h-5 md:w-16 md:h-7 text-[.8rem] md:text-[1rem] rounded text-white bg-red-500"
                                                onClick={cancelHandler}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="w-8 h-5 md:w-10 md:h-7 text-[.8rem] md:text-[1rem] rounded text-white bg-blue-500"
                                            onClick={() => handleEdit('email')}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Phone Section */}
                            <div className="flex flex-col gap-2 md:gap-4 md:w-full md:h-28 px-3">
                                <label className="md:text-3xl">Phone</label>
                                <div className="flex flex-row items-center gap-4">
                                    <input
                                        className="md:text-2xl border-blue-400 border rounded-lg bg-blue-50 w-80 md:w-[55vw] p-2"
                                        type="text"
                                        value={phone}
                                        readOnly={!isEditingPhone}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value) && value.length <= 10) {
                                              setPhone(value);
                                            }
                                          }}
                                    />
                                    {isEditingPhone ? (
                                        <div className="flex">
                                            <button
                                                className="w-9 h-5 md:w-12 md:h-7 text-[.8rem] md:text-[1rem] rounded text-white bg-blue-500 mr-3"
                                                onClick={handleUpdateProfile}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="w-12 h-5 md:w-16 md:h-7 text-[.8rem] md:text-[1rem] rounded text-white bg-red-500"
                                                onClick={cancelHandler}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="w-8 h-5 md:w-10 md:h-7 text-[.8rem] md:text-[1rem] rounded text-white bg-blue-500"
                                            onClick={() => handleEdit('phone')}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Gender Section */}
                            <div className="flex flex-col gap-2 md:gap-4 md:w-full md:h-28 px-3">
                                <label className="md:text-3xl">Gender</label>
                                <div className="flex flex-row gap-4 w-full">
                                    <div className="flex gap-2">
                                        <input
                                            type="radio"
                                            value="Male"
                                            checked={gender === 'Male'}
                                            disabled={!isEditingGender}
                                            onChange={(e) =>
                                                setGender(e.target.value)
                                            }
                                        />
                                        <label className="text-[.8rem] md:text-2xl">
                                            Male
                                        </label>
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="radio"
                                            value="Female"
                                            checked={gender === 'Female'}
                                            disabled={!isEditingGender}
                                            onChange={(e) =>
                                                setGender(e.target.value)
                                            }
                                        />
                                        <label className="text-[.8rem] md:text-2xl">
                                            Female
                                        </label>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input
                                            type="radio"
                                            value="Others"
                                            checked={gender === 'Others'}
                                            disabled={!isEditingGender}
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                        <label className='text-[.8rem] md:text-2xl'>
                                            Others
                                        </label>
                                    </div>
                                    {isEditingGender ? (
                                        <div className="flex">
                                            <button
                                                className="w-9 h-5 md:w-12 md:h-7 text-[.8rem] md:text-[1rem] rounded text-white bg-blue-500 mr-3"
                                                onClick={handleUpdateProfile}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="w-12 h-5 md:w-16 md:h-7 text-[.8rem] md:text-[1rem] rounded text-white bg-red-500"
                                                onClick={cancelHandler}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="w-8 h-5 md:w-10 md:h-7 text-[.8rem] md:text-[1rem] rounded text-white bg-blue-500"
                                            onClick={() => handleEdit('gender')}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyProfile;

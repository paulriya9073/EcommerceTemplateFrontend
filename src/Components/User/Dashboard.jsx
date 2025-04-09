import React, { useState, useEffect } from 'react';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import UserSidebar from '../Layouts/UserSidebar';
import { FaAddressBook, FaArrowLeft, FaKey, FaShoppingBag, FaUser } from 'react-icons/fa';
import MyProfile from './MyProfile';
import UpdatePassword from './UpdatePassword';
import SavedAddresses from '../Address/SavedAddresses';
import MyOrders from './MyOrders';

const UserDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(() => {
        // Try to get the active tab from localStorage, default to "My Profile" if not found
        const savedTab = localStorage.getItem('activeTab');
        return savedTab || "My Profile";
    });

    // Save the active tab to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    const tabs = [
        { id: "My Profile", label: "My Profile", logo: <FaUser /> },
        { id: "Update Password", label: "Update Password", logo: <FaKey /> },
        { id: "Saved Addresses", label: "Saved Addresses", logo: <FaAddressBook /> },
        { id: "My Orders", label: "My Orders", logo: <FaShoppingBag /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "My Profile":
                return <MyProfile />;
            case "Update Password":
                return <UpdatePassword />;
            case "Saved Addresses":
                return <SavedAddresses />;
            case "My Orders":
                return <MyOrders />;
            default:
                return <MyProfile />;
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <Navbar />
            <div className='w-full h-full grid grid-cols-12 bg-blue-50'>
                {/* sidebar */}
                <aside
                    className={`fixed inset-0 z-40 bg-white transition-transform transform ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:static lg:translate-x-0 lg:col-span-3`}
                >
                    <div className="relative h-full">
                        <UserSidebar 
                            tabs={tabs} 
                            activeTab={activeTab} 
                            setActiveTab={setActiveTab}
                            setSidebarOpen={setSidebarOpen}
                        />
                        <button
                            className="absolute top-4 right-4 lg:hidden text-black text-2xl p-2 rounded-full"
                            onClick={toggleSidebar}
                        >
                            <FaArrowLeft />
                        </button>
                    </div>
                </aside>
                
                {/* Main content area */}
                <div
                    className={`lg:col-span-9 h-full ${
                        sidebarOpen ? 'hidden lg:block' : 'col-span-12'
                    }`}
                >
                    <div className="w-full h-16 md:h-24 text-xl md:text-2xl flex justify-between lg:justify-center items-center px-4">
                        <h1 className="font-bold">{activeTab}</h1>
                        <button
                            className="lg:hidden"
                            onClick={toggleSidebar}
                        >
                            <i className="ri-menu-line text-2xl"></i>
                        </button>
                    </div>

                    {/* dashboard components */}
                    <div className="p-4 overflow-auto">
                        {renderContent()}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserDashboard;
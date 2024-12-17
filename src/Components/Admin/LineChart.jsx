import React, { useEffect, useState } from 'react';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import AdminSidebar from '../Layouts/AdminSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { LoadAllOrders } from '../../Actions/Order';
import BasicLine from "../Layouts/BasicLine";
import { loadAllUser } from '../../Actions/User';
import { FaArrowLeft } from 'react-icons/fa';

const LineChart = () => {
    const { orders } = useSelector((state) => state.order);
    const { users } = useSelector((state) => state.user);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [totalRevenueData, setTotalRevenueData] = useState(null);
    const [activeUserData, setActiveUserData] = useState(null);
    const [profitData, setProfitData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LoadAllOrders());
        dispatch(loadAllUser());
    }, [dispatch]);

    useEffect(() => {
        const currYear = new Date().getFullYear();
        const prevYear = currYear - 1;
    
        const revenuesCurrYear = Array(12).fill(0);
        const revenuesPrevYear = Array(12).fill(0);
    
        const basePriceCurrYear = Array(12).fill(0);
        const basePricePrevYear = Array(12).fill(0);
    
        const taxCurrYear = Array(12).fill(0);
        const taxPrevYear = Array(12).fill(0);
    
        if (orders && orders.orders && orders.orders.length > 0) {
            orders.orders.forEach((order) => {
                const orderDate = new Date(order.createdAt);
                const month = orderDate.getMonth();
                const year = orderDate.getFullYear();
    
                // Update revenues based on the year
                if (year === currYear) {
                    revenuesCurrYear[month] += order.totalAmount;
                } else if (year === prevYear) {
                    revenuesPrevYear[month] += order.totalAmount;
                }
    
                // Update base price and tax calculations for each item
                order.orderItems.forEach((item) => {
                    const basePrice = item.product.basePrice * item.quantity;
                    const tax = (basePrice * item.product.tax) / 100;
    
                    if (year === currYear) {
                        basePriceCurrYear[month] += basePrice;
                        taxCurrYear[month] += tax;
                    } else if (year === prevYear) {
                        basePricePrevYear[month] += basePrice;
                        taxPrevYear[month] += tax;
                    }
                });
            });
    
            // Calculate profits
            const profitCurrYear = revenuesCurrYear.map(
                (revenue, index) => revenue - (basePriceCurrYear[index] + taxCurrYear[index])
            );
    
            const profitPrevYear = revenuesPrevYear.map(
                (revenue, index) => revenue - (basePricePrevYear[index] + taxPrevYear[index])
            );
    
            const labels = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December',
            ];
    
            // Set total revenue data
            setTotalRevenueData({
                labels,
                datasets: [
                    {
                        label: `Revenue (${currYear})`,
                        data: revenuesCurrYear,
                        borderColor: '#FF6384',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                        tension: 0.3,
                    },
                    {
                        label: `Revenue (${prevYear})`,
                        data: revenuesPrevYear,
                        borderColor: '#36A2EB',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: true,
                        tension: 0.3,
                    },
                ],
            });
    
            // Set profit data
            setProfitData({
                labels,
                datasets: [
                    {
                        label: `Profit (${currYear})`,
                        data: profitCurrYear,
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.2)',
                        fill: true,
                        tension: 0.3,
                    },
                    {
                        label: `Profit (${prevYear})`,
                        data: profitPrevYear,
                        borderColor: '#FF9800',
                        backgroundColor: 'rgba(255, 152, 0, 0.2)',
                        fill: true,
                        tension: 0.3,
                    },
                ],
            });
        }
    }, [orders]);
    

    useEffect(() => {
        const currYear = new Date().getFullYear();
        const prevYear = currYear - 1;

        const activeUsersCurrYear = Array(12).fill(0);
        const activeUsersPrevYear = Array(12).fill(0);

        if (users && users.length > 0) {
            users.forEach((user) => {
                const signupDate = new Date(user.createdAt);
                const month = signupDate.getMonth();
                const year = signupDate.getFullYear();

                if (year === currYear) {
                    activeUsersCurrYear[month] += 1;
                } else if (year === prevYear) {
                    activeUsersPrevYear[month] += 1;
                }
            });

            const labels = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December',
            ];

            setActiveUserData({
                labels,
                datasets: [
                    {
                        label: `Active Users (${currYear})`,
                        data: activeUsersCurrYear,
                        borderColor: '#02B2AF',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                        tension: 0.3,
                    },
                    {
                        label: `Active Users (${prevYear})`,
                        data: activeUsersPrevYear,
                        borderColor: '#B800D8',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: true,
                        tension: 0.3,
                    },
                ],
            });
        }
    }, [users]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <Navbar disableSearch={true} />
            <div className="w-full h-auto bg-blue-50 grid grid-cols-12">
                <aside
                    className={`fixed top-0 left-0 z-40 w-full h-full bg-white transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:col-span-2`}
                >
                    <div className="relative">
                        <AdminSidebar />
                        <button
                            className="absolute top-4 right-4 md:hidden text-black text-2xl p-2 rounded-full"
                            onClick={toggleSidebar}
                        >
                            <FaArrowLeft />
                        </button>
                    </div>
                </aside>
                <div className={`md:col-span-10 h-full ${sidebarOpen ? 'hidden md:block' : 'col-span-12'}`}>
                    <div className="w-full h-16 md:h-24 text-xl md:text-2xl flex justify-center items-center">
                        <h1 className="px-4 mt-3 text-xl md:text-4xl md:font-bold">Line Charts</h1>
                        <button className="md:hidden ml-auto mr-4" onClick={toggleSidebar}>
                            <i className="ri-menu-line text-2xl"></i>
                        </button>
                    </div>
                    <div className="w-full mt-5 flex flex-col justify-center items-center gap-8 px-8 py-8 md:py-12">
                        <div className="w-full p-8 bg-white rounded-md shadow-md">
                            <h1 className="text-3xl font-bold text-center pb-6">Revenue Comparison</h1>
                            {totalRevenueData && totalRevenueData.datasets[0].data.some((value) => value > 0) ? (
                                <BasicLine line={totalRevenueData} />
                            ) : (
                                <p className="text-center text-gray-500 text-xl">No data available right now.</p>
                            )}
                        </div>

                        <div className="w-full p-8 bg-white rounded-md shadow-md">
                            <h1 className="text-3xl font-bold text-center pb-6">Profit Comparison</h1>
                            {profitData && profitData.datasets[0].data.some((value) => value > 0) ? (
                                <BasicLine line={profitData} />
                            ) : (
                                <p className="text-center text-gray-500 text-xl">No data available right now.</p>
                            )}
                        </div>

                        <div className="w-full p-8 bg-white rounded-md shadow-md">
                            <h1 className="text-3xl font-bold text-center pb-6">Active Users</h1>
                            {activeUserData && activeUserData.datasets[0].data.some((value) => value > 0) ? (
                                <BasicLine line={activeUserData} />
                            ) : (
                                <p className="text-center text-gray-500 text-xl">No data available right now.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LineChart;

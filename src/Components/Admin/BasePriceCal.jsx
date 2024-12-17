import React, { useState } from "react";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import AdminSidebar from "../Layouts/AdminSidebar"; // Ensure this path is correct
import { FaArrowLeft } from "react-icons/fa";

const BasePriceCalculator = () => {
    const [totalAmount, setTotalAmount] = useState("");
    const [gst, setGst] = useState("");
    const [basePrice, setBasePrice] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false); // Added missing state

    const calculateBasePrice = () => {
        const totalValue = parseFloat(totalAmount);
        const gstValue = parseFloat(gst);

        if (!isNaN(totalValue) && !isNaN(gstValue) && gstValue > 0) {
            const base = totalValue / (1 + gstValue / 100);
            const tax = totalValue - base;
            setBasePrice(base.toFixed(2));
            setTaxAmount(tax.toFixed(2));
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <Navbar disableSearch={true} />
            <div className="w-full h-auto grid grid-cols-12 bg-blue-50">
                <aside
                    className={`fixed top-0 left-0 z-40 w-full h-full bg-white transition-transform transform ${
                        sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:static md:translate-x-0 md:col-span-2`}
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
                <div
                    className={`md:col-span-10 h-full ${
                        sidebarOpen ? "hidden md:block" : "col-span-12"
                    }`}
                >
                    <div className="w-full h-16 md:h-24 text-xl md:text-3xl flex justify-center items-center">
                        <h1 className="px-4 font-bold">Base Price Calculator</h1>
                        <button
                            className="md:hidden ml-auto mr-4"
                            onClick={toggleSidebar}
                        >
                            <i className="ri-menu-line text-2xl"></i>
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center min-h-screen pb-8">
                        <div className="bg-white p-6 rounded-lg shadow-md w-96">
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Total Amount (Incl. TAX)
                                </label>
                                <input
                                    type="number"
                                    value={totalAmount}
                                    onChange={(e) => setTotalAmount(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Enter total amount"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">
                                    TAX (%)
                                </label>
                                <input
                                    type="number"
                                    value={gst}
                                    onChange={(e) => setGst(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Enter TAX percentage"
                                />
                            </div>
                            <button
                                onClick={calculateBasePrice}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Calculate
                            </button>
                            <div className="mt-4">
                                <p className="text-gray-700">
                                    Base Price: <span className="font-bold">₹{basePrice}</span>
                                </p>
                                <p className="text-gray-700">
                                    TAX Amount: <span className="font-bold">₹{taxAmount}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BasePriceCalculator;

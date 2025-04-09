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

                    <div className="h-full flex flex-col items-center pb-8">
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
  
        </>
    );
};

export default BasePriceCalculator;

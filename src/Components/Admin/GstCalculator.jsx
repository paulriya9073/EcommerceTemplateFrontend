import React, { useState } from "react";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";
import AdminSidebar from "../Layouts/AdminSidebar"; // Ensure this path is correct
import { FaArrowLeft } from "react-icons/fa";

const GSTCalculator = () => {
    const [price, setPrice] = useState("");
    const [gst, setGst] = useState("");
    const [gstAmount, setGstAmount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false); // Added missing state

    const calculateGST = () => {
        const priceValue = parseFloat(price);
        const gstValue = parseFloat(gst);

        if (!isNaN(priceValue) && !isNaN(gstValue)) {
            const calculatedGST = (priceValue * gstValue) / 100;
            const calculatedTotal = priceValue + calculatedGST;
            setGstAmount(calculatedGST.toFixed(2));
            setTotalPrice(calculatedTotal.toFixed(2));
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            
                    <div className="h-full flex flex-col items-center justify-center pb-8">
                        <div className="bg-white p-6 rounded-lg shadow-md w-96">
                        
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Enter price"
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
                                onClick={calculateGST}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Calculate
                            </button>
                            <div className="mt-4">
                                <p className="text-gray-700">
                                    TAX Amount: <span className="font-bold">₹{gstAmount}</span>
                                </p>
                                <p className="text-gray-700">
                                    Total Price (Incl. TAX):{" "}
                                    <span className="font-bold">₹{totalPrice}</span>
                                </p>
                            </div>
                        </div>
                    </div>
      
        </>
    );
};

export default GSTCalculator;

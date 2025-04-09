import React, { useEffect, useState } from 'react';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import AdminSidebar from '../Layouts/AdminSidebar';
import { LoadAdminAllProducts } from '../../Actions/Product';
import { useDispatch, useSelector } from 'react-redux';
import BasicPie from '../Layouts/BasicPie';
import { loadAllUser } from '../../Actions/User';
import { LoadAllOrders } from '../../Actions/Order';
import { FaArrowLeft } from 'react-icons/fa';

const PieChart = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { products } = useSelector((state) => state.product);
    const { orders } = useSelector((state) => state.order);
    const dispatch = useDispatch();

    console.log(orders);


    const [categoryCounts, setCategoryCounts] = useState({
        necklaces: 0,
        earrings: 0,
        rings: 0,
        pendants: 0,
        bracelets: 0,
    });

    const [stockCount, setStockCount] = useState({
        noStock: 0,
        stock: 0,
    })


    const [deliveryCount, setDeliveryCount] = useState({
        processing: 0,
        shipped: 0,
        delivered: 0,
    })

    useEffect(() => {
        dispatch(LoadAdminAllProducts());
        dispatch(LoadAllOrders())
    }, [dispatch]);

    useEffect(() => {
        if (products && products?.length > 0) {
            const counts = {
                necklaces: 0,
                earrings: 0,
                rings: 0,
                pendants: 0,
                bracelets: 0,
            };

            products?.forEach((item) => {
                switch (item.category) {
                    case 'Necklaces':
                        counts.necklaces += 1;
                        break;
                    case 'Earrings':
                        counts.earrings += 1;
                        break;
                    case 'Rings':
                        counts.rings += 1;
                        break;
                    case 'Pendants':
                        counts.pendants += 1;
                        break;
                    case 'Bracelets':
                        counts.bracelets += 1;
                        break;
                    default:
                        break;
                }
            });

            setCategoryCounts(counts);

            const StockCount = {
                noStock: 0,
                stock: 0,
            }

            products?.forEach((item) => {
                if (item.stock == 0) {
                    StockCount.noStock += 1;
                }
                else {
                    StockCount.stock += 1;
                }
            })

            setStockCount(StockCount)
        }



        if (orders && orders?.orders && orders?.orders?.length > 0) {
            const DeliveryCount = {
                processing: 0,
                shipped: 0,
                delivered: 0,
            }

            orders?.orders?.forEach((item) => {
                switch (item.shippingStatus) {
                    case 'Processing':
                        DeliveryCount.processing += 1;
                        break;
                    case 'Shipped':
                        DeliveryCount.shipped += 1;
                        break;
                    case 'Delivered':
                        DeliveryCount.delivered += 1;
                        break;
                    default:
                        break;
                }
            })

            setDeliveryCount(DeliveryCount)

        }


    }, [products, orders]);

    const catagoryData = [
        { label: 'Necklaces', value: categoryCounts.necklaces },
        { label: 'Earrings', value: categoryCounts.earrings },
        { label: 'Rings', value: categoryCounts.rings },
        { label: 'Pendants', value: categoryCounts.pendants },
        { label: 'Bracelets', value: categoryCounts.bracelets },
    ];

    const stockData = [
        { label: 'Stock', value: stockCount.stock, color: '#02b2af' },
        { label: 'No Stock', value: stockCount.noStock, color: '#CE9CFF' },
    ]

    const orderData = [
        { label: 'Processing', value: deliveryCount.processing, color: '#B800D8' },
        { label: 'Shipped', value: deliveryCount.shipped, color: '#007bff' },
        { label: 'Delivered', value: deliveryCount.delivered, color: '#03e2b8' },
    ]




    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };


    return (
        <>
            
                    <div
                        className="w-full mt-5 flex flex-col justify-center items-center gap-8 px-8 py-8 lg:py-12"
                    >
                        <div className="w-[90vw] lg:w-[50vw] bg-white flex flex-col justify-center items-center shadow-xl rounded-lg p-6">
                            <h1 className="text-lg lg:text-2xl font-semibold mb-4 text-gray-800">Categories</h1>
                            {catagoryData.every(item => item.value === 0) ? (
                                <p className="text-gray-500">No data available right now.</p>
                            ) : (
                                <BasicPie data={catagoryData} />
                            )}
                        </div>
                        <div className="w-[90vw] lg:w-[50vw] bg-white flex flex-col justify-center items-center shadow-xl rounded-lg p-6">
                            <h1 className="text-lg lg:text-2xl font-semibold mb-4 text-gray-800">Stock Status</h1>
                            {stockData.every(item => item.value === 0) ? (
                                <p className="text-gray-500">No data available right now.</p>
                            ) : (
                                <BasicPie data={stockData} />
                            )}
                        </div>
                        <div className="w-[90vw] lg:w-[50vw] bg-white flex flex-col justify-center items-center shadow-xl rounded-lg p-6">
                            <h1 className="text-lg lg:text-2xl font-semibold mb-4 text-gray-800">Order Status</h1>
                            {orderData.every(item => item.value === 0) ? (
                                <p className="text-gray-500">No data available right now.</p>
                            ) : (
                                <BasicPie data={orderData} />
                            )}
                        </div>

                    </div>
        </>
    )
}

export default PieChart
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
                            <FaArrowLeft />
                        </button>
                    </div>
                </aside>
                <div className={`md:col-span-10 h-full ${sidebarOpen ? 'hidden md:block' : 'col-span-12'}`}>
                    <div className="w-full h-16 md:h-24 text-xl md:text-2xl flex justify-center items-center">
                        <h1 className="px-4 mt-3 text-xl md:text-4xl md:font-bold">Pie Charts</h1>
                        <button className="md:hidden ml-auto mr-4" onClick={toggleSidebar}>
                            <i className="ri-menu-line text-2xl"></i>
                        </button>
                    </div>
                    <div
                        className="w-full mt-5 flex flex-col justify-center items-center gap-8 px-8 py-8 md:py-12"
                    >
                        <div className="w-[90vw] md:w-[50vw] bg-white flex flex-col justify-center items-center shadow-xl rounded-lg p-6">
                            <h1 className="text-lg md:text-2xl font-semibold mb-4 text-gray-800">Categories</h1>
                            {catagoryData.every(item => item.value === 0) ? (
                                <p className="text-gray-500">No data available right now.</p>
                            ) : (
                                <BasicPie data={catagoryData} />
                            )}
                        </div>
                        <div className="w-[90vw] md:w-[50vw] bg-white flex flex-col justify-center items-center shadow-xl rounded-lg p-6">
                            <h1 className="text-lg md:text-2xl font-semibold mb-4 text-gray-800">Stock Status</h1>
                            {stockData.every(item => item.value === 0) ? (
                                <p className="text-gray-500">No data available right now.</p>
                            ) : (
                                <BasicPie data={stockData} />
                            )}
                        </div>
                        <div className="w-[90vw] md:w-[50vw] bg-white flex flex-col justify-center items-center shadow-xl rounded-lg p-6">
                            <h1 className="text-lg md:text-2xl font-semibold mb-4 text-gray-800">Order Status</h1>
                            {orderData.every(item => item.value === 0) ? (
                                <p className="text-gray-500">No data available right now.</p>
                            ) : (
                                <BasicPie data={orderData} />
                            )}
                        </div>

                    </div>

                </div>
            </div>


            <Footer />
        </>
    )
}

export default PieChart
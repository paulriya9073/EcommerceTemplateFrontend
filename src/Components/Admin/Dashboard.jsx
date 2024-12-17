import React, { useEffect, useState } from 'react';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import AdminSidebar from '../Layouts/AdminSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllUser } from '../../Actions/User';
import { LoadAdminAllProducts } from '../../Actions/Product';
import { LoadAllOrders } from '../../Actions/Order';
import BasicPie from '../Layouts/BasicPie';
import BasicLine from "../Layouts/BasicLine";

import { Bar } from 'react-chartjs-2';
import { FaArrowLeft, FaBackward, FaCross, FaRupeeSign, FaTimes } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,

} from 'chart.js';


// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const { numberOfUsers } = useSelector((state) => state.user);
  const { totalNumberOfProducts, products } = useSelector((state) => state.product);
  const { orders, totalAmountOfAllOrders, totalNoOfOrders } = useSelector((state) => state.order);
  const { users } = useSelector((state) => state.user);


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const [totalOrders, setTotalOrders] = useState(null);
  const [totalBasePrice, setTotalBasePrice] = useState(0);
const [totalTaxAmount, setTotalTaxAmount] = useState(0);

// console.log(orders);

  const [genderCount, setGenderCount] = useState({
    male: 0,
    female: 0,
    others: 0,
  });

  const [userPercentage, setUserPercentage] = useState(0);
  const [adminPercentage, setAdminPercentage] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState({
    necklaces: 0,
    earrings: 0,
    rings: 0,
    pendants: 0,
    bracelets: 0,
  });


  useEffect(() => {
    dispatch(loadAllUser());
    dispatch(LoadAdminAllProducts());
    dispatch(LoadAllOrders());
  }, [dispatch]);


  useEffect(() => {
    let totalBasePrice = 0;
    let totalTax = 0;
   
  
    if (orders) {
      orders.orders.forEach((order) => {
        order.orderItems.forEach((item) => {
          totalBasePrice += item.product.basePrice * item.quantity;
          totalTax += (item.product.basePrice * item.quantity * item.product.tax) / 100;
          
        });
      });
    }
  
    setTotalBasePrice(totalBasePrice);
    setTotalTaxAmount(totalTax);
  }, [orders]);

    const profit=orders?.totalAmountOfAllOrders - (totalBasePrice+totalTaxAmount)
  
  

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
    }
  })

  useEffect(() => {
    const monthlyOrder = Array(12).fill(0);

    if (users && users.length > 0) {
      const GenderCount = { male: 0, female: 0, others: 0 };

      users.forEach((item) => {
        switch (item.gender) {
          case 'Male':
            GenderCount.male += 1;
            break;
          case 'Female':
            GenderCount.female += 1;
            break;
          case 'Others':
            GenderCount.others += 1;
            break;
          default:
            break;
        }
      });

      setGenderCount(GenderCount);

      const totalAdmins = users.filter((user) => user.role === 'admin').length;
      const totalUsers = users.length;

      const adminPercent = totalUsers > 0 ? (totalAdmins / totalUsers) * 100 : 0;
      const userPercent = 100 - adminPercentage;

      setAdminPercentage(adminPercent)
      setUserPercentage(userPercent)

    }

    if (orders && orders.orders?.length > 0) {
      orders.orders.forEach((item) => {
        const createdAt = new Date(item.createdAt);
        const month = createdAt.getMonth();
        monthlyOrder[month] += 1;
      });

      setTotalOrders({
        labels: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December',
        ],
        datasets: [
          {
            label: 'Monthly Orders',
            data: monthlyOrder,
            backgroundColor: '#3178C6',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [users, orders]);

  const categoryData = {
    labels: ['Necklaces', 'Earrings', 'Rings', 'Pendants', 'Bracelets'],
    datasets: [
      {
        data: [
          categoryCounts.necklaces,
          categoryCounts.earrings,
          categoryCounts.rings,
          categoryCounts.pendants,
          categoryCounts.bracelets,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };



  const genderData = [
    { label: 'Male', value: genderCount.male },
    { label: 'Female', value: genderCount.female },
    { label: 'Others', value: genderCount.others },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Navbar disableSearch={true} />
      <div className='w-full h-full grid grid-cols-12'>
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

        <div className={`md:col-span-10 h-full ${sidebarOpen ? ' hidden md:block' : 'col-span-12'}`}>
          {/* Header */}
          <div className="w-full h-16 md:h-24 text-xl md:text-2xl flex md:justify-center justify-between  items-center px-4 md:px-8 bg-blue-50 shadow-md">
            <h1 className="font-semibold text-center text-gray-800">Dashboard</h1>
            <button className="md:hidden" onClick={toggleSidebar}>
              <i className="ri-menu-line text-2xl text-gray-800"></i>
            </button>
          </div>

          {/* Total Amount */}
          <div className="h-auto w-full bg-blue-50 py-6">
            <div className="w-full h-24 bg-white flex justify-evenly items-center shadow-md rounded-lg mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
            <p className="text-center font-semibold text-gray-700">
                Total Profit <br />
                <div className="flex justify-center items-center text-xl font-bold text-[#2731C8]">
                  <FaRupeeSign />
                  {profit.toFixed(2)}
                </div>
              </p>

              <p className="text-center font-semibold text-gray-700">
                Total Amount Excl. Tax <br />
                <div className="flex justify-center items-center text-xl font-bold text-[#27a7a5]">
                  <FaRupeeSign />
                  {totalBasePrice.toFixed(2)}
                </div>
              </p>
              
              <p className="text-center font-semibold text-gray-700">
                Total TAX <br />
                <div className="flex justify-center items-center text-xl font-bold text-green-600">
                  <FaRupeeSign />
                  {totalTaxAmount.toFixed(2)}
                </div>
              </p>
            </div>

            {/* Summary Cards */}
            <div className="flex flex-wrap justify-evenly items-center mt-8 gap-6">
              {/* Users Card */}
              <div className="h-40 w-40 md:h-48 md:w-48 bg-indigo-500 flex flex-col items-center justify-center shadow-lg rounded-full transform hover:scale-105 transition duration-200 ease-in-out">
                <h1 className="text-lg md:text-2xl font-medium text-white">Users</h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  {numberOfUsers}
                </h2>
              </div>

              {/* Products Card */}
              <div className="h-40 w-40 md:h-48 md:w-48 bg-pink-500 flex flex-col items-center justify-center shadow-lg rounded-full transform hover:scale-105 transition duration-200 ease-in-out">
                <h1 className="text-lg md:text-2xl font-medium text-white">Products</h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  {totalNumberOfProducts}
                </h2>
              </div>

              {/* Orders Card */}
              <div className="h-40 w-40 md:h-48 md:w-48 bg-purple-500 flex flex-col items-center justify-center shadow-lg rounded-full transform hover:scale-105 transition duration-200 ease-in-out">
                <h1 className="text-lg md:text-2xl font-medium text-white">Orders</h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  {orders?.totalNoOfOrders}
                </h2>
              </div>
            </div>

          </div>


          {/* Charts Section */}
          <div className="flex flex-col w-full justify-evenly items-center gap-8 p-4 md:p-8 bg-blue-50 overflow-x-hidden">
            {/* Section 1: Pie Chart and Bar Chart */}
            <div className="flex flex-col md:flex-row w-full justify-evenly items-center gap-8 p-2 md:p-8 bg-blue-50">

              {/* Pie Chart Section */}
              <div className="w-full md:w-1/2 flex justify-center items-center">
                <div className="flex justify-center items-center h-[38vh] md:h-[40vh] lg:h-[50vh] w-full max-h-[60vh] bg-white rounded-lg shadow-md p-4">
                  <BasicPie data={genderData} />
                </div>
              </div>

              {/* Bar Chart Section */}
              <div className="w-full md:w-1/2">
                <div className="h-[28vh] md:h-[40vh] lg:h-[50vh] w-full max-h-[60vh] bg-white rounded-lg shadow-md p-4">
                  {totalOrders ? (
                    <Bar
                      key={JSON.stringify(totalOrders)}
                      data={totalOrders}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Orders Per Month' },
                          },
                          x: {
                            title: { display: true, text: 'Month' },
                          },
                        },
                      }}
                    />
                  ) : (
                    <p className="text-center text-gray-500">Loading chart...</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Progress Bars and Doughnut Chart */}
            <div className="flex flex-col md:flex-row w-full justify-evenly items-center gap-8 p-4 md:p-8">

              {/* Combined Single Progress Bar for Users and Admins with Mixed Colors */}
              <div className="w-full h-auto md:h-96 rounded-md shadow-lg flex flex-col justify-evenly items-center gap-8 p-4 bg-white">

                <div className="w-full">
                  <div className="text-center text-xl font-semibold text-gray-700">Users and Admins</div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">User-
                        {userPercentage.toFixed(2)}%
                      </span>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">Admin- 
                        {adminPercentage.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-6">
                        <div
                          className="h-6 bg-gradient-to-r rounded-full transition-all duration-300 ease-in-out"
                          style={{
                            width: `${userPercentage + adminPercentage}%`,
                            background: `linear-gradient(to right, #3b82f6 ${userPercentage}%, #FB7495 ${userPercentage}%, #FB7495 ${userPercentage + adminPercentage}%)`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>


              {/* Doughnut Chart */}
              <div className="h-auto md:h-[55vh] w-full max-h-[60vh] bg-white rounded-lg shadow-md p-4">
                <Doughnut
                  data={categoryData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: function (tooltipItem) {
                            const dataset = tooltipItem.dataset.data;
                            const total = dataset.reduce((sum, value) => sum + value, 0);
                            const value = dataset[tooltipItem.dataIndex];
                            const percentage = ((value / total) * 100).toFixed(2);
                            return `${tooltipItem.label}: ${value} (${percentage}%)`;
                          },
                        },
                      },
                    },
                  }}
                  style={{ height: '300px', width: '100%' }}
                />
              </div>
            </div>
          </div>

        </div>

      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

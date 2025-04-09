import React, { useEffect, useState } from 'react';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import AdminSidebar from '../Layouts/AdminSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { LoadAllOrders } from '../../Actions/Order';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { loadAllUser } from '../../Actions/User';
import { FaArrowLeft } from 'react-icons/fa';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [monthData, setMonthData] = useState(null);
  const [totalOrders, setTotalOrders] = useState(null)
  const [userData, setUserData] = useState(null);

  const { orders } = useSelector((state) => state.order);
  const { users } = useSelector((state) => state.user)




  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadAllOrders());
    dispatch(loadAllUser())
  }, [dispatch]);

  useEffect(() => {
    const currYear = new Date().getFullYear();
    const prevYear = currYear - 1;

    const revenuesMonth = Array(12).fill(0);
    const ordersCurrYear = Array(12).fill(0);
    const ordersPrevYear = Array(12).fill(0);
    const userCounts = Array(12).fill(0);

    if (orders && orders?.orders?.length > 0) {
      orders.orders.forEach((item) => {
        const createdAt = new Date(item.createdAt);
        const month = createdAt.getMonth();
        const year = createdAt.getFullYear();

        revenuesMonth[month] += item.totalAmount;

        if (year === currYear) {
          ordersCurrYear[month] += 1;
        } else if (year === prevYear) {
          ordersPrevYear[month] += 1;
        }
      });

      setMonthData({
        labels: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December',
        ],
        datasets: [
          {
            label: 'Monthly Revenue',
            data: revenuesMonth,
            backgroundColor: '#02B2AF',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });

      setTotalOrders({
        labels: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December',
        ],
        datasets: [
          {
            label: `Orders (${currYear})`,
            data: ordersCurrYear,
            backgroundColor: '#FF6384',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: `Orders (${prevYear})`,
            data: ordersPrevYear,
            backgroundColor: '#36A2EB',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      });
    }

    if (users && users.length > 0) {
      users.forEach((user) => {
        const month = new Date(user.createdAt).getMonth();
        userCounts[month] += 1;
      });

      setUserData({
        labels: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December',
        ],
        datasets: [
          {
            label: 'Monthly Users Signups',
            data: userCounts,
            backgroundColor: '#B800D8',
            borderColor: '#388E3C',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [orders, users]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      
          <div className='h-full mx-8 pb-10'>
            <div id="barCharts" className='pb-8'>
              <div className='h-80 w-full bg-white rounded-md shadow-md'>
                {monthData && monthData.datasets[0].data.some((value) => value > 0) ? (
                  <>
                    <Bar
                      key={JSON.stringify(monthData)}
                      data={monthData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Revenue (INR)' },
                          },
                          x: {
                            title: { display: true, text: 'Month' },
                          },
                        },
                      }}
                      style={{ height: '100%', width: '100%' }}
                    />
                    <h1 className='text-center text-2xl mt-6 font-medium'>Monthly Revenue</h1>
                  </>
                ) : (
                    <div>
                      <h1 className='text-center text-2xl pt-8 mb-10 font-medium'>Monthly Revenue</h1>
                      <p className='text-center text-gray-500'>No data available right now.</p>
                    </div>
                )}
              </div>

              <div className='h-80 w-full mt-16 bg-white rounded-md shadow-md'>
                {totalOrders && totalOrders.datasets.some(dataset => dataset.data.some((value) => value > 0)) ? (
                  <>
                    <Bar
                      key={JSON.stringify(totalOrders)}
                      data={totalOrders}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Number of Orders' },
                          },
                          x: {
                            title: { display: true, text: 'Month' },
                          },
                        },
                      }}
                      style={{ height: '100%', width: '100%' }}
                    />
                    <h1 className='text-center text-2xl mt-6 font-medium'>Orders Throughout The Year</h1>
                  </>
                ) : (
                  <div>
                      <h1 className='text-center text-2xl pt-8 mb-10 font-medium'>Orders Throughout The Year</h1>
                      <p className='text-center text-gray-500'>No data available right now.</p>
                    </div>
                )}
              </div>

              <div className='h-80 w-full mt-16 bg-white rounded-md shadow-md'>
                {userData && userData.datasets[0].data.some((value) => value > 0) ? (
                  <>
                    <Bar
                      key={JSON.stringify(userData)}
                      data={userData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Number of Users' },
                          },
                          x: {
                            title: { display: true, text: 'Month' },
                          },
                        },
                      }}
                      style={{ height: '100%', width: '100%' }}
                    />
                    <h1 className='text-center text-2xl mt-6 font-medium'>Users Throughout The Year</h1>
                  </>
                ) : (
                  <div>
                  <h1 className='text-center text-2xl pt-8 mb-10 font-medium'>Users Throughout The Year</h1>
                  <p className='text-center text-gray-500'>No data available right now.</p>
                </div>
                )}
              </div>



            </div>
          </div>
    </>
  );
};

export default BarChart;

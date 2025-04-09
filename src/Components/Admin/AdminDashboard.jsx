import * as React from 'react';
import Navbar from '../Layouts/Navbar';
import AdminSidebar from '../Layouts/AdminSidebar';
import Footer from '../Layouts/Footer';
import { FaCalculator } from 'react-icons/fa';
import { AiFillLayout } from 'react-icons/ai';
import { FaArrowLeft } from 'react-icons/fa';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import Dashboard from './Dashboard';
import AllUser from './AllUsers';
import AllProducts from './AllProducts';
import AllOrders from './AllOrders';
import AllReviews from './AllReviews';
import ChangeLayout from './ChangeLayout';
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import GSTCalculator from './GstCalculator';
import BasePriceCalculator from './BasePriceCal';
import MyProfile from '../User/MyProfile';
import UpdatePassword from '../User/UpdatePassword';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(() => {
    const savedTab = localStorage.getItem('activeTab');
    return savedTab || "My Profile";
  });

  // Save the active tab to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const adminTabs = [
    { id: 'Dashboard', label: 'Dashboard', section: 'dashboard', logo: <DashboardIcon /> },
    { id: 'Users', label: 'Users', section: 'dashboard', logo: <PeopleIcon /> },
    { id: 'Products', label: 'Products', section: 'dashboard', logo: <InventoryIcon /> },
    { id: 'Orders', label: 'Orders', section: 'dashboard', logo: <ShoppingCartIcon /> },
    { id: 'Reviews', label: 'Reviews', section: 'dashboard', logo: <RateReviewIcon /> },
    { id: 'My Profile', label: 'My Profile', section: 'account', logo: <PersonIcon /> },
    { id: 'Update Password', label: 'Update Password', section: 'account', logo: <KeyIcon /> },
    { id: 'Layout', label: 'Layout', section: 'layout', logo: <AiFillLayout /> },
    { id: 'Piechart', label: 'Pie', section: 'graphs', logo: <PieChartIcon /> },
    { id: 'Barchart', label: 'Bar', section: 'graphs', logo: <BarChartIcon /> },
    { id: 'Linechart', label: 'Line', section: 'graphs', logo: <TimelineIcon /> },
    { id: 'GST', label: 'TAX Calculator', section: 'feature', logo: <FaCalculator /> },
    { id: 'Baseprice', label: 'Base Price', section: 'feature', logo: <FaCalculator /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Users":
        return <AllUser />;
      case "Products":
        return <AllProducts />;
      case "Orders":
        return <AllOrders />;
      case "Reviews":
        return <AllReviews />;
      case "My Profile":
        return <MyProfile />;
      case "Update Password":
        return <UpdatePassword />;
      case "Layout":
        return <ChangeLayout />;
      case "Piechart":
        return <PieChart />;
      case "Barchart":
        return <BarChart />;
      case "Linechart":
        return <LineChart />;
      case "GST":
        return <GSTCalculator />;
      case "Baseprice":
        return <BasePriceCalculator />;
      default:
        return <Dashboard />;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar disableSearch={true} />
      
      <div className="flex-grow flex flex-col lg:flex-row bg-blue-50">
        
        {/* Sidebar for mobile - when open it covers the entire screen */}
        <div 
          className={`fixed inset-0 z-40 bg-white lg:relative lg:w-1/5 transition-transform transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
        >
          <div className="relative h-full">
            <AdminSidebar 
              tabs={adminTabs} 
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
        </div>

        {/* Main content area */}
        <div className={`flex-grow lg:w-4/5 ${sidebarOpen ? 'hidden lg:block' : 'block'}`}>
          {/* Header for the active tab */}
          <div className="bg-blue-50 w-full h-16 md:h-24 text-xl md:text-3xl flex justify-between lg:justify-center items-center px-4">
            <h1 className="font-bold text-center">{activeTab}</h1>
            <button className="lg:hidden" onClick={toggleSidebar}>
              <i className="ri-menu-line text-2xl"></i>
            </button>
          </div>
          
    
          <div className="p-4 overflow-auto">
            {renderContent()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
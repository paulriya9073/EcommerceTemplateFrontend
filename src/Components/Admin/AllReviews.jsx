import * as React from 'react';
import Navbar from '../Layouts/Navbar';
import AdminSidebar from '../Layouts/AdminSidebar';
import Footer from '../Layouts/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadAdminAllProducts } from '../../Actions/Product';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { FaArrowLeft, FaEye } from 'react-icons/fa';

const AllReviews = () => {
  const { products } = useSelector((state) => state.product);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [visibleAllProducts, setVisibleAllProducts] = React.useState(8)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(LoadAdminAllProducts());
  }, [dispatch]);

  const loadMoreProducts = () => {
    setVisibleAllProducts((prev) => prev + 4)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* reviews */}
          <div className='h-full lg:mx-8 pb-8'>
            <div className="w-full border border-gray-300 rounded-lg shadow-md bg-white">
              <div className='grid grid-cols-4 h-20 w-full justify-items-center items-center text-[.7rem] lg:text-xl shadow-md font-semibold px-2'>
                <div>Product Name</div>
                <div>Rating</div>
                <div>Total Reviews</div>
                <div>Details</div>
              </div>
              {products && Object.values(products).slice(0, visibleAllProducts).map((p) => (
                <div key={p._id} className='grid grid-cols-4 h-20 w-full justify-items-center items-center text-[.7rem] lg:text-xl px-4 border-t border-gray-300'>
                  <div>
                    <span className="hidden text-center lg:block">{p.productName}</span>
                    <span className="lg:hidden text-center">{`${p.productName.slice(0, 12)}...`}</span>
                  </div>
                  <div>{p.ratings}</div>
                  <div>{p.numOfReviews}</div>
                  <div className=''>
                    <button className='bg-blue-200  text-blue-600 py-1 px-4 rounded-md hover:bg-blue-300 transition-colors duration-300' onClick={() => navigate(`/product/${p._id}`)}><FaEye /></button>

                  </div>
                </div>
              ))}
            </div>
            <div className='mt-5 flex justify-center items-center'>
              {products?.length > visibleAllProducts && (
                <button onClick={loadMoreProducts} className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600'>Load More</button>
              )}
            </div>
          </div>
    </>
  );
};

export default AllReviews;

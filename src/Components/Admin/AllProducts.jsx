import React, { useEffect, useState } from 'react';
import Navbar from '../Layouts/Navbar';
import AdminSidebar from '../Layouts/AdminSidebar';
import Footer from '../Layouts/Footer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, LoadAdminAllProducts } from '../../Actions/Product';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

const AllProducts = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const { products } = useSelector((state) => state.product);

  const [visibleAllProducts, setVisibleAllProducts] = useState(8)

  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    dispatch(LoadAdminAllProducts());
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
    toast.success('Product Deleted!');
  };

  const loadMoreProducts = () => {
    setVisibleAllProducts((prev) => prev + 4)
  }

  return (
    <>
      <Navbar disableSearch={true} />
      <div className="w-full h-auto grid grid-cols-12 bg-blue-50">
      <aside
          className={`fixed top-0 left-0 z-40 w-full h-full bg-white transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:col-span-2`}
        >
          <div className="relative">
            <AdminSidebar />
            <button
              className="absolute top-4 right-4 md:hidden text-black text-2xl p-2 rounded-full"
              onClick={toggleSidebar}
            >
            <FaArrowLeft/>
            </button>
          </div>
        </aside>
        <div
          className={`md:col-span-10 h-full ${sidebarOpen ? 'hidden md:block' : 'col-span-12'
            }`}
        >
          <div className="w-full h-16 md:h-24 text-xl md:text-3xl flex justify-center items-center">
            <h1 className="px-4 font-bold">Products</h1>
            <button className="md:hidden ml-auto mr-4" onClick={toggleSidebar}>
              <i className="ri-menu-line text-2xl"></i>
            </button>
          </div>
          <div className="mx-8 pb-8">
            <Link
              to="/admin/newproduct"
              className="w-full h-22 md:h-44 bg-white rounded-md flex flex-col justify-center items-center md:gap-2 p-2 shadow-md"
            >
              <h1 className="text-[1rem] md:text-xl font-medium">Create Product</h1>
              <i className="ri-add-circle-line text-2xl md:text-5xl"></i>
            </Link>
            <div className="w-full h-16 md:h-24 text-xl md:text-2xl flex justify-center items-center">
              <h1 className="font-bold">All Products</h1>
            </div>
            <div className="w-full border border-gray-300 bg-white rounded-lg">
              <div className="details grid grid-cols-6 h-20 w-full justify-items-center items-center text-[.7rem] md:text-xl shadow-md font-medium">
                <div className="text-left px-4">Product Image</div>
                <div className="text-left px-4">Product Name</div>
                <div>Price</div>
                <div>Category</div>
                <div>Stock</div>
                <div>Action</div>
              </div>
              {products &&
                Object.values(products).slice(0, visibleAllProducts).map((p) => (
                  <div
                    key={p._id}
                    className="grid grid-cols-6 h-20 w-full justify-items-center items-center text-[.7rem] md:text-xl px-4 border-t border-gray-300"
                  >
                    <div>
                      <img
                        src={p.images && p.images[0]?.url}
                        alt={p.productName}
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <span className="hidden md:block">{p.productName}</span>
                      <span className="md:hidden">{`${p.productName.slice(0, 12)}...`}</span>
                    </div>
                    <div>{p.price}</div>
                    <div>{p.category}</div>
                    <div>{p.stock}</div>
                    <div className="flex gap-2 flex-row items-center">
                      <Link
                        to={`/admin/product/${p._id}`}
                        className="p-2 bg-blue-100 rounded-md"
                      >
                        <i className="ri-pencil-line text-blue-600 text-xl md:text-2xl"></i>
                      </Link>
                      <button
                        onClick={() => deleteHandler(p._id)}
                        className="p-2 bg-red-100 rounded-md"
                      >
                        <i className="ri-delete-bin-line text-red-600 text-xl md:text-2xl"></i>
                      </button>
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;

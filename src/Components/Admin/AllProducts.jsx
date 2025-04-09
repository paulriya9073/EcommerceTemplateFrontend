import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, LoadAdminAllProducts, LoadSingleProduct } from '../../Actions/Product';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import DeleteModal from '../Layouts/DeleteModal';
import ProductModal from './ProductModal';


const AllProducts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visibleAllProducts, setVisibleAllProducts] = useState(8);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  
  // New states for product modal
  const [showProductModal, setShowProductModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [currentProduct, setCurrentProduct] = useState(null);

  const { products, product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    dispatch(LoadAdminAllProducts());
  }, [dispatch]);

  const deleteProductHandler = () => {
    if (!productToDelete) return;
    dispatch(deleteProduct(productToDelete));
    toast.success('Product Deleted!');
    setProductToDelete(null);
    closeDeleteModal();
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const loadMoreProducts = () => {
    setVisibleAllProducts((prev) => prev + 4);
  };

  // Functions for product modal
  const openCreateModal = () => {
    setModalMode('create');
    setCurrentProduct(null);
    setShowProductModal(true);
  };

  const openEditModal = (productId) => {
    setModalMode('edit');
    dispatch(LoadSingleProduct(productId));
    setCurrentProduct(product);
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setCurrentProduct(null);
  };

  // Update current product when product data is loaded
  useEffect(() => {
    if (modalMode === 'edit' && product) {
      setCurrentProduct(product);
    }
  }, [product, modalMode]);

  return (
    <>
      {/* all products */}
      <div className="h-full lg:mx-8 pb-8">
        <button
          onClick={openCreateModal}
          className="w-full h-22 md:h-44 bg-white rounded-md flex flex-col justify-center items-center md:gap-2 p-2 shadow-md cursor-pointer"
        >
          <h1 className="text-[1rem] md:text-xl font-medium">Create Product</h1>
          <i className="ri-add-circle-line text-2xl md:text-5xl"></i>
        </button>
        
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
                className="grid grid-cols-6 h-24 w-full justify-items-center items-center text-[.7rem] lg:text-xl px-4 border-t border-gray-300"
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
                  <button
                    onClick={() => openEditModal(p._id)}
                    className="p-2 bg-blue-100 rounded-md"
                  >
                    <i className="ri-pencil-line text-blue-600 text-xl md:text-2xl"></i>
                  </button>
                  <button
                    onClick={() => {
                      setProductToDelete(p._id);
                      openDeleteModal();
                    }}
                    className="p-2 bg-red-100 rounded-md"
                  >
                    <i className="ri-delete-bin-line text-red-600 text-xl md:text-2xl"></i>
                  </button>
                </div>
              </div>
            ))}
        </div>
        
        <div className="mt-5 flex justify-center items-center">
          {products?.length > visibleAllProducts && (
            <button 
              onClick={loadMoreProducts} 
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Load More
            </button>
          )}
        </div>
      </div>

      {/* Product Modal - For both create and edit */}
      <ProductModal 
        isOpen={showProductModal}
        onClose={closeProductModal}
        product={currentProduct}
        mode={modalMode}
      />

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal 
          heading="Delete Product"
          title1="Are you sure you want to delete this product?" 
          title2="This action cannot be undone and all data of this product will be permanently deleted." 
          onClose={closeDeleteModal}
          deleteHandler={deleteProductHandler}
          buttonName="Delete Product"
        />
      )}
    </>
  );
};

export default AllProducts;
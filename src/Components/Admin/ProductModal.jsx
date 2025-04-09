import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaTag, FaDollarSign, FaPen, FaList, FaBox, FaImages, FaRupeeSign, FaPercent } from 'react-icons/fa';
import { createProduct, updateProduct } from '../../Actions/Product';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ProductModal = ({ isOpen, onClose, product, mode }) => {
  const [productName, setProductName] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [tax, setTax] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();

  // Categories list
  const categories = [
    'Necklaces',
    'Earrings',
    'Rings',
    'Pendants',
    'Bracelets',
  ];

  // Fill form with product data when editing
  useEffect(() => {
    if (mode === 'edit' && product) {
      setProductName(product.productName || '');
      setDescription(product.description || '');
      setBasePrice(product.basePrice || '');
      setTax(product.tax || '');
      setPrice(product.price || '');
      setStock(product.stock || '');
      setCategory(product.category || '');

      if (product.images && product.images.length > 0) {
        setImagesPreview(product.images.map((img) => img.url));
      }
    } else {
      // Reset form for create mode
      setProductName('');
      setDescription('');
      setBasePrice('');
      setTax('');
      setPrice('');
      setStock('');
      setCategory('');
      setImages([]);
      setImagesPreview([]);
    }
  }, [product, mode, isOpen]);

  // Calculate price based on base price and tax
  useEffect(() => {
    const basePriceValue = parseFloat(basePrice) || 0;
    const taxPercentage = parseFloat(tax) || 0;
    const taxAmount = (basePriceValue * taxPercentage) / 100;
    const computedPrice = basePriceValue + taxAmount;
    const finalPrice = computedPrice % 1 < 0.5 
      ? Math.floor(computedPrice) 
      : Math.ceil(computedPrice);

    setPrice(finalPrice);
  }, [basePrice, tax]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagesPreview((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('basePrice', basePrice);
    formData.append('tax', tax);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('category', category);
    
    images.forEach((image) => {
      formData.append('images', image);
    });

    if (mode === 'create') {
      dispatch(createProduct(formData));
      toast.success("Product Created!");
    } else {
      dispatch(updateProduct(product._id, formData));
      toast.success("Product Updated!");
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg max-h-90vh overflow-y-auto">
        <form className="p-6" onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1 text-center">
              <h2 className="text-2xl font-semibold">
                {mode === 'create' ? 'Create Product' : 'Update Product'}
              </h2>
            </div>
            <button 
              type="button" 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form Fields - Two columns on desktop */}
          <div className="md:grid md:grid-cols-2 md:gap-6">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              {/* Product Name */}
              <div className="relative flex items-center">
                <FaTag className="absolute left-3 text-blue-600" />
                <input
                  className="pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
                  type="text"
                  placeholder="Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="relative flex items-center">
                <FaPen className="absolute left-3 text-blue-600" />
                <input
                  className="pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  required
                />
              </div>

              {/* Base Price */}
              <div className="relative flex items-center">
                <FaRupeeSign className="absolute left-3 text-blue-600" />
                <input
                  className="pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
                  type="number"
                  value={basePrice}
                  placeholder="Base Price"
                  required
                  onChange={(e) => setBasePrice(e.target.value)}
                />
              </div>

              {/* Tax */}
              <div className="relative flex items-center">
                <FaPercent className="absolute left-3 text-blue-600" />
                <input
                  className="pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
                  type="number"
                  value={tax}
                  placeholder="Tax (%)"
                  required
                  onChange={(e) => setTax(e.target.value)}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4 mt-4 md:mt-0">
              {/* Price */}
              <div className="relative flex items-center">
                <FaRupeeSign className="absolute left-3 text-blue-600" />
                <input
                  className="pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
                  type="text"
                  value={price}
                  placeholder="Price"
                  readOnly
                />
              </div>

              {/* Stock */}
              <div className="relative flex items-center">
                <FaBox className="absolute left-3 text-blue-600" />
                <input
                  className="pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
                  type="number"
                  value={stock}
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="relative flex items-center">
                <FaList className="absolute left-3 text-blue-600" />
                <select
                  className="pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  required
                >
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload */}
              <div className="relative flex items-center">
                <FaImages className="absolute left-3 text-blue-600" />
                <input
                  className="pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  required={mode === 'create'}
                />
              </div>
            </div>
          </div>

          {/* Image Previews - Full width */}
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            {imagesPreview.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt="Preview" 
                className="w-20 h-20 object-cover rounded-md border border-gray-300 transform transition-transform duration-300 hover:scale-105" 
              />
            ))}
          </div>

          {/* Action Buttons - Full width */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full max-w-xs p-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full max-w-xs p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              {mode === 'create' ? 'Create' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
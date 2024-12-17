import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from "/logo.png";
import { createProduct } from '../../Actions/Product';
import { FaTag, FaDollarSign, FaPen, FaList, FaBox, FaImages, FaRupeeSign, FaPercent } from 'react-icons/fa';
import toast from 'react-hot-toast';

const CreateProduct = () => {
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
  const navigate = useNavigate();

  // Update price dynamically when basePrice or tax changes
  useEffect(() => {
    const basePriceValue = parseFloat(basePrice) || 0;
    const taxPercentage = parseFloat(tax) || 0;

    // Calculate the tax amount
    const taxAmount = (basePriceValue * taxPercentage) / 100;
    

    // Calculate the total price (base price + tax amount)
    const computedPrice = basePriceValue + taxAmount;
const finalPrice = computedPrice % 1 < 0.5 
  ? Math.floor(computedPrice) 
  : Math.ceil(computedPrice);
   
    setPrice(finalPrice);
  }, [basePrice, tax]);


  const categories = [
    'Necklaces',
    'Earrings',
    'Rings',
    'Pendants',
    'Bracelets',
  ];


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

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('basePrice',basePrice)
    formData.append('tax',tax)
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('category', category);
    images.forEach((image) => {
      formData.append('images', image);
    });

    dispatch(createProduct(formData));
    toast.success("Product Created!!");
    navigate("/admin/dashboard/products");
  };

  
  return (
    <>
      <div id='main' className='flex flex-col bg-blue-50 justify-center h-full'>
        <div id='logo' className='w-full h-28 flex justify-center'>
          <Link to="/">
            <img className='w-36 h-20 md:w-48 md:h-28' src={logo} />
          </Link>
        </div>

        <div className='h-full w-full flex justify-center items-center p-2'>
          <form className='bg-white h-auto w-72 md:w-96 p-4 rounded-lg shadow-lg' onSubmit={submitHandler}>
            <div className='text-center mb-6'>
              <h1 className='text-xl font-semibold'>Create Product</h1>
            </div>

            <div className='flex flex-col gap-5'>
              {/* Product Name */}
              <div className='relative flex items-center'>
                <FaTag className='absolute left-3 text-gray-500' />
                <input
                  className='pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full'
                  type="text"
                  placeholder='Product Name'
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className='relative flex items-center'>
                <FaPen className='absolute left-3 text-gray-500' />
                <input
                  className='pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full'
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Description'
                  required
                />
              </div>

              {/* Base Price */}
              <div className='relative flex items-center'>
                <FaRupeeSign className='absolute left-3 text-gray-500' />
                <input
                  className='pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full'
                  type="number"
                  value={basePrice}
                  placeholder='Base Price'
                  required
                  onChange={(e) => setBasePrice(e.target.value)}
                />
              </div>

              {/* Tax */}
              <div className='relative flex items-center'>
                <FaPercent className='absolute left-3 text-gray-500' />
                <input
                  className='pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full'
                  type="number"
                  value={tax}
                  placeholder='Tax (%)'
                  required
                  onChange={(e) => setTax(e.target.value)}
                />
              </div>

              {/* Price */}
              <div className='relative flex items-center'>
                <FaRupeeSign className='absolute left-3 text-gray-500' />
                <input
                  className='pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full'
                  type="text"
                  value={price}
                  placeholder='Price'
                  readOnly
                />
              </div>

              {/* Stock */}
              <div className='relative flex items-center'>
                <FaBox className='absolute left-3 text-gray-500' />
                <input
                  className='pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full'
                  type="number"
                  value={stock}
                  placeholder='Stock'
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              {/* Category */}
              <div className='relative flex items-center'>
                <FaList className='absolute left-3 text-gray-500' />
                <select
                  className='pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full'
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
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
              <div className='relative flex items-center'>
                <FaImages className='absolute left-3 text-gray-500' />
                <input
                  className='pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full'
                  type="file"
                  accept='image/*'
                  multiple
                  onChange={handleImageChange}
                  required
                />
              </div>

              {/* Image Previews */}
              <div className='flex flex-wrap gap-3 justify-center mt-3'>
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Preview" className='w-20 h-20 object-cover rounded-md border border-gray-300 transform transition-transform duration-300 hover:scale-105' />
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className='mt-5 w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition'
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;

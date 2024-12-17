import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaTag, FaDollarSign, FaPen, FaList, FaBox, FaImages, FaRupeeSign, FaClipboard, FaPercentage, FaPercent } from 'react-icons/fa';
import logo from '/logo.png';
import { LoadSingleProduct, updateProduct } from '../../Actions/Product';
import toast from 'react-hot-toast';

const UpdateProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [tax, setTax] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { id } = useParams();
  const { product } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(LoadSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setProductName(product.productName || '');
      setDescription(product.description || '');
      setPrice(product.price || '');
      setBasePrice(product.basePrice || '')
      setTax(product.tax || '')
      setStock(product.stock || '');
      setCategory(product.category || '');

      if (product.images && product.images.length > 0) {
        setImagesPreview(product.images.map((img) => img.url));
      }
    }
  }, [product]);

  
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

    // Generate previews
    const previewArray = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewArray.push(reader.result);
        setImagesPreview([...previewArray]);
      };
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('basePrice',basePrice)
    formData.append('tax',tax)
    formData.append('stock', stock);
    formData.append('category', category);

    images.forEach((image) => {
      formData.append('images', image);
    });

    dispatch(updateProduct(id, formData));
    toast.success("Product Updated!");
    navigate('/admin/dashboard/products');
  };

  const cancelHandler = () => {
    navigate('/admin/dashboard/products');
  };

  return (
    <div id="main" className="flex flex-col justify-center h-full bg-blue-50">
      <div id="logo" className="w-full h-28 flex justify-center">
        <Link to="/">
          <img className="w-36 h-20 md:w-48 md:h-28" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="h-full w-full flex justify-center items-center p-2">
        <form
          className="bg-white h-auto w-72 md:w-96 p-4 rounded-lg shadow-lg"
          onSubmit={submitHandler}
        >
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold">Update Product</h1>
          </div>

          <div className="flex flex-col gap-5">
            {/* Product Name */}
            <div className="relative flex items-center">
              <FaTag className="absolute left-3 text-gray-500" />
              <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className='pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full'
              />
            </div>

            {/* Description */}
            <div className="relative flex items-center">
              <FaPen className="absolute left-3 text-gray-500" />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                 className='pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full'
              />
            </div>

            {/* Base Price */}
            <div className="relative flex items-center">
              <FaRupeeSign className="absolute left-3 text-gray-500" />
              <input
                type="number"
                placeholder="Base Price"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                 className='pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full'
              />
            </div>

            {/* Tax */}
            <div className="relative flex items-center">
              <FaPercent className="absolute left-3 text-gray-500" />
              <input
                type="number"
                placeholder="Tax (%)"
                value={tax}
                onChange={(e) => setTax(e.target.value)}
                 className='pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full'
              />
            </div>

            {/* Price */}
            <div className="relative flex items-center">
              <FaRupeeSign className="absolute left-3 text-gray-500" />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                 className='pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full'
              />
            </div>

            {/* Stock */}
            <div className="relative flex items-center">
              <FaBox className="absolute left-3 text-gray-500" />
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                 className='pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full'
              />
            </div>

            {/* Category */}
            <div className="relative flex items-center">
              <FaList className="absolute left-3 text-gray-500" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                 className='pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full'
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
              <FaImages className="absolute left-3 text-gray-500" />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                 className='pl-10 p-3 border rounded-md border-blue-300 focus:outline-none focus:ring-2 bg-blue-50 focus:ring-blue-500 transition-all w-full'
              />
            </div>

            {/* Image Previews */}
            <div className="flex flex-wrap gap-3 justify-center mt-3">
              {imagesPreview.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Preview"
                  className='w-20 h-20 object-cover rounded-md border border-gray-300 transform transition-transform duration-300 hover:scale-105'
                />
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center gap-5">
              <button
                type="submit"
                className="mt-5 w-28 p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              >
                Save
              </button>
              <button
                onClick={cancelHandler}
                className="mt-5 w-28 p-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;

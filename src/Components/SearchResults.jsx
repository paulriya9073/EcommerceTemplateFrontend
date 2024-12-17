import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { SearchProducts } from '../Actions/Product';
import ProductCard from './Layouts/ProductCard';
import Navbar from './Layouts/Navbar';
import Footer from './Layouts/Footer';

const SearchResults = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const { products } = useSelector((state) => state.product);

  const [visibleProducts, setVisibleProducts] = useState(8);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]); 

  useEffect(() => {
    dispatch(SearchProducts({ keyword: keyword ? keyword : '' }));
  }, [dispatch, keyword]);

  useEffect(() => {
    let filtered = products || [];

    switch (selectedPriceRange) {
      case 'under100':
        filtered = products.filter((product) => product.price < 1000);
        break;
      case '1000to3000':
        filtered = products.filter((product) => product.price >= 1000 && product.price <= 3000);
        break;
      case '3000to7000':
        filtered = products.filter((product) => product.price > 3000 && product.price <= 7000);
        break;
      case '7000to10000':
        filtered = products.filter((product) => product.price > 7000 && product.price <= 10000);
        break;
      case '10000plus':
        filtered = products.filter((product) => product.price > 10000);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedPriceRange]);

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 4);
  };

  return (
    <>
      <Navbar />
      <div className="container px-4 bg-blue-50">
        <h1 className="text-2xl md:text-3xl font-bold my-4 text-center">
          {keyword ? `Search Results for "${keyword}"` : 'All Products'}
        </h1>

        {/* Price Filter Dropdown */}
        <div className="p-6 rounded-xl mb-6">
          <h2 className="text-black text-center text-lg font-semibold mb-4">Filter by Price</h2>
          <div className="flex justify-center items-center">
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="text-black py-2 px-4 rounded-lg shadow-md"
            >
              <option value="all">All Prices</option>
              <option value="under100">Under ₹1000</option>
              <option value="1000to3000">₹1000 - ₹3000</option>
              <option value="3000to7000">₹3000 - ₹7000</option>
              <option value="7000to10000">₹7000 - ₹10000</option>
              <option value="10000plus">₹10000+</option>
            </select>
          </div>
        </div>

        {/* Display filtered products */}
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center md:px-10">
            {filteredProducts.slice(0, visibleProducts).map((p) => (
              <div key={p._id}>
                <ProductCard
                  id={p._id}
                  productName={p.productName}
                  price={p.price}
                  ratings={p.ratings}
                  numOfReviews={p.numOfReviews}
                  images={p.images[0].url}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg mt-10">
            No products found
          </p>
        )}
      </div>

      <div className="bg-blue-50 py-6 flex justify-center items-center">
        {Array.isArray(filteredProducts) && filteredProducts.length > visibleProducts && (
          <button
            onClick={loadMoreProducts}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Load More
          </button>
        )}
      </div>

      <Footer />
    </>
  );
};

export default SearchResults;

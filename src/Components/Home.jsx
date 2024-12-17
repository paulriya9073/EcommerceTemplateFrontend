import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadAllProducts } from '../Actions/Product';
import Navbar from './Layouts/Navbar';
import Footer from './Layouts/Footer';
import Slider from './Layouts/Slider';
import ProductCard from './Layouts/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [loading, setLoading] = useState(true);

  const { products, productCount } = useSelector((state) => state.product);


  useEffect(() => {
    dispatch(LoadAllProducts());
    setLoading(false);
  }, [dispatch]);

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 4);
  };

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <div className="loader border-t-4 border-b-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
    </div>
  ) : (
    <>
      <Navbar />
      <div id="Home" className="h-full bg-blue-50">
        <div id="slider">
          <Slider/>
        </div>
        <div className="h-full grid grid-cols-12">
          <div className="col-span-1"></div>
          <div className="col-span-10 py-5">
            <div className="h-auto grid md:grid-cols-4 grid-cols-2 gap-5">
              {products &&
                Object.values(products)
                  .slice(0, visibleProducts)
                  .map((p) => (
                    <ProductCard
                      key={p._id}
                      id={p._id}
                      productName={p.productName}
                      price={p.price}
                      ratings={p.ratings}
                      numOfReviews={p.numOfReviews}
                      images={p.images[0]?.url}
                    />
                  ))}
            </div>
            <div className="mt-5 flex justify-center items-center">
              {products?.length > visibleProducts && (
                <button
                  onClick={loadMoreProducts}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                >
                  Load More
                </button>
              )}
            </div>
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;

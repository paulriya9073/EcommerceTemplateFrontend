import React, { useEffect, useState } from 'react';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import AdminSidebar from '../Layouts/AdminSidebar';
import { FaArrowLeft, FaDumpster } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreateSliderImg, DeleteAdminImages, LoadAdminImages, UploadLogo } from '../../Actions/AdminImg';
import { loadUser } from '../../Actions/User';
import toast from 'react-hot-toast';

const ChangeLayout = () => {
  const { user } = useSelector((state) => state.user);
  const { adminImages } = useSelector((status) => status.adminImg);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(LoadAdminImages());
  }, [dispatch]);


  const [logo, setLogo] = useState('');
  const [sliderImages, setSliderImages] = useState([]);

  const navigate = useNavigate();

  const handleLogo = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e) => {
    e.preventDefault();

    if (logo) {
      const formData = new FormData();
      const blob = new Blob([logo], { type: 'image/*' });
      formData.append('logoImg', blob, 'logo.png');

      dispatch(UploadLogo(formData));
      toast.success('Logo Updated!');
    }
  };


  const handleSliderImages = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSliderImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSliderUpload = (e) => {
    e.preventDefault();

    if (sliderImages.length > 0) {
      const formData = new FormData();
      sliderImages.forEach((image, index) => {
        const blob = new Blob([image], { type: 'image/*' });
        formData.append(`sliderImg`, blob, 'logo.png');
      });

      dispatch(CreateSliderImg(formData));
      toast.success('Slider Images Updated!');
    }
  };

  const handleCancelImage = (index) => {
    const updatedImages = sliderImages.filter((_, i) => i !== index);
    setSliderImages(updatedImages);
  };

  const handleDeleteImage=(publicId)=>{
    dispatch(DeleteAdminImages(publicId))
    toast.success("Image Deleted!")
    
  }


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Navbar disableSearch={true} />
      <div className="w-full h-auto grid grid-cols-12 bg-blue-50">
        <aside
          className={`fixed top-0 left-0 z-40 w-full h-full bg-white transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:static md:translate-x-0 md:col-span-2`}
        >
          <div className="relative">
            <AdminSidebar />
            <button
              className="absolute top-4 right-4 md:hidden text-black text-2xl p-2 rounded-full"
              onClick={toggleSidebar}
            >
              <FaArrowLeft />
            </button>
          </div>
        </aside>
        <div
          className={`md:col-span-10 h-full ${sidebarOpen ? 'hidden md:block' : 'col-span-12'}`}
        >
          <div className="w-full h-16 md:h-24 text-xl md:text-3xl flex justify-center items-center">
            <h1 className="px-4 font-bold">Layout</h1>
            <button
              className="md:hidden ml-auto mr-4"
              onClick={toggleSidebar}
            >
              <i className="ri-menu-line text-2xl"></i>
            </button>
          </div>

          {/* Image upload section */}
          <div className="flex flex-col gap-6 justify-center items-center image-upload mx-4 my-8">
            {/* Logo section */}
            <form className="text-center" onSubmit={handleLogoUpload}>
              <h1 className="text-2xl font-semibold text-gray-700 mb-4">Upload Logo</h1>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogo}
                required
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="px-6 py-3 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition duration-200 ease-in-out shadow-lg mr-4"
              >
                Choose Logo
              </label>
              <button
                type="submit"
                disabled={!logo}
                className={`px-6 py-3 bg-green-600 text-white rounded-full cursor-pointer hover:bg-green-700 transition duration-200 ease-in-out shadow-lg ${!logo ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                Upload Logo
              </button>
            </form>

            {/* Display selected logo */}
            {logo && (
              <div className="mt-6">
                <img
                  src={logo}
                  alt="Selected Logo"
                  className="w-80 h-48 object-cover border-2 shadow-xl transition-all duration-300 transform hover:scale-105"
                />
              </div>
            )}

            {/* Display Logo */}
            <div className="mt-6">
              <h1 className="text-center text-black font-medium text-2xl pb-6">Logo Image</h1>
              {adminImages && adminImages[0]?.logoImg ? (
                <div className="flex justify-center">
                  <img
                    src={adminImages[0].logoImg.url}
                    alt="Selected Logo"
                    className="w-80 h-48 object-cover border-2 shadow-xl transition-all duration-300 transform hover:scale-105"
                  />
                </div>
              ) : (
                <h1 className="text-center text-gray-500 text-lg">No Logo Image</h1>
              )}
            </div>


            {/* Slider section */}
            <form className="text-center" onSubmit={handleSliderUpload}>
              <h1 className="text-2xl font-semibold text-gray-700 mb-4">Upload Slider Images</h1>
              <input
                type="file"
                accept="image/*"
                onChange={handleSliderImages}
                multiple
                required
                className="hidden"
                id="slider-upload"
              />
              <label
                htmlFor="slider-upload"
                className="px-6 py-3 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition duration-200 ease-in-out shadow-lg mr-4"
              >
                Choose Images
              </label>
              <button
                type="submit"
                disabled={sliderImages.length === 0}
                className={`px-6 py-3 bg-green-600 text-white rounded-full cursor-pointer hover:bg-green-700 transition duration-200 ease-in-out shadow-lg ${sliderImages.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                Upload Slider Images
              </button>
            </form>

            {/* Display selected slider images */}
            {sliderImages.length > 0 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {sliderImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Slider ${index + 1}`}
                      className="w-full h-48 object-cover border-2 shadow-xl transition-all duration-300 transform hover:scale-105"
                    />
                    {/* Delete Button */}
                    <button
                      onClick={() => handleCancelImage(index)}
                      className="absolute top-2 right-2 w-10 bg-red-500 text-white rounded-full p-1 shadow-md transition-opacity duration-300"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}


            {/* Display slider images */}
            <div className="mt-6">
              <h1 className="text-center text-black font-medium text-2xl pb-6">Slider Images</h1>
              {adminImages && adminImages[0]?.sliderImg?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {adminImages[0].sliderImg.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.url}
                        alt={`Slider ${index + 1}`}
                        className="w-full h-48 object-cover border-2 shadow-xl transition-all duration-300 transform hover:scale-105"
                      />
                      <button
                        onClick={() => handleDeleteImage(image.public_id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-100 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-300 transition-all"
                      >
                        <i className="ri-delete-bin-line text-red-600 text-xl md:text-2xl"></i>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <h1 className="text-center text-gray-500 text-lg">No Slider Images</h1>
              )}
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChangeLayout;

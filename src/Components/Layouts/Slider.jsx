import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to get images from Redux
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { LoadAdminImages } from '../../Actions/AdminImg';

const Slider = () => {
  // Get images from the Redux store
  const { adminImages } = useSelector((state) => state.adminImg);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadAdminImages());
  }, [dispatch]);

  const renderSlides = () => {
    if (adminImages && adminImages[0]?.sliderImg?.length > 0) {
      return adminImages[0].sliderImg.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            className="h-52 md:h-[70vh] w-full flex justify-center items-center bg-gray-100 text-gray-500"
            src={image.url}
            alt={`Slider ${index + 1}`}
          />
        </SwiperSlide>
      ));
    }

    // Return a fallback slide if no images are present
    return (
      <SwiperSlide>
        <div className="h-52 md:h-[70vh] w-full flex justify-center items-center bg-gray-100 text-gray-500 text-lg">
          No Slider Images
        </div>
      </SwiperSlide>
    );
  };

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      loop
      autoplay={{
        delay: 3000, 
      }}
    >
      {renderSlides()}
    </Swiper>
  );
};

export default Slider;

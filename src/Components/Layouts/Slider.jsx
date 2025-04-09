import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Autoplay } from 'swiper/modules'; 
import 'swiper/css'; 
import 'swiper/css/autoplay'; 
import { LoadAdminImages } from '../../Actions/AdminImg'; 
 
const Slider = () => { 
  const { adminImages } = useSelector((state) => state.adminImg); 
  const dispatch = useDispatch(); 
 
  useEffect(() => { 
    dispatch(LoadAdminImages()); 
  }, [dispatch]); 
 
  const renderSlides = () => { 
    if (adminImages && adminImages[0]?.sliderImg?.length > 0) { 
      return adminImages[0].sliderImg.map((image, index) => ( 
        <SwiperSlide key={index}> 
          <div className="w-full h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-[70vh] relative">
            <img 
              className="w-full h-full" 
              src={image.url} 
              alt={`Slider ${index + 1}`} 
            /> 
          </div>
        </SwiperSlide> 
      )); 
    } 
 
    // Return a fallback slide if no images are present 
    return ( 
      <SwiperSlide> 
        <div className="w-full h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-[70vh] flex justify-center items-center bg-gray-100 text-gray-500 text-sm sm:text-base lg:text-lg"> 
          No Slider Images 
        </div> 
      </SwiperSlide> 
    ); 
  }; 
 
  return ( 
    <div className="w-full overflow-hidden">
      <Swiper 
        modules={[Autoplay]} 
        spaceBetween={0} 
        slidesPerView={1} 
        loop 
        autoplay={{ 
          delay: 3000,  
          disableOnInteraction: false,
        }} 
        className="w-full"
      > 
        {renderSlides()} 
      </Swiper> 
    </div>
  ); 
}; 
 
export default Slider;
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='rounded-sm'>
           <Swiper 
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-lg"
      >
        <SwiperSlide className='rounded-sm w-full h-[60vh] md:h-[90vh] bg-cover bg-center bg-no-repeat bg-[url("https://i.ibb.co/rtGb5t5/107317099-blooddonor976.jpg")]'>
           
            <div className='w-full gap-4 h-[60vh] md:h-[90vh] flex flex-col justify-center items-center bg-[#0307124c]'>
            
            <h1 className='  text-white font-bold text-4xl  md:text-5xl'>Save Life! Give Blood!!!</h1>
            <div className='flex flex-col gap-3 md:flex-row'>
            <Link to="/register"><button className='btn btn-accent px-8 text-xl'>Join as a donor</button></Link>
            <Link to="/search"><button className='btn btn-info px-8 text-xl'>Search Donors</button></Link>
            </div>

            </div>
        </SwiperSlide>
        
        
        
      </Swiper>
        </div>
    );
};

export default Banner;
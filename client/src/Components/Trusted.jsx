import React from 'react';
import company1 from "../images/image1.png"
import company2 from "../images/image2.png"
import company3 from "../images/image3.webp"
import company4 from "../images/image4.webp"
import company5 from "../images/image5.webp"
import company6 from "../images/image6.webp";
import company7 from "../images/image7.webp";
import company8 from "../images/image8.webp";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const Trusted = () => {
    return (
        <section className='Trusted_section'>
            <div className='container'>
                <h3>Trusted By 1000+ Companies</h3>
                <div className='row trusted_row'>
                    <div className='col-12 trusted_col'>

                        <Swiper
                            slidesPerView={5}
                            spaceBetween={50}
                            loop={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,

                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                            <div className='slider_img'><img src={company1} alt='company 1' /></div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <div className='slider_img'><img src={company2} alt='company 2' /></div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <div className='slider_img'><img src={company3} alt='company 3' /></div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <div className='slider_img'><img src={company4} alt='company 4' /></div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <div className='slider_img'><img src={company5} alt='company 5' /></div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <div className='slider_img'><img src={company6} alt='company 6' /></div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <div className='slider_img'><img src={company7} alt='company 7' /></div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <div className='slider_img'><img src={company8} alt='company 8' /></div>
                            </SwiperSlide>


                        </Swiper>


                    </div>
                </div>
            </div>
        </section>
    )
}

export default Trusted

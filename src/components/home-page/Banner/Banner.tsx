'use client'
import styles from './Banner.module.scss'
import {Autoplay} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import BannerImg1 from '/public/img/banner1.jpg'
import BannerImg2 from '/public/img/banner2.png'
import Image from "next/image";

const banners = [BannerImg1, BannerImg2]

export default function Banner() {
    
    return (
        <div className={styles.banner}>
            <Swiper
                spaceBetween={15}
                slidesPerView={1}
                modules={[Autoplay]}
                loop={true}
                autoplay={{
                    stopOnLastSlide: false,
                }}
                className={styles.slider}
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index} className={styles.slide}>
                        <Image src={banner} alt='Баннер'/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};


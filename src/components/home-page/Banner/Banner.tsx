'use client'
import styles from './Banner.module.scss'
import {Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import BannerImg1 from '/public/img/banner1.jpg'
import BannerImg2 from '/public/img/banner2.jpg'
import BannerImg3 from '/public/img/banner3.jpg'
import BannerImg4 from '/public/img/banner4.jpg'
import Image from "next/image";
import ArrowSlider from './ArrowSlider'

const banners = [BannerImg4,BannerImg1, BannerImg2, BannerImg3]

export default function Banner() {
    const pagination = {
        clickable: true,
    };

    return (
        <div className={styles.banner}>
            <Swiper
                spaceBetween={15}
                slidesPerView={1}
                modules={[Navigation, Pagination]}
                loop={true}
                className={styles.slider}
                pagination={pagination}
            >
                <ArrowSlider/>
                {banners.map((banner, index) => (
                    <SwiperSlide key={index} className={styles.slide}>
                        <Image src={banner} alt='Баннер'/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};


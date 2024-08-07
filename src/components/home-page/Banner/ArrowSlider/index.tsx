import styles from "./ArrowSlider.module.scss";
import cn from "classnames";
import ArrowIcon from "/public/svg/arrow.svg";
import {useSwiper} from "swiper/react";

export default function ArrowSlider() {

    const swiper = useSwiper();
    return (
        <>
            <div className={cn(styles.icon, styles.iconPrev)} onClick={() => swiper.slidePrev()}>
                <ArrowIcon/>
            </div>
            <div className={cn(styles.icon, styles.iconNext)} onClick={() => swiper.slideNext()}>
                <ArrowIcon/>
            </div>
        </>
    );
};

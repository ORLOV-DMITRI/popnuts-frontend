'use client'
import styles from './ScrollToTopButton.module.scss'
import {useEffect, useState} from "react";
import cn from "classnames";
import ArrowIcon from '/public/svg/arrow.svg'

type TProps = {
    isMainPage?: boolean
}
export default function ScrollToTopButton({isMainPage}: TProps) {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    
    return (
        <button
            className={cn(styles.scrollToTop,isVisible && styles.show, isMainPage && styles.main )}
            onClick={scrollToTop}
        >
            <ArrowIcon/>
        </button>
    );
}

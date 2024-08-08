import styles from './Rating.module.scss'
import Link from "next/link";
import {Product} from "@/types";
import Image from "next/image";
import StarIcon from '/public/svg/star.svg'

type Props = {
   rating: number
    countReviews: number
}

export default function Rating({rating, countReviews}: Props) {
    
    
    
    return (
        <div className={styles.rating}>
            <div className={styles.ratingStart}>
                <span className={styles.starIcon}><StarIcon/></span>
                <span>{rating}</span>
            </div>
            {countReviews > 0 && (
                <div className={styles.ratingCount}>
                    {countReviews} reviews
                </div>
            )}
        </div>
    );
}

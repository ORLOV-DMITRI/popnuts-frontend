import styles from './Rating.module.scss'
import StarIcon from '/public/svg/star.svg'
import cn from "classnames";

type Props = {
    rating: number
    countReviews: number
    variant?: 'small' | 'big'
}

export default function Rating({rating, countReviews, variant = 'small'}: Props) {
    
    
    return (
        <div className={cn(styles.rating, styles[variant])}>
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

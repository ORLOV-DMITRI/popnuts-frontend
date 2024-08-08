import styles from './ProductQuickView.module.scss'
import Link from "next/link";
import {Product} from "@/types";
import Image from "next/image";
import Rating from "@/components/ui/Rating/Rating";
import Button from "@/components/ui/Button/Button";
import LikeIcon from '/public/svg/like.svg'

type Props = {
    product: Product
}

export default function ProductQuickView({product}: Props) {
    const discountAmount = product.price * (product.discountPercentage / 100);
    const discountedPrice = product.price - discountAmount;
    
    console.log(product)
    return (
        <div className={styles.quickView}>
            <div className={styles.img}>
                <Image src={product.thumbnail} alt={product.title} width={350} height={350} priority/>
            </div>
            <div className={styles.content}>
                <div className={styles.top}>
                    <Link className={styles.title} href="#">
                        {product.title}
                    </Link>
                    <Rating rating={product.rating} countReviews={product?.reviews?.length}/>
                    <div className={styles.price}>
                        <ins className={styles.priceDiscount}>
                            {discountedPrice.toFixed(2)}$
                        </ins>
                        <del className={styles.priceFull}>
                            {product.price.toFixed(2)}
                        </del>
                    </div>
                    <div className={styles.status}>
                        {product.availabilityStatus}
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.info}>
                        <div className={styles.dimensions}>
                       <span>
                            weight
                           <span>{product.weight}</span>
                       </span>
                            <span>
                           depth
                           <span>{product.dimensions.depth}</span>
                       </span>
                            <span>
                           height
                           <span>{product.dimensions.height}</span>
                       </span>
                            <span>
                           width
                           <span>{product.dimensions.width}</span>
                       </span>
                        </div>
                    </div>
                    <div className={styles.description}>
                        {product.description}
                    </div>
                    <div className={styles.actions}>
                        <Button>Add to cart</Button>
                        <button className={styles.favorites}><LikeIcon/></button>
                    </div>
                </div>
                <Link href={'#'} className={styles.detailLink}>More information product</Link>
            </div>
       
        </div>
    );
}

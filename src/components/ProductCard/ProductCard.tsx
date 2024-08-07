import styles from './ProductCard.module.scss'
import Link from "next/link";
import {Product} from "@/types";
import Image from "next/image";
import StarIcon from '/public/svg/star.svg'

type Props = {
    product: Product
}

export default function ProductCard({product}: Props) {
    const discountAmount = product.price * (product.discountPercentage / 100);
    const discountedPrice = product.price - discountAmount;
    
    const maxStock = 100;
    const stockPercentage = (product.stock / maxStock) * 100;
    
    return (
        <article className={styles.productCard}>
            <div className={styles.wrapper}>
                <Link className={styles.productLink} href='#'></Link>
                <div className={styles.top}>
                    <div className={styles.productImgWrapper}>
                        <Image className={styles.productImg} src={product.thumbnail} alt={product.title} width={200}
                               height={250}/>
                    </div>
                </div>
                <div className={styles.middle}>
                    <h2 className={styles.title} title={product.title}>{product.title}</h2>
                    <div className={styles.price}>
                        <ins className={styles.priceDiscount}>
                            {discountedPrice.toFixed(2)}$
                        </ins>
                        {/* Цена со скидкой */}
                        <del className={styles.priceFull}>
                            {product.price.toFixed(2)}
                        </del>
                        {/* Исходная цена */}
                    </div>
                    <div className={styles.brand}>
                        <span>{product.brand}</span>
                    </div>
                    <div className={styles.rating}>
                        <div className={styles.ratingStart}>
                            <span className={styles.starIcon}>
                                <StarIcon/>
                            </span>
                            <span>{product.rating}</span>
                        </div>
                        {product.reviews.length > 0 && (
                            <div className={styles.ratingCount}>
                                {product.reviews.length} reviews
                            </div>
                        )}
                    </div>
                    
                    <div className={styles.thermometerWrap}>
                        {product.stock === 0 && (
                            <div className={styles.thermometerText}>not available</div>
                        )}
                        {product.stock > maxStock && (
                            <div className={styles.thermometerText}>in stock</div>
                        )}
                        {product.stock !== 0 && product.stock < maxStock && (
                            <>
                                <div className={styles.thermometerText}>{product.stock} pcs left</div>
                                <div className={styles.thermometer}>
                                    <div className={styles.thermometerLine}
                                         style={{width: `${stockPercentage}%`}}></div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <button className={styles.addBtn}>Add to cart</button>
            </div>
        </article>
    );
}

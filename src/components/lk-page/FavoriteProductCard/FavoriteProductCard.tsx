import styles from './FavoriteProductCard.module.scss'
import cn from "classnames";
import LoaderImage from "@/components/ui/LoaderImage/LoaderImage";
import LikeIcon from "../../../../public/svg/like.svg";
import Button from "@/components/ui/Button/Button";
import React, {useState} from "react";
import {TCustomProduct} from "@/types";
import Link from "next/link";
import Image from "next/image";

type TProps = {
    product: TCustomProduct;
    onAddFavorites: () => void
    isFavorite?: boolean
    onAddBasket: () => void
    isBasket?: boolean
};

export default function FavoriteProductCard({product, onAddFavorites, isFavorite, onAddBasket, isBasket}: TProps) {
    const discountAmount = product.price * (product.discountPercentage / 100);
    const discountedPrice = product.price - discountAmount;
    const [loadingImg, setLoadingImg] = useState(true)
    
    return (
        <article className={cn(styles.productCard)}>
            <div className={styles.wrapper}>
                <Link className={styles.productLink} href={`/${product.category}/${product.productId}`}></Link>
                <div className={styles.top}>
                    <div className={styles.productImgWrapper}>
                        {loadingImg && <LoaderImage />}
                        <Image className={styles.productImg} src={product.thumbnail} alt={product.title} width={200}
                               height={250} priority   onLoad={() => setLoadingImg(false)}/>
                    </div>
                    <button className={cn(styles.favorites, isFavorite && styles.active)} onClick={onAddFavorites}>
                        <LikeIcon/>
                    </button>
                </div>
                <div className={styles.middle}>
                    <h2 className={styles.title} title={product.title}>{product.title}</h2>
                    <div className={styles.price}>
                        <ins className={styles.priceDiscount}>
                            {discountedPrice.toFixed(2)}$
                        </ins>
                        <del className={styles.priceFull}>
                            {product.price.toFixed(2)}
                        </del>
                    </div>
                    <div className={styles.brand}>
                        {product.brand ?
                            (<span>{product.brand}</span>)
                            :
                            (<span>No brand</span>)
                        }
                    </div>
                </div>
                {product.stock === 0 && (
                    <div className={styles.addBtn}>
                        <Button variant={'disabled'}>Not available</Button>
                    </div>
                )}
                {product.stock > 0 && (
                    isBasket ? (
                        <div className={styles.addBtn}>
                            <Button variant={'secondary'}>
                                <Link href={'/lk/basket'}>
                                    In cart
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className={styles.addBtn}>
                            <Button onClick={onAddBasket}>Add to cart</Button>
                        </div>
                    )
                )}
            </div>
        </article>
    );
}

import styles from './BasketProductCard.module.scss'
import Link from "next/link";
import {TCustomProduct} from "@/types";
import Image from "next/image";
import React from "react";
import cn from "classnames";
import LikeIcon from "/public/svg/like.svg";
import DeleteIcon from "/public/svg/delete.svg";
import {useAddBasketMutation} from "@/api/basket/useAddBasketMutation";
import {useRemoveBasketMutation} from "@/api/basket/useRemoveBasketMutation";
import {useDeleteBasketMutation} from "@/api/basket/useDeleteBasketMutation";

type Props = {
    product: TCustomProduct
    onAddFavorites: () => void
    isFavorite?: boolean
}

export default function BasketProductCard({product, onAddFavorites, isFavorite}: Props) {
    const discountAmount = product.price * (product.discountPercentage / 100);
    const discountedPrice = (product.price - discountAmount) * product.count;
    
    const {mutate: incrementProduct} = useAddBasketMutation()
    const {mutate: decrementProduct} = useRemoveBasketMutation()
    const {mutate: deleteProduct} = useDeleteBasketMutation()
    
    return (
        <div className={styles.card}>
            <Link href={`/${product.category}/${product.productId}`} className={styles.img}>
                <Image src={product.thumbnail} alt={product.title} width={150} height={150}/>
            </Link>
            <div className={styles.info}>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.brand}>
                    {product.brand ?
                        (<span>{product.brand}</span>)
                        :
                        (<span>No brand</span>)
                    }
                </div>
                <div className={styles.subinfo}>Free cancellation</div>
            </div>
            <div className={styles.counter}>
                <div className={styles.counterWrap}>
                    <button className={cn(styles.counterAction, styles.minus)}
                            onClick={() => decrementProduct(product.productId)}></button>
                    <span className={styles.currentCount}>{product.count}</span>
                    <button className={cn(styles.counterAction, styles.plus)}
                            onClick={() => incrementProduct(product)}></button>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.price}>
                    <ins className={styles.priceDiscount}>
                        {discountedPrice.toFixed(2)}$
                    </ins>
                    <del className={styles.priceFull}>
                        {(product.price * product.count).toFixed(2)}
                    </del>
                </div>
                <div className={styles.action}>
                    <button className={cn(styles.favorites, isFavorite && styles.active)} onClick={onAddFavorites}>
                        <LikeIcon/>
                    </button>
                    <button className={cn(styles.favorites)} onClick={() => deleteProduct(product.productId)}>
                        <DeleteIcon/>
                    </button>
                </div>
            </div>
        
        </div>
    );
}

'use client'
import React, {forwardRef, useState} from 'react';
import styles from './ProductCard.module.scss';
import Link from "next/link";
import {TProduct} from "@/types";
import Image from "next/image";
import LikeIcon from '/public/svg/like.svg';
import Rating from "@/components/ui/Rating/Rating";
import Button from "@/components/ui/Button/Button";
import cn from "classnames";
import Thermometer from "@/components/ui/Thermometer/Thermometer";
import LoaderImage from "@/components/ui/LoaderImage/LoaderImage";

type Props = {
    product: TProduct;
    onOpenModal?: () => void;
};

const ProductCard = forwardRef<HTMLDivElement, Props>(({product, onOpenModal}, ref) => {
    const discountAmount = product.price * (product.discountPercentage / 100);
    const discountedPrice = product.price - discountAmount;

    const [loadingImg, setLoadingImg] = useState(true)


    return (
        <article className={cn(styles.productCard, ref && 'Тут')} ref={ref}>
            <div className={styles.wrapper}>
                <Link className={styles.productLink} href={`/${product.category}/${product.id}`}></Link>
                <div className={styles.top}>
                    <div className={styles.productImgWrapper}>
                        {loadingImg && <LoaderImage />}
                        <Image className={styles.productImg} src={product.thumbnail} alt={product.title} width={200}
                               height={250}  onLoad={() => setLoadingImg(false)}/>
                    </div>
                    <button className={styles.showMore} onClick={onOpenModal}>
                        Quick view
                    </button>
                    <button className={styles.favorites}>
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
                    <Rating rating={product.rating} countReviews={product?.reviews?.length}/>
                    <Thermometer stock={product.stock}/>
                </div>
                <div className={styles.addBtn}>
                    <Button>Add to cart</Button>
                </div>
            </div>
        </article>
    );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;

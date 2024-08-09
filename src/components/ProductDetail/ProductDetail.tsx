'use client'
import styles from './ProductDetail.module.scss'
import {TProduct} from "@/types";
import Image from "next/image";
import Rating from "@/components/ui/Rating/Rating";
import Button from "@/components/ui/Button/Button";
import LikeIcon from '/public/svg/like.svg'
import React, {useState} from "react";
import Thermometer from "@/components/ui/Thermometer/Thermometer";
import AvatarImg from '/public/img/avatar.png'
import LoaderImage from "@/components/ui/LoaderImage/LoaderImage";


type Props = {
    product: TProduct
}

export default function ProductDetail({product}: Props) {

    const discountAmount = product.price * (product.discountPercentage / 100);
    const discountedPrice = product.price - discountAmount;

    const [loadingImg, setLoadingImg] = useState(true)


    return (
        <div className={styles.productDetail}>
            <div className={styles.productDetailTop}>
                <div className={styles.img}>
                    {loadingImg && <LoaderImage />}
                    <Image src={product.images[0]} alt={product.title} width={350} height={350}
                           onLoad={() => setLoadingImg(false)}/>
                </div>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <h1 className={styles.title}>
                            {product.title}
                        </h1>
                        <Rating variant={'big'} rating={product.rating} countReviews={product?.reviews?.length}/>

                        <div className={styles.status}>
                            {product.availabilityStatus}
                        </div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.info}>
                            <div className={styles.dimensions}>
                                <div className={styles.dimensionItem}>
                                    <span className={styles.dimensionName}>Weight</span>
                                    <span className={styles.dots}></span>
                                    <span className={styles.dimensionValue}>{product.weight}</span>
                                </div>
                                <div className={styles.dimensionItem}>
                                    <span className={styles.dimensionName}>Depth</span>
                                    <span className={styles.dots}></span>
                                    <span className={styles.dimensionValue}>{product.dimensions.depth}</span>
                                </div>
                                <div className={styles.dimensionItem}>
                                    <span className={styles.dimensionName}>Height</span>
                                    <span className={styles.dots}></span>
                                    <span className={styles.dimensionValue}>{product.dimensions.height}</span>
                                </div>
                                <div className={styles.dimensionItem}>
                                    <span className={styles.dimensionName}>Width</span>
                                    <span className={styles.dots}></span>
                                    <span className={styles.dimensionValue}>{product.dimensions.width}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.description}>
                            {product.description}
                        </div>
                        <div className={styles.subInfo}>
                            <div className={styles.subInfoItem}>
                                {product.returnPolicy}
                            </div>
                            <div className={styles.subInfoItem}>
                                {product.warrantyInformation}
                            </div>
                        </div>
                    </div>

                </div>
                <div className={styles.aside}>
                    <div className={styles.price}>
                        <ins className={styles.priceDiscount}>
                            {discountedPrice.toFixed(2)}$
                        </ins>
                        <del className={styles.priceFull}>
                            {product.price.toFixed(2)}
                        </del>
                    </div>
                    <Thermometer stock={product.stock} className={styles.thermometerWrap}/>
                    <div className={styles.actions}>
                        <Button>Add to cart</Button>
                        <button className={styles.favorites}><LikeIcon/></button>
                    </div>
                    <div className={styles.delivery}>
                        {product.shippingInformation}
                    </div>
                </div>
            </div>
            {product.reviews.length > 0 && (
                <div className={styles.reviews}>
                    <h3>Reviews</h3>
                    <ul className={styles.reviewsList}>
                        {product.reviews.map((item, index) => (
                            <li className={styles.reviewsItem} key={index}>
                                <div className={styles.reviewsTop}>
                                    <Image src={AvatarImg} alt={'Аватар'} width={50} height={50}/>
                                    <div className={styles.reviewsInfo}>
                                        <span className={styles.reviewName}>{item.reviewerName}</span>
                                        <span className={styles.reviewEmail}>{item.reviewerEmail}</span>
                                    </div>

                                </div>
                                <div className={styles.comment}>
                                    {item.comment}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

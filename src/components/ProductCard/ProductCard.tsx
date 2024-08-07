import styles from './ProductCard.module.scss'
import Link from "next/link";
import {Product} from "@/types";
import Image from "next/image";
import {log} from "util";

type Props = {
    product: Product
}

export default function ProductCard({product}: Props) {
    console.log(product)
    const discountAmount = product.price * (product.discountPercentage / 100);
    const discountedPrice = product.price - discountAmount;
    return (
        <article className={styles.productCard}>
            <div className={styles.wrapper}>
                <Link href='#'></Link>
                <div className={styles.top}>
                    <div className={styles.productImgWrapper}>
                        <Image className={styles.productImg} src={product.thumbnail} alt={product.title} width={200} height={250}
                               title={product.title}/>
                    </div>
                </div>
                <div className={styles.middle}>
                    <div className={styles.price}>
                        <span
                            className={styles.priceDiscount}>{discountedPrice.toFixed(2)}</span> {/* Цена со скидкой */}
                        <span className={styles.priceFull}>{product.price.toFixed(2)}</span> {/* Исходная цена */}
                    </div>
                    <div className={styles.brand}>
                        <span>{product.brand}</span>
                        <span>
                            <span>/</span>
                            {product.description}
                        </span>
                    </div>
                </div>
                <div className={styles.bottom}></div>
            </div>
        </article>
    );
}

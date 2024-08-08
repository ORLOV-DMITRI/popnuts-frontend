import styles from './Thermometer.module.scss'
import React from "react";
import cn from "classnames";

type Props = {
    className?:string
    stock: number
}

export default function Thermometer({className, stock}: Props) {
    const maxStock = 100;
    const stockPercentage = (stock / maxStock) * 100;
    return (
        <div className={cn(styles.thermometerWrap, className ? className : '')}>
            {stock === 0 && (
                <div className={styles.thermometerText}>not available</div>
            )}
            {stock > maxStock && (
                <div className={styles.thermometerText}>in stock</div>
            )}
            {stock !== 0 && stock < maxStock && (
                <>
                    <div className={styles.thermometerText}>{stock} pcs left</div>
                    <div className={styles.thermometer}>
                        <div className={styles.thermometerLine}
                             style={{width: `${stockPercentage}%`}}></div>
                    </div>
                </>
            )}
        </div>
    );
}

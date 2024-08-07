'use client'
import styles from './ProductsList.module.scss'
import useProductsQuery from "@/api/useProductsQuery";
import React from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";

export default function ProductsList() {
    const {status, data, isFetchingNextPage, hasNextPage, ref: targetRef} = useProductsQuery()
    console.log(data)
    return (
        <div className={styles.productList}>
            <ScrollToTopButton/>
            {status === 'pending' && <p>Loading...</p>}
            
            {data?.pages?.map((page, pageIndex) => {
                const isLastProduct = pageIndex === data.pages.length - 1
                return (
                    (
                        <div key={pageIndex} className={styles.products}
                             ref={isLastProduct ? targetRef as React.LegacyRef<HTMLDivElement> : null}>
                            {page.products.map((product) => (
                                <ProductCard product={product} key={product.id}/>
                            ))}
                        </div>
                    )
                )
            })}
            <div>
                {isFetchingNextPage && 'Loading more...'}
            </div>
        </div>
    );
}

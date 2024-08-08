'use client'
import styles from './ProductsList.module.scss'
import useProductsQuery from "@/api/useProductsQuery";
import React, {useEffect, useState} from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
import Modal from "@/components/ui/Modal/Modal";
import {Product, ProductsResponse} from "@/types";
import ProductQuickView from "@/components/ProductQuickView/ProductQuickView";
import {getInitialCategoryProducts} from "@/api/requests";


type Props = {
    apiCall: (pageParam: number, categorySlug?: string) => Promise<ProductsResponse>;
    queryKeys: string[];
    products: ProductsResponse
}
export default function ProductsList({apiCall, queryKeys, products}: Props) {
    const {status, data, isFetchingNextPage, hasNextPage, ref: targetRef} = useProductsQuery({
        products,
        queryKeys,
        apiCall
    })
    const [isOpenQuickView, setIsOpenQuickView] = useState(false)
    const [selectProduct, setSelectProduct] = useState<Product | null>(null)

    const handleOpenQuickView = (product: Product) => {
        setSelectProduct(product);
        setIsOpenQuickView(true)
    }
    const getProductRef = (pageIndex: number, productIndex: number, productsLength: number) => {
        if (!data) return
        const itemsBeforeEnd = 10;
        const isEnding = pageIndex === data.pages.length - 1 && productIndex === productsLength - itemsBeforeEnd;

        return isEnding ? targetRef : null;
    };

    return (
        <div className={styles.productList}>
            <ScrollToTopButton/>
            {data?.pages?.map((page, pageIndex) => (
                <div key={pageIndex} className={styles.products}>
                    {page.products.map((product, productIndex) => (
                        <ProductCard
                            product={product}
                            key={product.id}
                            onOpenModal={() => handleOpenQuickView(product)}
                            ref={getProductRef(pageIndex, productIndex, page.products.length)}
                        />
                    ))}
                </div>
            ))}
            <div>
                {isFetchingNextPage && 'Loading more...'}
            </div>

            {selectProduct && (
                <Modal isOpen={isOpenQuickView} onClose={() => setIsOpenQuickView(false)}>
                    <ProductQuickView product={selectProduct}/>
                </Modal>
            )}
        </div>
    );
}

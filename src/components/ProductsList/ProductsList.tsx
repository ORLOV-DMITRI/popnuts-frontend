'use client'
import styles from './ProductsList.module.scss'
import useProductsQuery from "@/api/useProductsQuery";
import React, {useState} from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
import Modal from "@/components/ui/Modal/Modal";
import {TFilterItem, TProduct, TProductsResponse, TSortItem} from "@/types";
import ProductQuickView from "@/components/ProductQuickView/ProductQuickView";
import Loader from "@/components/ui/Loader/Loader";


type Props = {
    apiCall: (pageParam: number, categorySlug?: string) => Promise<TProductsResponse>;
    queryKeys: string[];
    products: TProductsResponse
    categorySlug?: string
    sortData?: TSortItem | null
    filterData?: TFilterItem | null
}
export default function ProductsList({apiCall, queryKeys, products, categorySlug, sortData, filterData}: Props) {
    const {data, isFetchingNextPage, ref: targetRef} = useProductsQuery({
        products,
        queryKeys,
        apiCall,
        categorySlug,
        sortData
    })
    const [isOpenQuickView, setIsOpenQuickView] = useState(false)
    const [selectProduct, setSelectProduct] = useState<TProduct | null>(null)

    const handleOpenQuickView = (product: TProduct) => {
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
        <>
            <div className={styles.productList}>
                <ScrollToTopButton/>
                {data?.pages?.map((page, pageIndex) => (
                    <div key={pageIndex} className={styles.products}>
                        {page?.products
                            ?.filter(product => {
                                if (!filterData) return true;
                                return product[filterData.field] === filterData.value;
                            })
                            ?.map((product, productIndex) => (
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
                    {isFetchingNextPage && <Loader/>}
                </div>

                {selectProduct && (
                    <Modal isOpen={isOpenQuickView} onClose={() => setIsOpenQuickView(false)}>
                        <ProductQuickView product={selectProduct} onClose={() => setIsOpenQuickView(false)}/>
                    </Modal>
                )}
            </div>
        </>

    );
}

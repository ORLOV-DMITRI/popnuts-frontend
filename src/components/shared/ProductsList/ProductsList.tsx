'use client'
import styles from './ProductsList.module.scss'
import useProductsQuery from "@/api/useProductsQuery";
import React, {useState} from "react";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton/ScrollToTopButton";
import Modal from "@/components/ui/Modal/Modal";
import {TFilterItem, TProduct, TProductsResponse, TSortItem} from "@/types";
import ProductQuickView from "@/components/shared/ProductQuickView/ProductQuickView";
import Loader from "@/components/ui/Loader/Loader";
import {useUserQuery} from "@/api/user/useUserQuery";
import {useToggleFavoritesMutation} from "@/api/favorites/useToggleFavoritesMutation";
import {useFavoritesQuery} from "@/api/favorites/useFavoritesQuery";
import {convertProductFavorite} from "@/utils/convertProduct";
import {useRouter} from "next/navigation";
import {useAddBasketMutation} from "@/api/basket/useAddBasketMutation";
import {useBasketQuery} from "@/api/basket/useBasketQuery";


type Props = {
    apiCall: (pageParam: number, categorySlug?: string) => Promise<TProductsResponse>;
    queryKeys: string[];
    products: TProductsResponse
    categorySlug?: string
    sortData?: TSortItem | null
    filterData?: TFilterItem | null
    isMainPage: boolean
}
export default function ProductsList({apiCall, queryKeys, products, categorySlug, sortData, filterData, isMainPage}: Props) {
    const {data, isFetchingNextPage, ref: targetRef} = useProductsQuery({
        products,
        queryKeys,
        apiCall,
        categorySlug,
        sortData
    })
    const [isOpenQuickView, setIsOpenQuickView] = useState(false)
    const [selectProduct, setSelectProduct] = useState<TProduct | null>(null)
    const {data: user} = useUserQuery()
    
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
    
    const router = useRouter()
    const {mutate: addFavorites} = useToggleFavoritesMutation()
    const {data: favoriteProducts} = useFavoritesQuery()
    
    const {mutate: addBasket} = useAddBasketMutation()
    const {data: basketProducts} = useBasketQuery()
    
    
    const handleAddFavorites = (product: TProduct | null) => {
        if (!user) {
            router.push('/login')
        }else {
            if (product) {
                const favoriteProduct = convertProductFavorite(product);
                addFavorites(favoriteProduct)
            }
        }
       
    }
    const handleAddBasket = (product: TProduct | null) => {
        if (!user) {
            router.push('/login')
        }else  {
            if (product) {
                const basketProducts = convertProductFavorite(product);
                addBasket(basketProducts)
            }
        }
        
    }
    
    return (
        <>
            <div className={styles.productList}>
                <ScrollToTopButton isMainPage={isMainPage}/>
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
                                    onAddFavorites={() => handleAddFavorites(product)}
                                    isFavorite={favoriteProducts?.some(item => item.productId === product.id)}
                                    onAddBasket={() => handleAddBasket(product)}
                                    isBasket={basketProducts?.some(item => item.productId === product.id)}
                                />
                            ))}
                    </div>
                ))}
                
                
                {selectProduct && (
                    <Modal isOpen={isOpenQuickView} onClose={() => setIsOpenQuickView(false)}>
                        <ProductQuickView product={selectProduct} onClose={() => setIsOpenQuickView(false)}
                                          onAddFavorites={() => handleAddFavorites(selectProduct)}
                                          isFavorite={favoriteProducts?.some(item => item.productId === selectProduct.id)}
                                          onAddBasket={() => handleAddBasket(selectProduct)}
                                          isBasket={basketProducts?.some(item => item.productId === selectProduct.id)}
                                          
                        />
                    </Modal>
                )}
            </div>
            <div>
                {isFetchingNextPage && <Loader/>}
            </div>
        </>
    
    );
}

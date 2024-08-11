'use client'
import styles from './FavoritesContent.module.scss'
import {useFavoritesQuery} from "@/api/favorites/useFavoritesQuery";
import {useToggleFavoritesMutation} from "@/api/favorites/useToggleFavoritesMutation";
import {useAddBasketMutation} from "@/api/basket/useAddBasketMutation";
import {useBasketQuery} from "@/api/basket/useBasketQuery";
import {TCustomProduct} from "@/types";
import FavoriteProductCard from "@/components/lk-page/FavoriteProductCard/FavoriteProductCard";
import React from "react";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";

export default function FavoritesContent() {
    const {data: favoriteProducts} = useFavoritesQuery()
    const {mutate: addFavorites} = useToggleFavoritesMutation()
    const {mutate: addBasket} = useAddBasketMutation()
    const {data: basketProducts} = useBasketQuery()
    
    const handleAddFavorites = (product: TCustomProduct) => {
        if (product) {
            addFavorites(product)
        }
    }
    const handleAddBasket = (product: TCustomProduct) => {
        if (product) {
            addBasket(product)
        }
    }
    return (
        <div className={styles.favoriteContent}>
            <div className={styles.title}>
                Favorites
                {favoriteProducts && favoriteProducts.length > 0 ?
                    (<span>{favoriteProducts.length} products</span>)
                    :
                    (<span>No products</span>)
                }
            </div>
            {favoriteProducts?.length === 0 && (
                <div className={styles.noProducts}>
                    <span> The favorites is empty.</span>
                    <div className={styles.action}>
                        <Button>
                            <Link href={'/'}>Home</Link>
                        </Button>
                    </div>
                  
        
                </div>
            )}
            <div className={styles.productList}>
                {favoriteProducts && favoriteProducts.length > 0 && (
                    favoriteProducts.map(product => (
                        <FavoriteProductCard
                            key={product.productId}
                            product={product}
                            onAddFavorites={() => handleAddFavorites(product)}
                            isFavorite={favoriteProducts?.some(item => item.productId === product.productId)}
                            onAddBasket={() => handleAddBasket(product)}
                            isBasket={basketProducts?.some(item => item.productId === product.productId)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

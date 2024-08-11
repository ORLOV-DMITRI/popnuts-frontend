'use client'
import styles from './BasketContent.module.scss'
import {useBasketQuery} from "@/api/basket/useBasketQuery";
import BasketProductCard from "@/components/lk-page/BasketProductCard/BasketProductCard";
import Loader from "@/components/ui/Loader/Loader";
import {useToggleFavoritesMutation} from "@/api/favorites/useToggleFavoritesMutation";
import {useFavoritesQuery} from "@/api/favorites/useFavoritesQuery";
import {TCustomProduct} from "@/types";
import Link from "next/link";
import cn from "classnames";
import Button from "@/components/ui/Button/Button";
import {useWalletInfo} from "@/api/wallet/useWalletInfo";
import {useSetPreferredCurrencyMutation} from "@/api/wallet/useSetPreferredCurrencyMutation";
import Modal from "@/components/ui/Modal/Modal";
import React, {useState} from "react";
import RefillPay from "@/components/lk-page/RefillPay/RefillPay";
import {useCheckoutOrder} from "@/api/order/useCheckoutOrder";

export default function BasketContent() {
    const [isOpenRefill, setIsOpenRefill] = useState(false)
    const [isOpenSuccessPay, setIsOpenSuccessPay] = useState(false)
    
    const {data: basketProducts, isPending} = useBasketQuery()
    const {mutate: addFavorites} = useToggleFavoritesMutation()
    const {data: favoriteProducts} = useFavoritesQuery()
    const {data: walletInfo} = useWalletInfo()
    const {mutate: setCurrency} = useSetPreferredCurrencyMutation()
    const {mutate: checkoutOrder} = useCheckoutOrder()
    
    
    const totalCost = basketProducts?.reduce((total, product) => {
        const discountAmount = product.price * (product.discountPercentage / 100);
        const discountedPrice = (product.price - discountAmount) * product.count;
        return total + discountedPrice;
    }, 0) ?? 0;
    const totalCount = basketProducts?.reduce((totalCount, product) => {
        return totalCount + product.count;
    }, 0) ?? 0;
    const additionalDiscount =  totalCost * 0.10 ;
    const finalTotalCost = totalCost - additionalDiscount;
    
    const selectCurrency = walletInfo?.preferredCurrency === 'USD' ? '$' : "C"
    const currentDisplayWallet =  walletInfo?.preferredCurrency === 'USD' ? walletInfo?.walletUSD : walletInfo?.walletCoin
    
    const handleAddFavorites = (product: TCustomProduct | null) => {
        if (product) {
            addFavorites(product)
        }
    }
    
    const handleCheckOrder = () => {
        checkoutOrder()
        setIsOpenSuccessPay(true)
    }
    return (
        <div className={styles.basket}>
            {isPending && (
                <div className={styles.basketLoader}>
                    <Loader/>
                </div>
            )}
            <div className={styles.basketContent}>
                <h1 className={styles.title}>
                    Basket
                    {basketProducts && basketProducts.length > 0 ?
                        (<span>{basketProducts.length} products</span>)
                        :
                        (<span>No products</span>)
                    }
                </h1>
                {basketProducts?.length === 0 && (
                    <div className={styles.noProducts}>
                       <span> The cart is empty.</span>
                        <Button>
                            <Link href={'/'}>Home</Link>
                        </Button>
                        
                    </div>
                )}
                {basketProducts && basketProducts.length > 0 && (
                    <ul className={styles.basketList}>
                        {basketProducts.map(product => (
                            <BasketProductCard product={product} key={product.productId}
                                               onAddFavorites={() => handleAddFavorites(product)}
                                               isFavorite={favoriteProducts?.some(item => item.productId === product.productId)}
                            />
                        ))}
                    </ul>
                )}
            </div>
            <div className={styles.basketAside}>
                <div className={styles.wallet}>
                    <Link href={'lk/payment'} className={styles.text}>
                        Your wallet
                    </Link>
                    <div>{currentDisplayWallet?.toFixed(2)}{selectCurrency}</div>
                </div>
                <div className={styles.payment}>
                    <Link href={'lk/payment'} className={styles.text}>
                        Payment
                    </Link>
                    <div className={styles.paymentToggle}>
                        <div
                            className={cn(styles.paymentItem, walletInfo?.preferredCurrency === 'USD' && styles.active)}>
                            <button onClick={() => setCurrency('USD')}>
                                $
                            </button>
                        </div>
                        <div
                            className={cn(styles.paymentItem, walletInfo?.preferredCurrency === 'Coin' && styles.active)}>
                            <button onClick={() => setCurrency('Coin')}>
                                Coin
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.infoItem}>
                        <span>Products, {totalCount} pcs</span>
                        <span>{totalCost?.toFixed(2)}{selectCurrency}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span>Store discount</span>
                        <span>{additionalDiscount?.toFixed(2)}{selectCurrency}</span>
                    </div>
                </div>
                <div className={styles.total}>
                    <span>Total</span>
                    <span>{finalTotalCost?.toFixed(2)}{selectCurrency}</span>
                </div>
                
                {finalTotalCost > currentDisplayWallet! ?
                    (
                        <>
                        <span className={styles.payError}>insufficient funds</span>
                        <Button variant={'secondary'} onClick={() => setIsOpenRefill(true)}>Refill</Button>
                        </>
                    )
                    :
                    (
                        basketProducts?.length > 0 && (
                            <Button onClick={handleCheckOrder}>Order</Button>
                        )
                    )
                }
            
            </div>
            <Modal isOpen={isOpenRefill} onClose={() => setIsOpenRefill(false)}>
                    <RefillPay/>
            </Modal>
            <Modal isOpen={isOpenSuccessPay} onClose={() => setIsOpenSuccessPay(false)}>
                    <div className={styles.successPay}>
                        <div className={styles.title}>
                            The order was successfully
                        </div>
                        <Button>
                            <Link href={'/lk/orders'}>My orders</Link>
                        </Button>
                    </div>
            </Modal>
        </div>
    );
}

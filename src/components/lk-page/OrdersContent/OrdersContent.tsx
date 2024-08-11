'use client'
import styles from './OrdersContent.module.scss'
import {useOrdersQuery} from "@/api/order/useOrdersQuery";
import Button from "@/components/ui/Button/Button";
import React from "react";
import OrdersItem from "@/components/lk-page/OrdersItem/OrdersItem";
import Link from "next/link";

export default function OrdersContent() {
    const {data: orders} = useOrdersQuery()
    return (
        <div className={styles.ordersContent}>
            <div className={styles.title}>
                Purchases
            </div>
            {orders?.length === 0 && (
                <div className={styles.noProducts}>
                    <span> The orders is empty.</span>
                    <div className={styles.action}>
                        <Button>
                            <Link href={'/'}>Home</Link>
                        </Button>
                    </div>
                </div>
            )}
            {orders && orders.length > 0 && (
                <div className={styles.ordersList}>
                    {orders.map(product => (
                        <OrdersItem orderItem={product} key={product.id}/>
                    ))}
                </div>
            )}
        </div>
    );
}

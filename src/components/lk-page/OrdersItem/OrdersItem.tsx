import styles from './OrdersItem.module.scss'
import {TOrder} from "@/types";

type TProps = {
    orderItem: TOrder
}
export default function OrdersItem({orderItem}:TProps) {
    
    const date = new Date(orderItem.createdAt);
    
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });
    
    const selectCurrency =orderItem.currency === 'USD' ? 'USD' : "Coin"
    return (
        <div className={styles.ordersItem}>
            <div className={styles.top}>
                <div className={styles.date}>
                    <span>Date: {formattedDate}</span>
                    <span>Time: {formattedTime}</span>
                </div>
                <div className={styles.status}>
                    Delivered
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.total}>
                    <span>Total Price:</span>
                    <span>{orderItem.totalPrice.toFixed(2)}</span>
                </div>
                <div className={styles.currency}>
                    <span>Currency:</span>
                    <span>{selectCurrency}</span>
                </div>
                <div className={styles.totalCount}>
                    <span>Quantity Products:</span>
                    <span>{orderItem.items.length}pcs</span>
                </div>
            </div>
        </div>
    );
}

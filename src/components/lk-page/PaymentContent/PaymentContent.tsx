import styles from './PaymentContent.module.scss'
import RefillPay from "@/components/lk-page/RefillPay/RefillPay";

export default function PaymentContent() {
    return (
        <div className={styles.paymentContent}>
            <RefillPay/>
        </div>
    );
}

import PaymentContent from "@/components/lk-page/PaymentContent/PaymentContent";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Profile - Wallet",
};
export default function PaymentPage() {
    return (
        <PaymentContent/>
    )
}

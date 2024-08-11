import OrdersContent from "@/components/lk-page/OrdersContent/OrdersContent";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Profile - Purchases",
};
export default function OrdersPage() {
    return <OrdersContent/>
}

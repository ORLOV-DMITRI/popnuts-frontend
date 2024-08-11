'use client'
import LkNavigation from "@/components/lk-page/LkNavigation/LkNavigation";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

export default function ProfileLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const hasToken = Cookies.get('token');
    const router = useRouter()
    if(!hasToken) {
        router.push('/login')
    }
    return (
        <section>
            <LkNavigation/>
            {children}
        </section>
    );
}

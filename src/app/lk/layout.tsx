'use client'
import LkNavigation from "@/components/lk-page/LkNavigation/LkNavigation";
import {useRouter} from "next/navigation";
import {useUserQuery} from "@/api/user/useUserQuery";

export default function ProfileLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const {data: user} = useUserQuery()
    const router = useRouter()
    if(!user) {
        router.push('/login')
    }
    return (
        <section>
            <LkNavigation/>
            {children}
        </section>
    );
}

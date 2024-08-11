import LkNavigation from "@/components/lk-page/LkNavigation/LkNavigation";

export default async function ProfileLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <section>
            <LkNavigation/>
            {children}
        </section>
    );
}

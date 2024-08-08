import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/styles/globals.scss";
import Header from "@/components/Header/Header";
import NavMobile from "@/components/NavMobile/NavMobile";
import {QueryProvider} from "@/settings/react-query/QueryProvider";
import {getCategories} from "@/api/requests";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Главная",
    description: "Главная интернет магазина",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const categories = await getCategories();

    return (
        <html lang="en">
        <body className={inter.className}>
        <QueryProvider>
            <Header categories={categories}/>
            <main className={'main'}>
                <div className="container">
                    {children}
                </div>
            </main>
            <NavMobile/>
        </QueryProvider>
        </body>
        </html>
    );
}

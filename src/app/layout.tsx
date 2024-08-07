import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/styles/globals.scss";
import Header from "@/components/Header/Header";
import NavMobile from "@/components/NavMobile/NavMobile";
import {QueryProvider} from "@/settings/react-query/QueryProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Главная",
    description: "Главная интернет магазина",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <QueryProvider>
            <Header/>
            <main className={'main'}>
                {children}
            </main>
            <NavMobile/>
        </QueryProvider>
        </body>
        </html>
    );
}

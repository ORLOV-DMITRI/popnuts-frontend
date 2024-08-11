import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/styles/globals.scss";
import Header from "@/components/layouts/Header/Header";
import {QueryProvider} from "@/settings/react-query/QueryProvider";
import {getCategories} from "@/api/requests";
import hasUser from "@/api/user/hasUser";


const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Popnuts - Home",
    description: "Popnuts market",
    icons: [
        {
            rel: 'icon',
            type: 'image/svg+xml',
            url: '/favicon-light.svg',
            media: '(prefers-color-scheme: light)',
        },
        {
            rel: 'icon',
            type: 'image/svg+xml',
            url: '/favicon-dark.svg',
            media: '(prefers-color-scheme: dark)',
        },
    ],
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const categories = await getCategories();
    
   const user = await hasUser()
    

    return (
        <html lang="en">
        <body className={inter.className}>
        <QueryProvider>
            <Header categories={categories} user={user}/>
            <main className={'main'}>
                <div className="container">
                    {children}
                </div>
            </main>
        </QueryProvider>
        </body>
        </html>
    );
}

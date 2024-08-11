'use client'
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/settings/react-query/query-client";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export function QueryProvider({children,}: Readonly<{ children: React.ReactNode}>) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={true}/>
        </QueryClientProvider>
    )
}

'use client'
import {useInView} from "react-intersection-observer";
import {ProductsResponse} from "@/types";
import {useEffect} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";

type Props = {
    apiCall: (pageParam: number) => Promise<ProductsResponse>;
    queryKeys: string[];
    products: ProductsResponse
}

export default function useProductsQuery({products, queryKeys, apiCall}: Props) {
    const {ref, inView} = useInView();

    const formattedInitialData = {
        pages: [products],
        pageParams: [undefined]
    };
    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery<ProductsResponse, Error>({
        queryKey: queryKeys,
        queryFn: async ({pageParam = 0}) => {
            if (typeof pageParam === 'number') {
                return apiCall(pageParam)
            } else {
                throw new Error("pageParam must be a number.")
            }
        },
        getNextPageParam: (lastPage, allPages) => {
            if(!lastPage?.products) return undefined
            if (lastPage?.products.length === 0) return undefined;
            return allPages.length;
        },
        initialPageParam: 0,
        initialData: formattedInitialData
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage]);

    return {ref, data, status, hasNextPage, isFetchingNextPage}
}

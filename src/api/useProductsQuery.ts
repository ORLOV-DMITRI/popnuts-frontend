'use client'
import {useInView} from "react-intersection-observer";
import {TProductsResponse, TSortItem} from "@/types";
import {useEffect} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";
import {queryClient} from "@/settings/react-query/query-client";

type Props = {
    categorySlug?: string
    apiCall: (pageParam: number, categorySlug?: string, sortData?: TSortItem) => Promise<TProductsResponse>;
    queryKeys: string[];
    products: TProductsResponse
    sortData?: TSortItem | null

}

export default function useProductsQuery({products, queryKeys, apiCall, categorySlug, sortData}: Props) {
    const {ref, inView} = useInView();

    const formattedInitialData = {
        pages: [products],
        pageParams: [undefined]
    };

    useEffect(() => {
        if (sortData) {
            queryClient.invalidateQueries({queryKey: queryKeys})
        }
    }, [sortData])
    
    
    const {
        status,
        data,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery<TProductsResponse, Error>({
        queryKey: queryKeys,
        queryFn: async ({pageParam = 0}) => {
            if (typeof pageParam === 'number') {
                if (sortData) {
                    return apiCall(pageParam, categorySlug && categorySlug, sortData)
                } else {
                    return apiCall(pageParam, categorySlug && categorySlug)
                }
            } else {
                throw new Error("pageParam must be a number.")
            }
        },
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage?.products) return undefined
            if (lastPage?.products.length === 0) return undefined;
            return allPages.length;
        },
        initialPageParam: 0,
        initialData: formattedInitialData
    });

    useEffect(() => {
        console.log(isFetching)
    }, [isFetching])
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage]);

    return {ref, data, status, hasNextPage, isFetchingNextPage, isFetching}
}

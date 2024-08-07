'use client'
import {useInView} from "react-intersection-observer";
import {ProductsResponse} from "@/types";
import {useEffect, useState} from "react";
import {InfiniteData, useInfiniteQuery} from "@tanstack/react-query";
import {number} from "prop-types";

export default function useProductsQuery<RefType>() {
    const { ref, inView } = useInView();
    const [isFetchingNextPageLocal, setIsFetchingNextPageLocal] = useState(false);
    
    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery<ProductsResponse, Error>({
        queryKey: ['products'],
        queryFn: async ({ pageParam = 0 }) => {
            if(typeof pageParam === 'number') {
                const limit = 18;
                console.log('f')
                const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${pageParam * limit}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }else  {
                throw new Error("pageParam must be a number.")
            }
           
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.products.length === 0) return undefined;
            return allPages.length;
        },
        initialPageParam: 0,
    });
    
    useEffect(() => {
        console.log(inView)
        console.log(hasNextPage)
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage]);
    
    return {ref, data, status, hasNextPage, isFetchingNextPage}
}

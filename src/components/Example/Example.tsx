'use client'
import React, {useEffect} from 'react';
import Link from "next/link";
import {useInView} from "react-intersection-observer";
import {useInfiniteQuery} from "@tanstack/react-query";
import {ProductsResponse} from "@/types";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from './Header.module.scss'

function Example() {
    const { ref, inView } = useInView();

    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    } = useInfiniteQuery<ProductsResponse, Error>({
        queryKey: ['products'],
        queryFn: async ({ pageParam = 0 }) => {
            const limit = 10;
            const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.products.length === 0) return undefined;
            return allPages.length;
        },
        initialPageParam: 0,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView, hasNextPage]);
    
    useEffect(() => {
        console.log(isFetchingNextPage)
    }, [isFetchingNextPage])
    return (
        <div>
            <h1>Infinite Loading</h1>
            {status === 'pending' ? (
                <p>Loading...</p>
            ) : status === 'error' ? (
                <span>Error: {(error as Error).message}</span>
            ) : (
                <>
                    <div>
                        <button
                            onClick={() => fetchPreviousPage()}
                            disabled={!hasPreviousPage || isFetchingPreviousPage}
                        >
                            {isFetchingPreviousPage
                                ? 'Loading more...'
                                : hasPreviousPage
                                    ? 'Load Older'
                                    : 'Nothing more to load'}
                        </button>
                    </div>
                    {data?.pages.map((page, pageIndex) => (
                        <div key={pageIndex} className={styles.products}>
                            {page.products.map((product) => (
                                <ProductCard product={product} key={product.id}/>
                            ))}
                        </div>
                    ))}
                    <div>
                        <button
                            ref={ref}
                            onClick={() => fetchNextPage()}
                            disabled={!hasNextPage || isFetchingNextPage}
                        >
                            {isFetchingNextPage
                                ? 'Loading more...'
                                : hasNextPage
                                    ? 'Load Newer'
                                    : 'Nothing more to load'}
                        </button>
                    </div>
                    <div>
                        {isFetching && !isFetchingNextPage
                            ? 'Background Updating...'
                            : null}
                    </div>
                </>
            )}
            <hr />
            <Link href="/about">Go to another page</Link>
        </div>
    );
}

export default Example;

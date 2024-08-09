'use server'
import {TProductsResponse, TSortItem} from "@/types";

export const getLimitProducts = async (pageParam: number): Promise<TProductsResponse> => {
    try {
        const limit = 18;
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${pageParam * limit}`);
        return response.json();
    } catch (error) {
        throw new Error('getLimitProducts. Network response was not ok' + error);
    }
}


export const getLimitCategoryProducts = async (
    pageParam: number,
    categorySlug?: string,
    sortData?: TSortItem,
): Promise<TProductsResponse> => {
    try {
        const sortQuery = sortData ? `&sortBy=${sortData.value.sortBy}&order=${sortData.value.order}` : '';
        const limit = 18;
        const response = await fetch(`https://dummyjson.com/products/category/${categorySlug}?limit=${limit}&skip=${pageParam * limit}${sortQuery}`);
        return response.json()
    } catch (error) {
        throw new Error('getLimitCategoryProducts. Network response was not ok' + error);
    }
}
'use server'
import {ProductsResponse} from "@/types";

export const getLimitProducts = async (pageParam: number) : Promise<ProductsResponse> => {
    try {
        const limit = 18;
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${pageParam * limit}`);
        return response.json();
    } catch (error) {
        throw new Error('Network response was not ok');
    }
}
export const getLimitCategoryProducts = async (pageParam: number, categorySlug?: string) : Promise<ProductsResponse> => {
    try {
        const limit = 18;
        const response = await fetch(`https://dummyjson.com/products/category/${categorySlug}?limit=${limit}&skip=${pageParam * limit}`);
      const data = response.json()
        return data
    } catch (error) {
        throw new Error('Network response was not ok');
    }
}
import {apiClient} from "@/settings/react-query/axios-instance";
import axios from "axios";
import {Product, ProductsResponse} from "@/types";


export const getCategories = async () => {
    try {
        const response = await apiClient.get(`categories`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error("Ошибка получения категорий, обновите страницу и попробуйте снова");
        } else {
            throw new Error("Произошла неожиданная ошибка, попробуйте снова");
        }
    }
};


export const getInitialALlProducts = async (): Promise<ProductsResponse> => {
    try {
        const response = await apiClient.get(`?limit=18`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error("Ошибка получения товаров, обновите страницу и попробуйте снова");
        } else {
            throw new Error("Произошла неожиданная ошибка, попробуйте снова");
        }
    }
}
export const getInitialCategoryProducts = async (categorySlug: string): Promise<ProductsResponse> => {
    try {
        const response = await apiClient.get(`category/${categorySlug}?limit=18`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error("Ошибка получения товаров, обновите страницу и попробуйте снова");
        } else {
            throw new Error("Произошла неожиданная ошибка, попробуйте снова");
        }
    }
}
export const getProductDetail = async (id: string) : Promise<Product>=> {
    try {
        const response = await apiClient.get(id);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error("Ошибка получения товара, обновите страницу и попробуйте снова");
        } else {
            throw new Error("Произошла неожиданная ошибка, попробуйте снова");
        }
    }
}



export const getProducts1 = async (pageParam: number) => {
    if (typeof pageParam === 'number') {
        const limit = 18;
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${pageParam * limit}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } else {
        throw new Error("pageParam must be a number.")
    }
}
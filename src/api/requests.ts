import {TCategory, TProduct, TProductsResponse, TSearchProduct, TUser} from "@/types";


export const getCategories = async (): Promise<TCategory[]> => {
    try {
        const response = await fetch('https://dummyjson.com/products/categories');
        return response.json();
    } catch (error) {
        throw new Error('getCategories. Network response was not ok' + error);
    }
};


export const getInitialALlProducts = async (): Promise<TProductsResponse> => {
    try {
        const response = await fetch(`https://dummyjson.com/products?limit=18`);
        return response.json();
    } catch (error) {
        throw new Error('getInitialALlProducts. Network response was not ok' + error);
    }
}
export const getInitialCategoryProducts = async (categorySlug: string): Promise<TProductsResponse> => {
    try {
        const response = await fetch(`https://dummyjson.com/products/category/${categorySlug}?limit=18`);
        return response.json();
    } catch (error) {
        throw new Error('getInitialCategoryProducts. Network response was not ok' + error);
    }
}
export const getProductDetail = async (id: string): Promise<TProduct> => {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        return response.json();
    } catch (error) {
        throw new Error('getProductDetail. Network response was not ok' + error);
    }
}

export const findCategoryName = async (categorySlug: string): Promise<TCategory | undefined> => {
    const categories = await getCategories();
    return categories.find(item => item.slug === categorySlug)
}

export const searchProducts = async (query: string): Promise<TSearchProduct[]> => {
    try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const data = await response.json();
        return data.products;
    } catch (error) {
        throw new Error('searchProducts. Network response was not ok' + error);
    }
}


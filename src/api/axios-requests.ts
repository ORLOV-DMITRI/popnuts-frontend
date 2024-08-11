import {TCustomProduct, TNewUser, TOrder, TUser, TWallet} from "@/types";
import {apiClient} from "@/settings/react-query/axios-instance";
import axios from "axios";

export async function logIn({email, password}: TNewUser) : Promise<TUser>{
    try {
        const response = await apiClient.post('/user/login', {email, password});
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message);
        } else {
            throw new Error("An unexpected error occurred, the form is again");
        }
    }
}

export async function getUser(): Promise<TUser> {
    try {

        const response = await apiClient.get('/user/current');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message);
        } else {
            throw new Error("An unexpected error occurred, the form is again");
        }
    }
}

export async function getFavorites(): Promise<TCustomProduct[]> {
    try {
        const response = await apiClient.get('/favorites');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to fetch favorites");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export async function toggleFavorite(product: TCustomProduct): Promise<TCustomProduct> {
    try {
        const response = await apiClient.post('/favorites/toggle', product);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to add to favorites");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export async function getBasket(): Promise<TCustomProduct[]> {
    try {
        const response = await apiClient.get('/basket');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to fetch basket");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export async function addBasket(product: TCustomProduct): Promise<TCustomProduct> {
    try {
        const response = await apiClient.post('/basket/add', product);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to add to basket");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}
export async function removeBasket(productId: number) {
    try {
         await apiClient.post('/basket/remove', {productId});
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to add to basket");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}
export async function deleteBasket(productId: number) {
    try {
         await apiClient.post('/basket/delete', {productId});
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to add to basket");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}



export async function getWalletInfo(): Promise<TWallet> {
    try {
        const response = await apiClient.get('/wallet/');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to fetch wallet info");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}
export async function spendFromWallet(amount: number) {
    try {
        await apiClient.post('/wallet/spend', { amount });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to spend from wallet");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}
export async function depositToWallet(currency: 'USD' | 'Coin', amount: number) {
    try {
        await apiClient.post('/wallet/deposit', { currency, amount });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to deposit to wallet");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}
export async function convertCurrency(fromCurrency: 'USD' | 'Coin', toCurrency: 'USD' | 'Coin', amount: number) {
    try {
        await apiClient.post('/wallet/convert', { fromCurrency, toCurrency, amount });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to convert currency");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}
export async function setPreferredCurrency(currency: 'USD' | 'Coin') {
    try {
        await apiClient.post('/wallet/set-currency', { currency });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to set preferred currency");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}
export async function checkOrder() {
    try {
        await apiClient.post('/order/checkout', );
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to set preferred currency");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}
export async function getOrders(): Promise<TOrder[]> {
    try {
        const response = await apiClient.get('/order/history');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to fetch wallet info");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

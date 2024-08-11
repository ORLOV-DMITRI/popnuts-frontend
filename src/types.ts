export type TSearchProduct = {
    id: number;
    title: string;
    category: string;
}
export type TCustomProduct = {
    productId: number;
    category: string;
    title: string;
    price: number;
    discountPercentage: number;
    rating: number;
    brand: string;
    stock: number;
    thumbnail: string;
    count: number
}

export type TProduct = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: {
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    thumbnail: string;
    images: string[];
};

export type TProductsResponse = {
    products: TProduct[];
    total: number;
    skip: number;
    limit: number;
};

export type TCategory = {
    slug: string
    name: string,
    url: string
}
export type TSort = { sortBy: string, order: 'asc' | 'desc' }
export type TSortItem = {
    name: string,
    value: TSort
}
export type TFilterItem = {
    field: keyof TProduct;
    value: string
}

export type TUser = {
    id: string
    email: string
    token: string
}
export type TNewUser = {
    password: string
    email: string
}
export type TWallet = { walletUSD: number, walletCoin: number, preferredCurrency: string }

export type TOrder = {
    id: number
    createdAt: Date
    totalPrice: number,
    currency: string,
    items: TCustomProduct[]
}

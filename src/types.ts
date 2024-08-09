

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
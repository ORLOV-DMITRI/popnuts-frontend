import {TCustomProduct, TProduct} from "@/types";

export function convertProductFavorite(product: TProduct): TCustomProduct {
    
    const favoriteProduct: TCustomProduct = {
        productId: product.id,
        title: product.title,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        brand: product.brand,
        stock: product.stock,
        thumbnail: product.thumbnail,
        category: product.category,
        count: 1,
    }
    
    return favoriteProduct
    
}

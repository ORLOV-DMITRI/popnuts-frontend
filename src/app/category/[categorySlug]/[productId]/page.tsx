import {getProductDetail} from "@/api/requests";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import {notFound} from "next/navigation";
import Breadcrumbs from "@/components/ui/BreadCrumps/Breadcrumbs";
import React from "react";
import {ProductsResponse} from "@/types";

export const revalidate = 60;

export default async function ProductDetailPage({params}: { params: { productId: string } }) {
    const productDetail = await getProductDetail(params.productId);
    
    if (!productDetail) {
        return notFound()
    }
    
    return <div>
        <Breadcrumbs path={[{link: `category/${productDetail.category}`, label: productDetail.category}, {
            link: '#',
            label: productDetail.title
        }]}/>
        <ProductDetail product={productDetail}/>
        {/*<SeeAlso/>*/}
    </div>
}

export async function generateStaticParams() {
    const data = await fetch(`https://dummyjson.com/products`)
    
    const products: ProductsResponse = await data.json()
    
    return products.products.map(item => ({
        productId: item.id.toString()
    }))
}

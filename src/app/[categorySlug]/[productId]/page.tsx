import {getProductDetail} from "@/api/requests";
import ProductDetail from "@/components/detail-page/ProductDetail/ProductDetail";
import {notFound} from "next/navigation";
import Breadcrumbs from "@/components/ui/BreadCrumps/Breadcrumbs";
import React from "react";
import SeeAlso from "@/components/shared/SeeAlso/SeeAlso";



export async function generateMetadata({params}: { params: { productId: string } }) {

    try {
        const productDetail = await getProductDetail(params.productId);
        return {
            title: `Popnuts - ${productDetail.title}` ,
        }
    } catch (error) {
        return {
            title: "Not Found",
        }
    }

}

export default async function ProductDetailPage({params}: { params: { productId: string } }) {

    try {
        const productDetail = await getProductDetail(params.productId);
        return <div>
            <Breadcrumbs path={[{link: `${productDetail.category}`, label: productDetail.category}, {
                link: '#',
                label: productDetail.title
            }]}/>
            <ProductDetail product={productDetail}/>
            <SeeAlso/>
        </div>
    } catch (error) {
        return notFound()
    }

}

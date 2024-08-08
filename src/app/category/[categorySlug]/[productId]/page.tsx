import {getProductDetail} from "@/api/requests";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import {notFound} from "next/navigation";
import Breadcrumbs from "@/components/ui/BreadCrumps/Breadcrumbs";

export default async function ProductDetailPage({params}: {params: {productId: string}}) {
    const productDetail = await getProductDetail(params.productId);

    if(!productDetail) {
        return notFound()
    }
    
    return <div>
        <Breadcrumbs path={[{link: `category/${productDetail.category}`, label: productDetail.category},{link: '#', label: productDetail.title}]}/>
        <ProductDetail product={productDetail}/>
    </div>
}
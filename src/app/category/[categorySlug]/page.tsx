import ProductsList from "@/components/ProductsList/ProductsList";
import {getInitialCategoryProducts} from "@/api/requests";
import {notFound} from "next/navigation";
import {getLimitCategoryProducts} from "@/api/server-actions";
import Breadcrumbs from "@/components/ui/BreadCrumps/Breadcrumbs";


export default async function Category({params}: {params: {categorySlug:string}}) {


    const products = await getInitialCategoryProducts(params.categorySlug);
    if(!products) {
        notFound()
    }
    return (
        <div>
            <Breadcrumbs path={[{link: '#', label: params.categorySlug}]}/>
            <ProductsList products={products} queryKeys={['products', params.categorySlug]} apiCall={getLimitCategoryProducts}/>
        </div>
    );
}

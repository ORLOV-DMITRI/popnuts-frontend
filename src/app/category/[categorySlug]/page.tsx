import ProductsList from "@/components/ProductsList/ProductsList";
import {getInitialCategoryProducts} from "@/api/requests";
import {notFound} from "next/navigation";
import {getLimitCategoryProducts} from "@/api/server-actions";
import Breadcrumbs from "@/components/ui/BreadCrumps/Breadcrumbs";

export const revalidate = 60;

export default async function Category({params}: { params: { categorySlug: string } }) {
    console.log(params.categorySlug)
    const products = await getInitialCategoryProducts(params.categorySlug);
    if (!products) {
        notFound()
    }
    return (
        <div>
            <Breadcrumbs path={[{link: '#', label: params.categorySlug}]}/>
            <ProductsList products={products} queryKeys={['products', params.categorySlug]} apiCall={getLimitCategoryProducts}/>
        </div>
    );
}

export async function generateStaticParams() {
    const data = await fetch('https://dummyjson.com/products/category-list')
    
    const categories: string[] = await data.json()
    
    
    return categories.map(item => ({
        categorySlug: item
    }))
}

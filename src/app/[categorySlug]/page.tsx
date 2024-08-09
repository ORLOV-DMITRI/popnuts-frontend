import {findCategoryName, getInitialCategoryProducts} from "@/api/requests";
import {notFound} from "next/navigation";
import Breadcrumbs from "@/components/ui/BreadCrumps/Breadcrumbs";
import CategoryDetail from "@/components/CategoryDetail/CategoryDetail";

export const revalidate = 60;



export async function generateMetadata({params}: { params: { categorySlug: string } }) {
    const category = await findCategoryName(params.categorySlug)
    
    return {
        title: `Popnuts - ${category?.name}` ,
    }
}

export default async function CategoryPage({params}: { params: { categorySlug: string } }) {
    
    try {
        const products = await getInitialCategoryProducts(params.categorySlug);
        if(!products || products.products.length ===0) {
            return  notFound()
        }
        
        const category = await findCategoryName(params.categorySlug)
        
        if(!category) {
            return  notFound()
        }
        
        return (
            <div>
                <Breadcrumbs path={[{link: '#', label: params.categorySlug}]}/>
                <CategoryDetail products={products} category={category}/>
            </div>
        );
    }catch (error) {
        return  notFound()
    }
    
 
}

export async function generateStaticParams() {
    const data = await fetch('https://dummyjson.com/products/category-list')
    const categories: string[] = await data.json()
    return categories.map(item => ({
        categorySlug: item
    }))
}

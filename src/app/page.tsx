import ProductsList from "@/components/shared/ProductsList/ProductsList";
import {getInitialALlProducts} from "@/api/requests";
import {getLimitProducts} from "@/api/server-actions";



export default async function Home() {
    
    const products = await getInitialALlProducts();
    
    return (
        <div>
            <ProductsList products={products} queryKeys={['products']} apiCall={getLimitProducts}/>
        </div>
    );
}

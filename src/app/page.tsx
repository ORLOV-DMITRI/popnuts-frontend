import ProductsList from "@/components/shared/ProductsList/ProductsList";
import {getInitialALlProducts} from "@/api/requests";
import {getLimitProducts} from "@/api/server-actions";
import Banner from "@/components/home-page/Banner/Banner";



export default async function Home() {
    
    const products = await getInitialALlProducts();
    
    return (
        <div>
            <Banner/>
            <ProductsList products={products} queryKeys={['products']} apiCall={getLimitProducts}/>
        </div>
    );
}

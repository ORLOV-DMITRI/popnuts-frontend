import styles from './SeeAlso.module.scss'
import ProductsList from "@/components/shared/ProductsList/ProductsList";
import {getLimitProducts} from "@/api/server-actions";
import React from "react";
import {getInitialALlProducts} from "@/api/requests";

type TProps = {
    isMainPage: boolean
}

export default async function SeeAlso() {
    const products = await getInitialALlProducts();
    
    return (
        <div className={styles.moreProduct}>
            <h3>See also</h3>
            <ProductsList products={products} queryKeys={['products']} apiCall={getLimitProducts} isMainPage={true}/>
        </div>
    );
}

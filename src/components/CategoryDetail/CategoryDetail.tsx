'use client'
import styles from './CategoryDetail.module.scss'
import {TCategory, TFilterItem, TProductsResponse, TSortItem} from "@/types";
import {useState} from "react";
import ProductsList from "@/components/ProductsList/ProductsList";
import {getLimitCategoryProducts} from "@/api/server-actions";
import CategoryFilters from "@/components/CategoryFilters/CategoryFilters";

type Props = {
    products: TProductsResponse
    category: TCategory
}

export default function CategoryDetail({products, category}: Props) {

    const [sortType, setSortType] = useState<TSortItem | null>(null);
    const [filterType, setFilterType] = useState<TFilterItem | null>(null);
    console.log(sortType)
    const handleSetSort = (sortItem: TSortItem) => {
        setSortType(sortItem)
    }
    const handleSetFilter = (filterItem: TFilterItem | null) => {
        setFilterType(filterItem)
    }

    return (
        <section className={styles.categoryDetail}>
            <h1 className={styles.title}>
                {category.name}
                <span>{products.products.length} products</span>
            </h1>
            <CategoryFilters products={products} setSortType={handleSetSort} setFilterType={handleSetFilter}
                             currentSort={sortType} currentFilter={filterType}/>
            <ProductsList products={products} queryKeys={['products', category.slug]} categorySlug={category.slug}
                          apiCall={getLimitCategoryProducts} sortData={sortType} filterData={filterType}/>
        </section>
    );
}

import styles from './CategoryFilters.module.scss'
import {TFilterItem, TProductsResponse, TSortItem} from "@/types";
import FilterItem from "@/components/category-page/CategoryFilters/FilterItem/FilterItem";

type Props = {
    products: TProductsResponse
    setSortType: (sortItem: TSortItem) => void
    setFilterType: (filterName: TFilterItem | null) => void
    currentSort: TSortItem | null
    currentFilter: TFilterItem | null
}

const priceSort: TSortItem[] = [
    {
        name: 'Expensive',
        value: {sortBy: 'price', order: 'asc'}
    },
    {
        name: 'Inexpensive',
        value: {sortBy: 'price', order: 'desc'}
    },
]
const popularitySort: TSortItem[] = [
    {
        name: 'Most Popular',
        value: {sortBy: 'rating', order: 'asc'}
    },
    {
        name: 'Least Popular',
        value: {sortBy: 'rating', order: 'desc'}
    },
]

export default function CategoryFilters({products, setSortType, setFilterType, currentSort, currentFilter}: Props) {

    const handleSelectSort = (sortItem: TSortItem) => {
        setSortType(sortItem)
    }
    const handleSelectFilter = (filterName: TFilterItem | null) => {
        setFilterType(filterName)
    }

    return (
        <div className={styles.filters}>
            <FilterItem title='Sort by Price' setSortType={handleSelectSort} sortData={priceSort} currentSort={currentSort}/>
            <FilterItem title='Sort by Popularity' setSortType={handleSelectSort} sortData={popularitySort} currentSort={currentSort}/>

            {products.products.every(item => item.brand) && (
                <FilterItem title='Brand' setFilterType={handleSelectFilter} filterData={products.products} currentFilter={currentFilter}/>
            )}
        </div>
    );
}

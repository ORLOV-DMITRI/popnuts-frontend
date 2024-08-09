import styles from './FilterItem.module.scss'
import {TFilterItem, TProduct, TSortItem} from "@/types";
import {useState} from "react";
import cn from "classnames";

type Props = {
    sortData?: TSortItem[]
    filterData?: TProduct[]
    setSortType?: (sortItem: TSortItem) => void
    setFilterType?: (filterName: TFilterItem | null) => void
    type?: 'sort' | 'filter'
    title: string
    currentSort?: TSortItem | null
    currentFilter?: TFilterItem | null
}

export default function FilterItem({
                                       sortData,
                                       setSortType,
                                       filterData,
                                       title,
                                       setFilterType,
                                       currentFilter,
                                       currentSort,
                                       type = 'sort'
                                   }: Props) {

    const [isOpenFilter, setIsOpenFilter] = useState(false)

    const handleSelectSort = (item: TSortItem) => {
        setSortType && setSortType(item)
        setIsOpenFilter(false)
    }
    const handleSelectFilter = (filterName: TFilterItem | null) => {
        setFilterType && setFilterType(filterName)
        setIsOpenFilter(false)
    }


    return (
        <div className={styles.filterItem}>
            <button className={styles.filterBtn} onClick={() => setIsOpenFilter(prevState => !prevState)}>
                {title}
            </button>
            <ul className={cn(styles.filterContent, isOpenFilter && styles.open)}>
                {sortData && (
                    sortData.map((item, index) => (
                        <li className={cn(styles.filterValue, currentSort?.name === item.name && styles.active)}
                            onClick={() => handleSelectSort(item)}
                            key={index}>{item.name}</li>
                    ))
                )}
                {filterData && (
                    <>
                        <li className={styles.filterValue} onClick={() => handleSelectFilter(null)}>All</li>
                        {Array.from(new Set(filterData.map(product => product.brand))).map((brand, index) => (
                            <li key={index}
                                className={cn(styles.filterValue, currentFilter?.value === brand && styles.active)}
                                onClick={() => handleSelectFilter({field: 'brand', value: brand})}>{brand}</li>
                        ))}
                    </>

                )}
            </ul>
        </div>
    );
}

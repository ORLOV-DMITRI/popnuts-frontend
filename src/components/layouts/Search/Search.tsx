import styles from './Search.module.scss'
import {ChangeEvent, useEffect, useState} from "react";
import {useSearchRecord} from "@/api/useSearchQuery";
import Link from "next/link";
import useOutsideClick from "@/hooks/useOutsideClick";
import cn from "classnames";
import CloseIcon from '/public/svg/close.svg'
import {debounce} from "lodash";


export default function Search() {
    const [searchValue, setSearchValue] = useState('')
    const {mutate, data: products, isPending, isSuccess} = useSearchRecord()
    const [isOpenSearchResult, setIsOpenSearchResult] = useState(false)
    const ref = useOutsideClick<HTMLDivElement>(() => setIsOpenSearchResult(false));
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }
    
    const handleSearch = debounce(() => {
        mutate(searchValue);
        setIsOpenSearchResult(true)
    }, 300)
    
    
    useEffect(() => {
        if (searchValue.length < 1) {
            setIsOpenSearchResult(false)
        } else {
            handleSearch()
        }
    }, [searchValue])
    
    const handleClickResult = () => {
        setIsOpenSearchResult(false)
        setSearchValue('')
    }
    
    const handleClickSearch = () => {
        if (searchValue.length > 0) {
            setIsOpenSearchResult(true)
        }
    }
    return (
        <div className={styles.search} ref={ref}>
            <input type="text" placeholder={'Search'} onChange={handleChange} value={searchValue} onClick={handleClickSearch}/>
            {isOpenSearchResult && (
                <>
                    <button className={styles.clear} onClick={() => setSearchValue('')}>
                        <CloseIcon/>
                    </button>
                    
                    <div className={cn(styles.searchResult)}>
                        {isPending && (
                            <ul className={styles.skeleton}>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        )}
                        {isSuccess && (
                            <ul className={styles.resultList}>
                                {products && products?.length > 0 && (
                                    products.slice(0, 6).map(item => (
                                        <li className={styles.resultItem} key={item.id}>
                                            <Link href={`/${item.category}/${item.id}`}
                                                  className={styles.resultLink}
                                                  onClick={handleClickResult}>
                                                <span className={styles.icon}></span>
                                                <span className={styles.text}>{item.title}</span>
                                            </Link>
                                        </li>
                                    ))
                                )}
                            </ul>
                        )}
                        {products && products.length === 0 && (
                            <div className={styles.notFound}>No results were found for your request</div>
                        )}
                    </div>
                
                </>
            
            )}
        </div>
    );
}

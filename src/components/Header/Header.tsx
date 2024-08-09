'use client'
import styles from './Header.module.scss'
import FavoritesIcon from '/public/svg/favorites.svg'
import BasketIcon from '/public/svg/basket.svg'
import UserIcon from '/public/svg/user.svg'
import Link from "next/link";
import HeaderMenu from "@/components/HeaderMenu/HeaderMenu";
import Modal from "@/components/ui/Modal/Modal";
import {TCategory} from "@/types";
import {useState} from "react";
import cn from "classnames";


type Props = {
    categories: TCategory[]
}
export default function Header({categories}:Props) {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    
    const toggleMenu = () => {
        setIsOpenMenu(prevState => !prevState)
    }
    return (
        <header className={cn(styles.header, 'header')} style={{zIndex: isOpenMenu ? 1000 : 10}}>
            <div className="container">
                <div className={styles.wrapper}>
                    <Link href={'/'} className={styles.logo}>popnuts</Link>
                    
                    <button className={cn(styles.menu, isOpenMenu && styles.open)} onClick={toggleMenu}>
                        <span className={styles.menuLine}></span>
                    </button>
                    <div className={styles.search}>
                        <input type="search" placeholder={'Search'}/>
                    </div>
                    <div className={styles.actions}>
                        <Link href={'#'} className={styles.favorites}>
                            <FavoritesIcon/>
                            Favorites
                        </Link>
                        <Link href={'#'} className={styles.basket}>
                            <BasketIcon/>
                            Basket
                        </Link>
                        <Link href={'#'} className={styles.auth}>
                            <UserIcon/>
                            SignIn
                        </Link>
                    </div>
                </div>
            </div>
            <Modal variant='menu' isOpen={isOpenMenu} onClose={() => setIsOpenMenu(false)} >
                <HeaderMenu categories={categories} onClose={() => setIsOpenMenu(false)}/>
            </Modal>
        </header>
    );
}

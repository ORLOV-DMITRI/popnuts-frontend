'use client'
import styles from './NavMobile.module.scss'
import MenuIcon from '/public/svg/mobileMenu.svg'
import HomeIcon from '/public/svg/home.svg'
import FavoritesIcon from '/public/svg/favorites.svg'
import BasketIcon from '/public/svg/basket.svg'
import UserIcon from '/public/svg/user.svg'
import Link from "next/link";
import Modal from "@/components/ui/Modal/Modal";
import HeaderMenu from "@/components/layouts/HeaderMenu/HeaderMenu";
import {useState} from "react";
import {TCategory, TUser} from "@/types";
import {useUserQuery} from "@/api/user/useUserQuery";
import {useFavoritesQuery} from "@/api/favorites/useFavoritesQuery";
import {useBasketQuery} from "@/api/basket/useBasketQuery";
import {usePathname} from "next/navigation";
import cn from "classnames";

type Props = {
    categories: TCategory[]
    user?: TUser
}
export default function NavMobile({categories, user}:Props) {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const toggleMenu = () => {
        setIsOpenMenu(prevState => !prevState)
    }
    const closeMenu = () => {
        setIsOpenMenu(prevState => !prevState)
    }
    const {data: userData} = useUserQuery(user)
    const {data: favoriteProducts} = useFavoritesQuery()
    const {data: basketProducts} = useBasketQuery()
    const path = usePathname()
    
    return (
        <div className={styles.nav} style={{zIndex: isOpenMenu ? 1000 : 10}}>
            <div className={styles.actions}>
                <Link href={'/'} className={cn(styles.navItem, path === '/' && styles.active)} onClick={closeMenu}>
                    <HomeIcon/>
                </Link>
                <button className={cn(styles.navItem, isOpenMenu && styles.active)} onClick={toggleMenu}>
                    <MenuIcon/>
                </button>
                <Link href={'/lk/favorites'} className={cn(styles.navItem, path === '/lk/favorites' && styles.active)} onClick={closeMenu}>
                    <FavoritesIcon/>
                    {favoriteProducts && favoriteProducts?.length > 0 && (
                        <span className={styles.counter}>{favoriteProducts.length}</span>
                    )}
                </Link>
                <Link href={'/lk/basket'} className={cn(styles.navItem, path === '/lk/basket' && styles.active)} onClick={closeMenu}>
                    <BasketIcon/>
                    {basketProducts && basketProducts?.length > 0 && (
                        <span className={styles.counter}>{basketProducts.length}</span>
                    )}
                </Link>
                <Link href={'/lk/orders'} className={cn(styles.navItem, path === '/lk/orders' && styles.active)} onClick={closeMenu}>
                    <UserIcon/>
                </Link>
            </div>
            <Modal variant='menu' isOpen={isOpenMenu} onClose={() => setIsOpenMenu(false)}>
                <HeaderMenu categories={categories} onClose={() => setIsOpenMenu(false)}/>
            </Modal>
        </div>
    );
}

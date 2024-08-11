'use client'
import styles from './Header.module.scss'
import FavoritesIcon from '/public/svg/favorites.svg'
import BasketIcon from '/public/svg/basket.svg'
import OrdersIcon from '/public/svg/orders.svg'
import WalletIcon from '/public/svg/wallet.svg'
import UserIcon from '/public/svg/user.svg'
import Link from "next/link";
import Modal from "@/components/ui/Modal/Modal";
import {TCategory, TUser} from "@/types";
import {useState} from "react";
import cn from "classnames";
import Search from "@/components/layouts/Search/Search";
import HeaderMenu from "@/components/layouts/HeaderMenu/HeaderMenu";
import {usePathname} from "next/navigation";
import {useUserQuery} from "@/api/user/useUserQuery";
import useLogout from "@/api/user/useLogout";
import {useFavoritesQuery} from "@/api/favorites/useFavoritesQuery";
import {useBasketQuery} from "@/api/basket/useBasketQuery";


type Props = {
    categories: TCategory[]
    user?: TUser
}
export default function Header({categories, user}: Props) {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const toggleMenu = () => {
        setIsOpenMenu(prevState => !prevState)
    }
    
    const {data: userData} = useUserQuery(user)
    const {data: favoriteProducts} = useFavoritesQuery()
    const {data: basketProducts} = useBasketQuery()
    const path = usePathname()
    const handleLogout = useLogout()
    
    return (
        <header className={cn(styles.header, 'header')} style={{zIndex: isOpenMenu ? 1000 : 10}}>
            <div className="container">
                <div className={styles.wrapper}>
                    <Link href={'/'} className={styles.logo}>popnuts</Link>
                    
                    <button className={cn(styles.menu, isOpenMenu && styles.open)} onClick={toggleMenu}>
                        <span className={styles.menuLine}></span>
                    </button>
                    <Search/>
                    <div className={styles.actions}>
                        <Link href={'/lk/favorites'} className={styles.actionsItem}>
                            <FavoritesIcon/>
                            {favoriteProducts && favoriteProducts?.length > 0 && (
                                <span className={styles.counter}>{favoriteProducts.length}</span>
                            )}
                            Favorites
                        </Link>
                        <Link href={'/lk/basket'} className={styles.actionsItem}>
                            <BasketIcon/>
                            {basketProducts && basketProducts?.length > 0 && (
                                <span className={styles.counter}>{basketProducts.length}</span>
                            )}
                            Basket
                        </Link>
                        {userData ?
                            (
                                <div className={styles.profile}>
                                    <Link href={`/lk/basket`}
                                          className={cn(styles.auth, styles.actionsItem, path.startsWith('/login') && styles.disabled)}>
                                        <UserIcon/>
                                        Profile
                                    </Link>
                                    <div className={styles.profileMenu}>
                                        <div className={styles.profileList}>
                                            <Link href={'/lk/orders'} className={styles.profileMenuItem}>
                                                <span><OrdersIcon/></span>
                                                <span>Purchases</span>
                                            </Link>
                                            <Link href={'/lk/favorites'} className={styles.profileMenuItem}>
                                                <span><FavoritesIcon/></span>
                                                <span>Favorites</span>
                                            </Link>
                                            <Link href={'/lk/basket'} className={styles.profileMenuItem}>
                                                <span><BasketIcon/> </span>
                                                <span>Basket</span>
                                            </Link>
                                            <Link href={'/lk/payment'} className={styles.profileMenuItem}>
                                                <span><WalletIcon/></span>
                                                <span>Wallet</span>
                                            </Link>
                                            <button className={styles.logout} onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </div>
                                    
                                    </div>
                                </div>
                            
                            )
                            :
                            (
                                <Link href={`/login${path}`}
                                      className={cn(styles.auth, styles.actionsItem, path.startsWith('/login') && styles.disabled)}>
                                    <UserIcon/>
                                    SignIn
                                </Link>
                            )
                        }
                    </div>
                </div>
            </div>
            <Modal variant='menu' isOpen={isOpenMenu} onClose={() => setIsOpenMenu(false)}>
                <HeaderMenu categories={categories} onClose={() => setIsOpenMenu(false)}/>
            </Modal>
        </header>
    );
}

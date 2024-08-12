'use client'
import styles from './LkNavigation.module.scss'
import Link from "next/link";
import FavoritesIcon from '/public/svg/favorites.svg'
import BasketIcon from '/public/svg/basket.svg'
import OrdersIcon from '/public/svg/orders.svg'
import WalletIcon from '/public/svg/wallet.svg'
import {usePathname} from "next/navigation";
import cn from "classnames";
const navLinks = [
    {
        name: 'Favorites',
        link: '/lk/favorites',
        Icon: FavoritesIcon
    },
    {
        name: 'Basket',
        link: '/lk/basket',
        Icon: BasketIcon
    },
    {
        name: 'Purchases',
        link: '/lk/orders',
        Icon: OrdersIcon
    },
    {
        name: 'Wallet',
        link: '/lk/payment',
        Icon: WalletIcon
    },
]

export default function LkNavigation() {
    const path = usePathname()
    return (
        <div className={styles.nav}>
            <ul className={styles.navList}>
                {navLinks.map((item, index) => (
                    <li key={index} className={styles.navItem}>
                        <Link href={item.link} className={cn(styles.navLink, path === item.link && styles.active)}>
                            <span className={styles.icon}><item.Icon/></span>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
                <li  className={styles.navItem}>
                    <div className={cn(styles.navLink)}>
                        <span>Logout</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}

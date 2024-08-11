import styles from './NavMobile.module.scss'
import MenuIcon from '/public/svg/mobileMenu.svg'
import HomeIcon from '/public/svg/home.svg'
import FavoritesIcon from '/public/svg/favorites.svg'
import BasketIcon from '/public/svg/basket.svg'
import UserIcon from '/public/svg/user.svg'
import Link from "next/link";

export default function NavMobile() {
    return (
        <div className={styles.nav}>
            <div className={styles.actions}>
                <Link href={'#'} className={styles.navItem}>
                    <HomeIcon/>
                </Link>
                <button className={styles.navItem}>
                    <MenuIcon/>
                </button>
                <Link href={'#'} className={styles.navItem}>
                    <FavoritesIcon/>
                </Link>
                <Link href={'#'} className={styles.navItem}>
                    <BasketIcon/>
                </Link>
                <Link href={'#'} className={styles.navItem}>
                    <UserIcon/>
                </Link>
            </div>
        </div>
    );
}

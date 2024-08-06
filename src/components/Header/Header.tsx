import styles from './Header.module.scss'
import MenuIcon from '/public/svg/burger.svg'
import FavoritesIcon from '/public/svg/favorites.svg'
import BasketIcon from '/public/svg/basket.svg'
import UserIcon from '/public/svg/user.svg'
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.wrapper}>
                    <Link href={'/'} className={styles.logo}>popnuts</Link>
                    <button className={styles.menu}>
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
        </header>
    );
}

'use client'
import styles from './HeaderMenu.module.scss'
import MenuIcon from '/public/svg/burger.svg'
import FavoritesIcon from '/public/svg/favorites.svg'
import BasketIcon from '/public/svg/basket.svg'
import UserIcon from '/public/svg/user.svg'
import Link from "next/link";
import {getCategories} from "@/api/requests";
import {useEffect} from "react";
import {Category} from "@/types";

type Props = {
    categories: Category[]
    onClose: ()=> void
}
export default function HeaderMenu({categories, onClose} : Props) {
    return (
      <div className={styles.menu}>
          <div className={styles.title}>Categories</div>
          <ul className={styles.menuList}>
              {categories.map(item => (
                  <li key={item.name}>
                      <Link href={`/category/${item.slug}`} className={styles.menuItemLink} onClick={onClose}>
                          {item.name}
                      </Link>
                  </li>
              ))}
          </ul>
      </div>
    );
}

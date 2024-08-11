'use client'
import styles from './HeaderMenu.module.scss'
import Link from "next/link";
import {TCategory} from "@/types";

type Props = {
    categories: TCategory[]
    onClose: ()=> void
}
export default function HeaderMenu({categories, onClose} : Props) {
    return (
      <div className={styles.menu}>
          <div className={styles.title}>Categories</div>
          <ul className={styles.menuList}>
              {categories.map(item => (
                  <li key={item.name}>
                      <Link href={`/${item.slug}`} className={styles.menuItemLink} onClick={onClose}>
                          {item.name}
                      </Link>
                  </li>
              ))}
          </ul>
      </div>
    );
}

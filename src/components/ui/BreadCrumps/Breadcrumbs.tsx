import cn from "classnames";
import styles from './BreadCrumps.module.scss'
import Link from "next/link";

type Props = {
    path: { link: string, label: string }[],
}
export default function Breadcrumbs({path}: Props) {
    let accumulatedPath = "";
    
    return (
        <div className={cn(styles.breadCrumbs)}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link href="/" title="Home">
                        Home
                    </Link>
                </li>
                {path.map((item, index) => {
                    accumulatedPath += `/${item.link}`;
                    return (
                        <li key={index} className={styles.item}>
                            <a href={accumulatedPath} title={`${item.label}`}>
                                {item.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

import styles from './Loader.module.scss'
import cn from "classnames";

type Props = {
    className?: string
    size?: 'big' | 'small'
}
export default function Loader({className = '', size = 'big'}:Props) {
  
    return (
        <div className={cn(styles.loaderContainer, className)}>
            <div className={cn(styles.loader, styles[size])}></div>
        </div>
    )
}
import styles from './LoaderImage.module.scss'
import cn from "classnames";

type Props = {
    className?: string
}
export default function LoaderImage({className = ''}:Props) {
  
    return (
        <div className={cn(styles.loaderContainer, className)}>
            <div className={cn(styles.skeleton)}></div>
        </div>
    )
}
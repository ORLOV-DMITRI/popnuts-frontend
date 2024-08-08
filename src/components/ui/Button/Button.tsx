import styles from './Button.module.scss'
import cn from "classnames";


type Props = {
  className?: string,
  variant?: 'primary'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({className, variant = 'primary', ...props}: Props) {
  return (<button className={cn(styles.btn, className, styles[variant])} {...props}/>)
};

import styles from './Input.module.scss'
import {FieldHookConfig, useField} from "formik";
import cn from "classnames";

type TProps = {
    label?: string
    className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Input({label, className, ...props}:TProps & FieldHookConfig<string> ) {
    
    const [field, {error, touched}] = useField(props);
    
    return (
        
        <div className={cn(styles.field, className ? className : '',
            error && touched && error && styles.field_error)}>
            <label htmlFor='field'>
                {label}
            </label>
            <input  maxLength={props.maxLength} type={props.type} {...field} name={props.name} placeholder={props.placeholder}
                    className={styles.input} onFocus={(e) => e.target.select()}/>
            <div className={styles.error}>{error && touched && error}</div>
        </div>
    )
}

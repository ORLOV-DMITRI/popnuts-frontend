import styles from "./Thanks.module.scss";
import CloseIcon from "/public/context-site/icons/close.svg";
import cn from "classnames";

export default function Thanks({onClose, isSucces = true}) {

    const title = isSucces ? "Супер!" : "Блин...";
    const subtitle = isSucces ?
        "Наш заботливый менеджер <br/>свяжется с вами" :
        "Что-то пошло не так.<br/>Отправьте, пожалуйста, снова.";


    return (
        <div className={cn(styles.thanks, isSucces ? styles.success : styles.error)}>

            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.subtitle} dangerouslySetInnerHTML={{__html: subtitle}}/>

                <div className={styles.icon} onClick={onClose}>
                    <CloseIcon/>
                </div>
            </div>

        </div>
    );
};
import styles from "./ModalOverlay.module.scss";
import useHidden from "@/hooks/useHidden";

type Props = {
    onClose: () => void
}


export default function ModalOverlay({onClose} : Props) {

    useHidden();

    return (
        <>
            <div className={styles.overlay} onClick={onClose}></div>
        </>
    );
}

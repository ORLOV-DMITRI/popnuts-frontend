import styles from './NotFound.module.scss'
import Button from "@/components/ui/Button/Button";
import Link from "next/link";



export default function NotFound() {
    
    return (
        <div className={styles.notFound}>
            <h1 className={styles.title}>404</h1>
            <div className={styles.subtitle}>
                Oops, page not found!
            </div>
            <Button className={styles.goHome}>
                <Link href='/'>Go to Home</Link>
            </Button>
        </div>
    );
}

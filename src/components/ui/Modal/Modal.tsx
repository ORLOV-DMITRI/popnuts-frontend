"use client";

import {createPortal} from "react-dom";
import {ReactNode, useEffect, useState} from "react";
import styles from "./Modal.module.scss";
import cn from "classnames";
import ModalOverlay from "@/components/ui/Modal/ModalOverlay";
import CloseIcon from '/public/svg/close.svg'
type Props = {
    children: ReactNode
    onClose: () => void
    isOpen: boolean
    variant?: 'modal' | 'menu'
}


export default function Modal({children, onClose, isOpen, variant = 'modal'}: Props) {
    const [mounted, setMounted] = useState(false);

    const keydownHandler = ({key}: KeyboardEvent) => {
        switch (key) {
            case "Escape":
                onClose();
                break;
            default:
        }
    };


    useEffect(() => {
        document.addEventListener("keydown", keydownHandler);
        return () => document.removeEventListener("keydown", keydownHandler);
    });
    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted && isOpen
        ? createPortal(
            <>
                <ModalOverlay onClose={onClose}/>
                <div className={cn(styles[variant])}>
                    <div className={styles.icon} onClick={onClose}><CloseIcon/></div>
                    {children}
                </div>
            </>,
            document.body
        )
        : null;
}

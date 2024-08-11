import {useEffect, useRef, useCallback, RefObject} from 'react';

export default function useOutsideClick<T extends HTMLElement>(callback: () => void): RefObject<T> {
    
    const ref = useRef<T>(null);
    
    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        },
        [callback]
    );
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);
    
    return ref;
}


import {debounce} from "lodash";
import {useState, useEffect, useMemo} from 'react';

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    const debounced = useMemo(() => debounce((newValue: string) => {
        setDebouncedValue(newValue);
    }, delay), [delay]);
    
    useEffect(() => {
        debounced(value);
        
        return () => {
            debounced.cancel();
        };
    }, [value, debounced]);
    
    return debouncedValue;
}

export default useDebounce;

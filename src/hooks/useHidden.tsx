import {useEffect} from "react";

function useHidden() {
    useEffect(() => {
        let paddingOffset = `${window.innerWidth - document.body.offsetWidth}px`;


        const header = document.querySelector(".header") as HTMLDivElement;
        if(!header) return 
        
        document.body.setAttribute("style", `overflow: hidden; padding-right: ${paddingOffset}`);
        header.style.paddingRight = paddingOffset;
        
        return () => {
            document.body.setAttribute("style", "overflow: visible; padding-right: 0");
            if (header) {
                header.style.paddingRight = "0";
            }
        };
    }, []);

}

export default useHidden;

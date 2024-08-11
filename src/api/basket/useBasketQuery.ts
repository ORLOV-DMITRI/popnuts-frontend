import {useQuery} from "@tanstack/react-query";
import {getBasket} from "@/api/axios-requests";
import Cookies from "js-cookie";


export function useBasketQuery() {
    const hasToken = Cookies.get('token');
    return useQuery({
        queryKey: ['basket'],
        queryFn: getBasket,
        retry: 1,
        enabled: !!hasToken
    
    });
    
   
}

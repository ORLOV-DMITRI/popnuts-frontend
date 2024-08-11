import {useQuery} from "@tanstack/react-query";
import {getFavorites} from "@/api/axios-requests";
import Cookies from 'js-cookie';


export function useFavoritesQuery() {
    const hasToken = Cookies.get('token');
    return useQuery({
        queryKey: ['favorites'],
        queryFn: getFavorites,
        retry: 1,
        enabled: !!hasToken
    });
    
   
}

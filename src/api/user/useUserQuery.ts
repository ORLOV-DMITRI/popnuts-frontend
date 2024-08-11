import {getUser} from "@/api/axios-requests";
import {useQuery} from "@tanstack/react-query";
import {TUser} from "@/types";


export function useUserQuery(user?:TUser) {
    return useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1,
        initialData: user ? user : null
    })
}

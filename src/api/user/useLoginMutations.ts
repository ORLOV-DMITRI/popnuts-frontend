import {useMutation, useQueryClient} from '@tanstack/react-query';
import Cookies from 'js-cookie';
import {logIn} from "@/api/axios-requests";
import {TNewUser} from "@/types";


export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    
    return  useMutation({
        mutationFn: (userData: TNewUser) => logIn(userData),
        onSuccess: (data) => {
            Cookies.set('token', data.token);
            queryClient.invalidateQueries({queryKey: ['user']});
        },
        onError: (error: Error) => {
            throw error.message;
        }
    })
};

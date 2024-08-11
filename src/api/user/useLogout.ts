import Cookies from 'js-cookie';
import {useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";


export default function useLogout() {
    const queryClient = useQueryClient();
    const router = useRouter()
    
    return () => {
        Cookies.remove('token')
        queryClient.setQueryData(['favorites'], []);
        queryClient.setQueryData(['user'], null);
        queryClient.setQueryData(['basket'], null);
        queryClient.setQueryData(['order'], null);
        router.push('/login')
        router.refresh()
    };
}

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteBasket} from "@/api/axios-requests";


export function useDeleteBasketMutation() {
    const queryClient = useQueryClient()
    
    return  useMutation({
        mutationFn: (productId: number) => deleteBasket(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['basket']})
        }
    })
    
}

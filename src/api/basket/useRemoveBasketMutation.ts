import {useMutation, useQueryClient} from "@tanstack/react-query";
import {removeBasket} from "@/api/axios-requests";


export function useRemoveBasketMutation() {
    const queryClient = useQueryClient()
    
    return  useMutation({
        mutationFn: (productId: number) => removeBasket(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['basket']})
        }
    })
    
}

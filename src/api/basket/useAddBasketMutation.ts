import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TCustomProduct} from "@/types";
import {addBasket} from "@/api/axios-requests";


export function useAddBasketMutation() {
    const queryClient = useQueryClient()
    
    return  useMutation({
        mutationFn: (product: TCustomProduct) => addBasket(product),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['basket']})
        }
    })

}

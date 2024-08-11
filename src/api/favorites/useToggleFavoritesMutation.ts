import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TCustomProduct} from "@/types";
import {toggleFavorite} from "@/api/axios-requests";


export function useToggleFavoritesMutation() {
    const queryClient = useQueryClient()
    
    return  useMutation({
        mutationFn: (product: TCustomProduct) => toggleFavorite(product),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['favorites']})
        }
    })

}

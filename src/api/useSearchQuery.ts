import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TSearchProduct} from "@/types";
import {searchProducts} from "@/api/requests";




export const useSearchRecord  = () => {
    const queryClient = useQueryClient();
    
   return useMutation<TSearchProduct[], Error, string>({
        mutationFn: (query: string) => searchProducts(query),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['search']});
        },
        
    })
};

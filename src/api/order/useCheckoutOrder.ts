import { useMutation, useQueryClient } from "@tanstack/react-query";
import {checkOrder} from "@/api/axios-requests";

export function useCheckoutOrder() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: () => checkOrder(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order'] });
            queryClient.invalidateQueries({ queryKey: ['wallet'] });
            queryClient.invalidateQueries({ queryKey: ['basket'] });
        }
    });
}

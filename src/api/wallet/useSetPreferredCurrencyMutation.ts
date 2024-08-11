import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setPreferredCurrency } from "@/api/axios-requests";

export function useSetPreferredCurrencyMutation() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (currency: 'USD' | 'Coin') => setPreferredCurrency(currency),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wallet'] });
        }
    });
}

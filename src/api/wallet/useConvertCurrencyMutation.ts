import { useMutation, useQueryClient } from "@tanstack/react-query";
import { convertCurrency } from "@/api/axios-requests";

export function useConvertCurrencyMutation() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ fromCurrency, toCurrency, amount }: { fromCurrency: 'USD' | 'Coin', toCurrency: 'USD' | 'Coin', amount: number }) => convertCurrency(fromCurrency, toCurrency, amount),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wallet'] });
        }
    });
}

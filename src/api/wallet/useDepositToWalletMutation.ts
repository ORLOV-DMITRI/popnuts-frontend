import { useMutation, useQueryClient } from "@tanstack/react-query";
import { depositToWallet } from "@/api/axios-requests";

export function useDepositToWalletMutation() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ currency, amount }: { currency: 'USD' | 'Coin', amount: number }) => depositToWallet(currency, amount),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wallet'] });
        }
    });
}

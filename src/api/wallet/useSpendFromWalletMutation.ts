import { useMutation, useQueryClient } from "@tanstack/react-query";
import { spendFromWallet } from "@/api/axios-requests";

export function useSpendFromWalletMutation() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (amount: number) => spendFromWallet(amount),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wallet'] });
        }
    });
}

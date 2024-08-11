import { useQuery } from "@tanstack/react-query";
import { getWalletInfo } from "@/api/axios-requests";

export function useWalletInfo() {
    return useQuery({
        queryKey: ['wallet'],
        queryFn: getWalletInfo
    });
}

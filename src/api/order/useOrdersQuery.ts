import { useQuery } from "@tanstack/react-query";
import {getOrders} from "@/api/axios-requests";

export function useOrdersQuery() {
    return useQuery({
        queryKey: ['order'],
        queryFn: getOrders
    });
}

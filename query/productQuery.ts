
import { api } from "@/api/api";
import { useInfiniteQuery } from "@tanstack/react-query"

export const useProducts = (category: any) => {
    return useInfiniteQuery({
        queryKey: ['products', category],
        queryFn: async ({ pageParam = 1 }) => {
            return await api.getProducts({ page: pageParam, category });
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.pagination.currentPage < lastPage.pagination.totalPages
                ? lastPage.pagination.currentPage + 1
                : undefined;
        },
        select: (data) => {
            const flatData = data.pages.flatMap((page) => page.data);
            return flatData;
        },
    });
};
import { useMemo, useState } from 'react';

type Pagination = UsePaginationReturn['pagination'];

export interface UsePaginationProps {
  search: string;
}

export interface UsePaginationReturn {
  path: string;
  pagination: {
    page: number;
    setPage: (p: Pagination['page']) => void;
  };
}

export const PAGINATION = {
  INITIAL_PAGE: 0,
} as const;

export function usePagination({ search }: UsePaginationProps): UsePaginationReturn {
  const [page, setPage] = useState<number>(PAGINATION.INITIAL_PAGE);

  const query = new URLSearchParams({
    page: (page + 1).toString(),
    search,
  });

  const path = `${query}`;

  return useMemo(
    () => ({
      path,
      pagination: {
        page,
        setPage,
      },
    }),
    [page, path],
  );
}

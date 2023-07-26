import { useMemo, useState } from 'react';

type Pagination = UsePaginationReturn['pagination'];

export interface UsePaginationProps {
  initialPath: string;
}

export interface UsePaginationReturn {
  path: string;
  pagination: {
    page: number;
    setPage: (p: Pagination['page']) => void;
  };
}

const PAGINATION = {
  INITIAL_PAGE: 0,
} as const;

export function usePagination({ initialPath }: UsePaginationProps): UsePaginationReturn {
  const [page, setPage] = useState<number>(PAGINATION.INITIAL_PAGE);

  const query = new URLSearchParams({
    page: (page + 1).toString(),
  });

  const path = `${initialPath}?${query}`;

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

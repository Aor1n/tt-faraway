import { UsePaginationReturn } from '@/hooks/usePagination';
import { ReactElement } from 'react';

export interface TableProps {
  data: Array<Record<string, string | number | ReactElement>>;
  headers: ReadonlyArray<string>;
  pagination: UsePaginationReturn['pagination'];
  count: number;
  previousPage: Nullable<string>;
  nextPage: Nullable<string>;
  isLoading: boolean;
}

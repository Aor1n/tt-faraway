import { format } from 'date-fns';
export const formatDate = (date: Nullable<Date>) => {
  if (!date) return '';

  return format(new Date(date), 'dd/LL/yy');
};

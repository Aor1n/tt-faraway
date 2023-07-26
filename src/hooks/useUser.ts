import useSWRImmutable from 'swr/immutable';

import { getUsers } from '@/api/user';
import { usePagination, UsePaginationReturn } from '@/hooks/usePagination';
import { z } from 'zod';
import { safeParse } from '@/helpers/safeParse';

const userSchema = z.object({
  name: z.string(),
  height: z.string(),
  mass: z.string(),
  hair_color: z.string(),
  skin_color: z.string(),
  eye_color: z.string(),
  birth_year: z.string(),
  gender: z.string(),
  homeworld: z.string().url(),
  films: z.array(z.string().url()),
  species: z.array(z.string().url()),
  vehicles: z.array(z.string().url()),
  starships: z.array(z.string().url()),
  created: z.coerce.date(),
  edited: z.coerce.date(),
  url: z.string().url(),
});

const usersSchema = z.object({
  results: z.array(userSchema),
  previous: z.string().url().nullable(),
  next: z.string().url().nullable(),
  count: z.number(),
});

type User = z.infer<typeof userSchema>;

type Users = z.infer<typeof usersSchema>;

interface UseUserReturn extends UsePaginationReturn {
  users: Users['results'];
  previousPage: Users['previous'];
  nextPage: Users['next'];
  count: Users['count'];
  usersAreLoading: boolean;
}

export default function useUser(search: string): UseUserReturn {
  const { path, pagination } = usePagination({
    search,
  });

  const { data, isLoading: usersAreLoading } = useSWRImmutable(path, async () => {
    const response = await getUsers<Users>(path);

    safeParse({ schema: usersSchema, data: response });

    return response;
  });

  return {
    users: data?.results ?? [],
    count: data?.count ?? 0,
    previousPage: data?.previous ?? '',
    nextPage: data?.next ?? '',
    usersAreLoading,
    pagination,
    path,
  };
}

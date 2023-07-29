import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSWRConfig } from 'swr';
import { Users } from '@/hooks/useUser';
import { extractNumberFromString } from '@/helpers/extractNumberFromString';

const numberSchema = z.number().int().positive('Value must be positive').finite();

const patchUserSchema = z.object({
  name: z.string().min(2, 'Name is too short').trim(),
  gender: z.string(),
  height: z.union([numberSchema, z.string()]),
  mass: z.union([numberSchema, z.string()]),
});

type RawUser = Users['results'][number];

export type User = z.infer<typeof patchUserSchema>;

interface UsePatchUserProps {
  user: User & Id;
  cacheKey: string;
  onSuccessfulSubmit: () => void;
}

interface UsePatchUserReturn {
  form: UseFormReturn<User>;
  handleSubmit: ReturnType<UseFormHandleSubmit<User>>;
}

export default function usePatchUser({ user, cacheKey, onSuccessfulSubmit }: UsePatchUserProps): UsePatchUserReturn {
  const defaultValues = {
    name: user.name,
    gender: user.gender,
    height: user.height,
    mass: user.mass,
  };

  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(patchUserSchema),
  });

  const { mutate, cache } = useSWRConfig();

  const handleSubmit = async (formValues: User) => {
    try {
      const cachedStore = cache.get(cacheKey);
      const storedResults = cachedStore?.data.results;

      const indexToUpdate = storedResults.findIndex((data: RawUser) => {
        const cachedId = extractNumberFromString(data.url);

        return cachedId === user.id;
      });

      if (cachedStore && indexToUpdate !== -1) {
        storedResults[indexToUpdate] = {
          ...storedResults[indexToUpdate],
          ...formValues,
        };
      }

      await mutate(
        cacheKey,
        {
          ...structuredClone(cachedStore?.data),
        },
        {
          optimisticData: true,
          revalidate: false,
        },
      );

      onSuccessfulSubmit();
    } catch (e) {
      //
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
}

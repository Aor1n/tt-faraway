import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const numberSchema = z.union([z.number().gt(0), z.string()]);

const patchUserSchema = z.object({
  name: z.string().min(2, 'Name is too short').trim(),
  gender: z.string().trim(),
  height: numberSchema,
  mass: numberSchema,
});

export type User = z.infer<typeof patchUserSchema>;

interface UsePatchUserProps {
  user: User & Id;
  onSuccessfulSubmit: () => void;
}

interface UsePatchUserReturn {
  form: UseFormReturn<User>;
  handleSubmit: ReturnType<UseFormHandleSubmit<User>>;
}

export default function usePatchUser({ user, onSuccessfulSubmit }: UsePatchUserProps): UsePatchUserReturn {
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

  const handleSubmit = async (values: User) => {
    try {
      await console.log({ ...values, id: user.id });

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

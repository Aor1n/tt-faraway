import { FieldValues, type Path, useController, UseFormReturn } from 'react-hook-form';

import { Box, capitalize, TextField as MuiTextField, type TextFieldProps, Typography } from '@mui/material';
import { ReactElement } from 'react';

type TextInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
} & TextFieldProps;

export const TextField = <T extends FieldValues>({ name, form, ...restProps }: TextInputProps<T>): ReactElement => {
  const { field } = useController({
    name,
    control: form.control,
  });

  const error = form.formState.errors[name]?.message;

  return (
    <Box sx={{ mb: 3, position: 'relative' }}>
      <MuiTextField
        label={capitalize(name)}
        value={field.value}
        onChange={field.onChange}
        onFocus={() => {
          form.clearErrors(name);
        }}
        error={!!error}
        fullWidth
        {...restProps}
      />

      {error && (
        <Typography color={'error'} variant={'subtitle2'} position={'absolute'} bottom={-20}>
          {error as string}
        </Typography>
      )}
    </Box>
  );
};

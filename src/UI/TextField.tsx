import { FieldValues, type Path, useController, UseFormReturn } from 'react-hook-form';

import { Box, capitalize, TextField as MuiTextField, type TextFieldProps } from '@mui/material';
import { ChangeEvent, ReactElement } from 'react';
import { ErrorField } from '@UI/ErrorField';

type TextInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
} & TextFieldProps;

export const TextField = <T extends FieldValues>({ name, form, ...restProps }: TextInputProps<T>): ReactElement => {
  const { field } = useController({
    name,
    control: form.control,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (restProps.type === 'number') {
      return field.onChange(e.target.valueAsNumber);
    }

    return field.onChange(e);
  };

  const error = form.formState.errors[name]?.message;

  return (
    <Box sx={{ mb: 3, position: 'relative' }}>
      <MuiTextField
        label={capitalize(name)}
        value={field.value}
        onChange={onChange}
        onFocus={() => {
          form.clearErrors(name);
        }}
        error={!!error}
        fullWidth
        {...restProps}
      />

      {error && <ErrorField message={error as string} />}
    </Box>
  );
};

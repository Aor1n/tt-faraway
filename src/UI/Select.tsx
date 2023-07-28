import { ReactElement } from 'react';
import { FieldValues, type Path, useController, UseFormReturn } from 'react-hook-form';

import { Box, FormControl, InputLabel, MenuItem, Select as MuiSelect, Skeleton } from '@mui/material';
import { ErrorField } from '@UI/ErrorField';

interface SelectProps<T extends FieldValues> {
  data: ReadonlyArray<string>;
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  onChange?: (value: string) => void;
  isLoading?: boolean;
}

export const Select = <T extends FieldValues>({
  form,
  name,
  data,
  label,
  isLoading = false,
  onChange,
}: SelectProps<T>): ReactElement => {
  const { field } = useController({
    name,
    control: form.control,
  });

  const error = form.formState.errors[name];
  return (
    <FormControl fullWidth>
      {isLoading ? (
        <Skeleton variant="rectangular" width={'100%'} height={56} animation="wave" />
      ) : (
        <>
          <InputLabel sx={{ mb: 10 }}>{label}</InputLabel>
          <MuiSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            error={!!error}
            value={form.watch(name)}
            label={label}
            onChange={(event) => {
              field.onChange(event.target.value);
              if (onChange) onChange(event.target.value);
            }}
            disabled={isLoading}
          >
            {data.map((i) => (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            ))}
          </MuiSelect>
        </>
      )}

      {error && (
        <Box sx={{ mb: 3 }}>
          <ErrorField message={error as unknown as string} />
        </Box>
      )}
    </FormControl>
  );
};

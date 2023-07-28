import { type FieldError } from 'react-hook-form';

import { Typography } from '@mui/material';
import { ReactElement } from 'react';

interface ErrorFieldProps {
  message: FieldError['message'];
}

export const ErrorField = ({ message }: ErrorFieldProps): ReactElement => (
  <Typography color={'error'} variant={'subtitle2'} position={'absolute'} bottom={-20}>
    {message}
  </Typography>
);

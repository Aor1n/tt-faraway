import { TextField, type TextFieldProps } from '@mui/material';

export const Search = (props: TextFieldProps) => {
  return <TextField color={'primary'} fullWidth sx={{ mb: 3 }} {...props} />;
};

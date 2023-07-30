import { Box, Button, TextField, type TextFieldProps } from '@mui/material';
import { ChangeEvent } from 'react';

type SearchProps = TextFieldProps & {
  setSearch: (search: string) => void;
};

export const Search = ({ setSearch, ...props }: SearchProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const resetSearchState = () => setSearch('');

  return (
    <Box display={'flex'} mb={3}>
      <TextField color={'primary'} fullWidth onChange={onChange} {...props} autoComplete={'off'} />
      <Button variant={'contained'} onClick={resetSearchState} sx={{ ml: 3 }}>
        Clear
      </Button>
    </Box>
  );
};

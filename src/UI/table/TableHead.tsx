import { ReactElement } from 'react';

import { TableCell, TableHead as MuiTableHead, TableRow } from '@mui/material';

import { type TableProps } from './types';
import { COLORS } from '@/colors';

interface TableHeadProps extends Pick<TableProps, 'headers'> {}

export const TableHead = ({ headers }: TableHeadProps): ReactElement => {
  return (
    <MuiTableHead sx={{ background: COLORS.PRIMARY }}>
      <TableRow hover>
        {headers.map((header) => (
          <TableCell
            key={header}
            align={'center'}
            sx={{
              color: COLORS.WRITE,
              transition: '0.2s',
              '&:hover': {
                background: COLORS.PRIMARY,
                cursor: 'pointer',
              },
            }}
          >
            {header}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};

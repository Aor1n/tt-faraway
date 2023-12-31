import { ReactElement } from 'react';

import { TableCell, TableHead as MuiTableHead, TableRow } from '@mui/material';

import { COLORS } from '@/colors';
import { TableProps } from '@UI/Table/types';

type TableHeadProps = Pick<TableProps, 'headers'>;

export const TableHead = ({ headers }: TableHeadProps): ReactElement => {
  return (
    <MuiTableHead sx={{ background: COLORS.PRIMARY }}>
      <TableRow hover>
        {headers.map((header) => (
          <TableCell
            key={header}
            align={'center'}
            sx={{
              color: COLORS.WHITE,
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

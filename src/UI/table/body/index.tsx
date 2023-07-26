import { type PropsWithChildren } from 'react';

import { Skeleton, TableBody as MuiTableBody, TableCell, TableRow, Typography } from '@mui/material';
import { TableProps } from '@UI/table/types';

type TableBodyProps = Pick<TableProps, 'data' | 'headers' | 'isLoading'>;

type TableRowProps = TableBodyProps['data'][number];

const TableBodySkeleton = ({ headers }: Pick<TableBodyProps, 'headers'>) => (
  <MuiTableBody>
    {Array.from({ length: 10 }, (_, index) => (
      <TableRow key={index}>
        {headers.map((_, i) => (
          <TableCell key={i} align={'center'}>
            <Typography variant="body1">
              <Skeleton />
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    ))}
    <TableRow>
      <TableCell>
        <Typography variant="body2">Data is loading...</Typography>
      </TableCell>
    </TableRow>
  </MuiTableBody>
);

export const TableBody = ({ data, isLoading, headers, children }: PropsWithChildren<TableBodyProps>) => {
  if (isLoading) {
    return <TableBodySkeleton headers={headers} />;
  }

  const createTableRow = (row: TableRowProps) => {
    const key = row.id as number;

    return (
      <TableRow key={key} hover>
        {Object.values(row).map((rowValue, i) => (
          <TableCell key={key + i} align={'center'} sx={{ maxWidth: 40 }}>
            {rowValue}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  return (
    <MuiTableBody>
      {data.length === 0 ? (
        <TableRow>
          <TableCell>No data provided.</TableCell>
        </TableRow>
      ) : (
        data.map(createTableRow)
      )}
      {children}
    </MuiTableBody>
  );
};

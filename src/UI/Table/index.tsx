import { ReactElement } from 'react';

import { Paper, Table as MuiTable, TableContainer, TablePagination, TableRow } from '@mui/material';

import { TableHead } from '@UI/Table/TableHead';
import { TableBody } from '@UI/Table/TableBody';
import { TableProps } from '@UI/Table/types';

export const Table = ({
  data,
  headers,
  pagination,
  count,
  previousPage,
  nextPage,
  isLoading,
}: TableProps): ReactElement => {
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead headers={headers} />
        <TableBody data={data} isLoading={isLoading} headers={headers}>
          {pagination && count && data.length !== 0 ? (
            <TableRow>
              <TablePagination
                count={count}
                page={pagination.page}
                onPageChange={(_, p) => {
                  pagination.setPage(p);
                }}
                nextIconButtonProps={{
                  disabled: !nextPage,
                }}
                backIconButtonProps={{
                  disabled: !previousPage,
                }}
                rowsPerPage={10}
                rowsPerPageOptions={[]}
              />
            </TableRow>
          ) : null}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

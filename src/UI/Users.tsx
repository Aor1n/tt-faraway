import { Container } from '@mui/material';
import { Search } from '@UI/Search';
import { Table } from '@UI/table';
import { ChangeEvent, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import useUser from '@/hooks/useUser';
import { extractNumberFromString } from '@/helpers/extractNumberFromString';
import { formatDate } from '@/helpers/formatDate';
import { PAGINATION } from '@/hooks/usePagination';

const HEADERS = ['ID', 'Name', 'Gender', 'Height', 'Birth Year', 'Created'] as const;

export const Users = () => {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search);

  const { users, usersAreLoading, pagination, previousPage, nextPage, count } = useUser(debouncedSearch);

  const usersTableData = users.map(({ name, birth_year, gender, height, url, created }) => {
    const id = extractNumberFromString(url);
    return {
      id,
      name,
      gender,
      height,
      birthYear: birth_year,
      created: formatDate(created),
    };
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    // NOTE: smelly code that is resetting the page(state) due to an API bug
    // that doesn't allow us to search if current page isn't initial.
    pagination.setPage(PAGINATION.INITIAL_PAGE);
  };

  return (
    <Container>
      <Search value={search} onChange={onChange} label={`Search by character's name`} />

      <Table
        headers={HEADERS}
        data={usersTableData}
        isLoading={usersAreLoading}
        pagination={pagination}
        count={count}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </Container>
  );
};

import { Button, Container } from '@mui/material';
import { Search } from '@UI/Search';
import { Table } from '@UI/Table';
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import useUser from '@/hooks/useUser';
import { extractNumberFromString } from '@/helpers/extractNumberFromString';
import { formatDate } from '@/helpers/formatDate';
import { PAGINATION } from '@/hooks/usePagination';
import { useModal } from '@/providers/ModalProvider';
import { PatchUserModal } from '@UI/PatchUserModal';

const HEADERS = ['ID', 'Name', 'Gender', 'Height', 'Mass', 'Created', 'Action'] as const;

export const Users = () => {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search);
  const { showModal, closeModal } = useModal();

  const { users, usersAreLoading, pagination, previousPage, nextPage, count, path } = useUser(debouncedSearch);

  const usersTableData = users.map((user) => {
    const id = extractNumberFromString(user.url);

    const currentUser = {
      id,
      name: user.name,
      gender: user.gender,
      height: user.height,
      mass: user.mass,
    };

    return {
      id,
      name: user.name,
      gender: user.gender,
      height: user.height,
      mass: user.mass,
      created: formatDate(user.created),
      action: (
        <Button
          onClick={() => {
            showModal(<PatchUserModal isShown close={closeModal} user={currentUser} cacheKey={path} />);
          }}
          variant={'contained'}
        >
          Edit
        </Button>
      ),
    };
  });

  const setInitialPaginationPage = () => {
    // NOTE: smelly code that is resetting the page(state) due to an API bug
    // that doesn't allow us to search if current page isn't initial.
    pagination.setPage(PAGINATION.INITIAL_PAGE);
  };

  return (
    <Container>
      <Search
        value={search}
        setSearch={setSearch}
        setInitialPaginationPage={setInitialPaginationPage}
        label={`Search by character's name`}
      />

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

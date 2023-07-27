import { Button, Container } from '@mui/material';
import { Search } from '@UI/Search';
import { Table } from '@UI/table';
import { ChangeEvent, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import useUser from '@/hooks/useUser';
import { extractNumberFromString } from '@/helpers/extractNumberFromString';
import { formatDate } from '@/helpers/formatDate';
import { PAGINATION } from '@/hooks/usePagination';
import { useModal } from '@/providers/ModalProvider';
import { PatchUserModal } from '@UI/PatchUserModal';

const HEADERS = ['ID', 'Name', 'Gender', 'Height', 'Birth Year', 'Created'] as const;

export const Users = () => {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search);
  const { showModal, closeModal } = useModal();

  const { users, usersAreLoading, pagination, previousPage, nextPage, count } = useUser(debouncedSearch);

  const usersTableData = users.map((user) => {
    const id = extractNumberFromString(user.url);
    return {
      id,
      name: (
        <Button
          onClick={() => {
            showModal(
              <PatchUserModal
                isShown
                close={closeModal}
                primaryBtn={{ text: 'Update', action: async () => await console.log(1), isLoading: false }}
              />,
            );
          }}
          variant={'text'}
        >
          {user.name}
        </Button>
      ),
      gender: user.gender,
      height: user.height,
      birthYear: user.birth_year,
      created: formatDate(user.created),
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

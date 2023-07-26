import { Table } from '@UI/table';
import useUser from '@/hooks/useUser';
import { formatDate } from '@/helpers/formatDate';
import { extractNumberFromString } from '@/helpers/extractNumberFromString';
import { Button, Container } from '@mui/material';

const HEADERS = ['ID', 'Name', 'Gender', 'Height', 'Birth Year', 'Created'] as const;

function App() {
  const { users, usersAreLoading, pagination, previousPage, nextPage, count } = useUser();

  const usersTableData = users.map(({ name, birth_year, gender, height, url, created }) => {
    const id = extractNumberFromString(url);
    return {
      id,
      name: (
        <Button onClick={() => {}} variant={'text'}>
          {name}
        </Button>
      ),
      gender,
      height,
      birthYear: birth_year,
      created: formatDate(created),
    };
  });

  return (
    <Container>
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
}

export default App;

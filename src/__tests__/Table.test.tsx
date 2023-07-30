import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Table } from '@UI/Table';

const HEADERS_MOCK = ['ID', 'Name', 'Gender', 'Height', 'Mass', 'Created', 'Action'] as const;
const TABLE_DATA_MOCK = [
  {
    id: 1,
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    gender: 'male',
  },
  {
    id: 2,
    name: 'C-3PO',
    height: '167',
    mass: '75',
    gender: 'n/a',
  },
  {
    id: 3,
    name: 'R2-D2',
    height: '96',
    mass: '32',
    gender: 'n/a',
  },
  {
    id: 4,
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    gender: 'male',
  },
  {
    id: 5,
    name: 'Leia Organa',
    height: '150',
    mass: '49',
    gender: 'female',
  },
  {
    id: 6,
    name: 'Owen Lars',
    height: '178',
    mass: '120',
    gender: 'male',
  },
  {
    id: 7,
    name: 'Beru Whitesun lars',
    height: '165',
    mass: '75',
    gender: 'female',
  },
  {
    id: 8,
    name: 'R5-D4',
    height: '97',
    mass: '32',
    gender: 'n/a',
  },
  {
    id: 9,
    name: 'Biggs Darklighter',
    height: '183',
    mass: '84',
    gender: 'male',
  },
  {
    id: 10,
    name: 'Obi-Wan Kenobi',
    height: '182',
    mass: '77',
    gender: 'male',
  },
];

const NEXT_PAGE_LINK_MOCK = 'https://swapi.dev/api/people/?search=&page=2';

describe('Table positive tests', () => {
  beforeEach(() => {
    render(
      <Table
        data={TABLE_DATA_MOCK}
        headers={HEADERS_MOCK}
        pagination={{
          page: 0,
          setPage: vi.fn,
        }}
        count={0}
        previousPage={null}
        nextPage={NEXT_PAGE_LINK_MOCK}
        isLoading={false}
      />,
    );
  });

  test.each(HEADERS_MOCK)('Table contain "%s" header', (header) => {
    expect(screen.getByText(header)).toBeDefined();
  });

  test.each(TABLE_DATA_MOCK)('Table row №%# with value %o renders "id" field', ({ id }) => {
    expect(screen.getByText(id)).toBeDefined();
  });
});

describe('Table negative tests', () => {
  beforeEach(() => {
    render(
      <Table
        data={[]}
        headers={[]}
        pagination={{
          page: 0,
          setPage: vi.fn,
        }}
        count={0}
        previousPage={null}
        nextPage={null}
        isLoading={false}
      />,
    );
  });

  test.fails.each(HEADERS_MOCK)(`Table doesn't contain "%s" header`, (header) => {
    expect(screen.getByText(header)).toBeDefined();
  });

  test.fails.each(TABLE_DATA_MOCK)('Table row №%# with value %o does not contain "id" field', ({ id }) => {
    expect(screen.getByText(id)).toBeDefined();
  });
});

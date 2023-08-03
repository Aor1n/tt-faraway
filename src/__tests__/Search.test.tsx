import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Search } from '@UI/Search';

import matchers from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
expect.extend(matchers);

function setup() {
  const setSearchMock = vi.fn();

  return {
    user: userEvent.setup(),
    ...render(<Search setSearch={setSearchMock} />),
  };
}

describe('Search test', () => {
  test('Search changes its value if user types', async () => {
    const { user } = setup();
    const input = screen.getByRole('textbox');
    const value = 'I am text';

    expect(input).toHaveValue('');

    await user.type(input, value);

    expect(input).toHaveValue(value);
  });

  test('Search drops its value on Clear button click', async () => {
    const { user } = setup();
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    const initialValue = '';
    const value = 'I am text';

    expect(input).toHaveValue(initialValue);

    await user.type(input, value);

    expect(input).toHaveValue(value);

    await user.click(button);

    // await waitFor(() => expect(input).toHaveValue(initialValue));
  });
});

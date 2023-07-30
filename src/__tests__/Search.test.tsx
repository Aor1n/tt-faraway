import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Search } from '@UI/Search';

describe('Search test', () => {
  render(<Search value={''} setSearch={vi.fn} label={`Search by character's name`} />);

  test('Search has label', () => {
    expect(screen.getByLabelText("Search by character's name")).toBeDefined();
  });
});

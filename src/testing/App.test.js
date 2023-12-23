import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../src/App';
import { expect, test } from 'vitest';

test('renders app component', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
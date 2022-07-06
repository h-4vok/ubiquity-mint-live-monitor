import React from 'react';
import NotFound from './404';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('render elements', () => {

  const { getByText } = render(
    <NotFound />
  );

  const element = getByText(/404/i);
  const homeElement = getByText(/Home/i);
  expect(element).toBeInTheDocument();
  expect(homeElement).toBeInTheDocument();
});
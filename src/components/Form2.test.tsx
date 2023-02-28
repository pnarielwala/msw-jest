import React from 'react';
import Form, { FormProps } from './Form';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';

import '../msw/server';

const defaultProps: FormProps = {
  onSubmit: jest.fn(),
};

const doRender = () =>
  render(
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              retry: false,
              staleTime: Infinity,
              cacheTime: Infinity,
            },
          },
        })
      }
    >
      <Form {...defaultProps} />
    </QueryClientProvider>,
  );

test.each([...new Array(100).map((num) => [0, num])])(
  'renders without crashing 2',
  async () => {
    doRender();

    const button = await screen.findByRole('button', { name: /submit/i });
    userEvent.click(button);

    await waitFor(() => {
      expect(defaultProps.onSubmit).toHaveBeenCalled();
    });
  },
);

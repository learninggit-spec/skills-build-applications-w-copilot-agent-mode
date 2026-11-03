import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const originalFetch = global.fetch;
const originalCodespaceName = process.env.REACT_APP_CODESPACE_NAME;

beforeEach(() => {
  process.env.REACT_APP_CODESPACE_NAME = 'test-codespace';
  global.fetch = jest.fn((url) =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve(
          url.endsWith('/api/users/')
            ? [{ id: 2, username: 'octouser' }]
            : { results: [{ id: 1, name: 'Morning run' }] }
        ),
    })
  );
});

afterEach(() => {
  global.fetch = originalFetch;
  if (originalCodespaceName === undefined) {
    delete process.env.REACT_APP_CODESPACE_NAME;
  } else {
    process.env.REACT_APP_CODESPACE_NAME = originalCodespaceName;
  }
});

test('shows navigation and fetches paginated and plain API collections', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByRole('navigation')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Workouts' })).toBeInTheDocument();
  expect(await screen.findByRole('table', { name: 'Activities' })).toBeInTheDocument();
  expect(await screen.findByText('Morning run')).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith(
    `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  );

  fireEvent.click(screen.getByRole('link', { name: 'Users' }));

  expect(await screen.findByText('octouser')).toBeInTheDocument();
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    );
  });
});

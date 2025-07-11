import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';

function ShowLocation() {
  const location = useLocation();
  return <div data-testid="location-display">{location.search}</div>;
}

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/']}>
        <>
          {ui}
          <ShowLocation />
        </>
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

export default renderWithClient;

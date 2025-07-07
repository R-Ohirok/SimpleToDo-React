import { createRoot } from 'react-dom/client';
import './index.scss';
import { Provider } from 'jotai';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Root from './Root.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider>
      <Root />
    </Provider>
  </QueryClientProvider>,
);

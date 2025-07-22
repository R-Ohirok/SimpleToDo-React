import { createRoot } from 'react-dom/client';
import './index.scss';
import { Provider } from 'jotai';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Root from './Root.tsx';
import { ApolloProvider } from '@apollo/client';
import client from './api/apolloClient.ts';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ApolloProvider client={client}>
      <Provider>
        <Root />
      </Provider>
    </ApolloProvider>
  </QueryClientProvider>,
);

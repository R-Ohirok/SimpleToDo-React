import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import { Provider } from 'jotai';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Root = () => (
  <Router>
    <App />
  </Router>
);

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider>
      <Root />
    </Provider>
    ,
  </QueryClientProvider>,
);

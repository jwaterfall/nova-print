import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

import PageLayout from '@/components/PageLayout';

import GlobalStyle from '../GlobalStyle';
import { darkTheme, lightTheme } from '../themes';

const queryClient = new QueryClient();

const isDarkMode = true;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <QueryClientProvider client={queryClient}>
        <Normalize />
        <GlobalStyle />
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;

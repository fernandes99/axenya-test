import React from 'react';
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '../styles/global';
import theme from '../styles/theme';
import Layout from '../components/layout';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout Component={Component} pageProps={pageProps} />
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default App;

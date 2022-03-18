import Layout from '@components/Layout';
import { CssBaseline, GeistProvider } from '@geist-ui/core';
import { AuthProvider } from '@lib/auth';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Layout>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Layout>
    </GeistProvider>
  );
}

export default MyApp;

// TODO: FINISH WEB SOCKETS CONNECTION + SUBSCRIPTION TO ORDER
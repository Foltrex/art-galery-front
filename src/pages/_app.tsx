import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import { RootStoreProvider } from './rootStoreAdapter';

export default function App({Component, pageProps}: AppProps) {

    return (
        <RootStoreProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </RootStoreProvider>
    );
}

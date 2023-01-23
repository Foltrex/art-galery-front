import React from 'react';
import App, {AppContext} from 'next/app';
import { getStores, StoreProvider } from '../stores/stores';
import { NextComponentType, NextPageContext } from 'next';
import { AppTreeType } from 'next/dist/shared/lib/utils';
import { Router } from 'next/router';
import Layout from '../components/layout/Layout';
import { CookiesProvider } from 'react-cookie';

class CustomApp extends App {
    static async getInitialProps(appContext: { ctx: any; Component?: NextComponentType<NextPageContext, {}, {}>; AppTree?: AppTreeType; router?: Router; }) {
        // On server-side, this runs once and creates new stores
        // On client-side, this always reuses existing stores
        const mobxStores = getStores();

        // Make stores available to page's `getInitialProps`
        appContext.ctx.mobxStores = mobxStores;

        // Call "super" to run page's `getInitialProps`
        const appProps = await App.getInitialProps(appContext as AppContext);

        // Gather serialization-friendly data from stores
        const initialData = {
            uiStoreInitialData: mobxStores.uiStore.__data(),
        };

        // Send it to `render`
        return {
            ...appProps,
            initialData,
        };
    }

    render() {
        const { Component, pageProps, initialData } = this.props;

        // During SSR, this will create new store instances so having `initialData` is crucial.
        // During the client-side hydration, same applies.
        // From then on, calls to `getStores()` return existing instances.
        const stores = getStores(initialData);
        console.log(stores)

        return (
            <StoreProvider value={stores}>
                <CookiesProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </CookiesProvider>
            </StoreProvider>
        );
    }
}

export default CustomApp;

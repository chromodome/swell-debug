import { useState, useEffect } from 'react';
import Router from 'next/router';
import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css';
import '@/styles/carouselcards.css';
import 'react-lightbox-pack/dist/index.css';
import { StoreProvider } from 'store';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '@/styles/datepicker.custom.css';
import '@/styles/rcSlider.css';
import 'rc-slider/assets/index.css';

import Head from 'next/head';
import SimpleReactLightbox from 'simple-react-lightbox';
import LayoutLoading from '@/components/layouts/LayoutLoading';

function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const start = () => {
            console.log('start');
            setLoading(true);
        };
        const end = () => {
            console.log('findished');
            setLoading(false);
        };
        Router.events.on('routeChangeStart', start);
        Router.events.on('routeChangeComplete', end);
        Router.events.on('routeChangeError', end);
        return () => {
            Router.events.off('routeChangeStart', start);
            Router.events.off('routeChangeComplete', end);
            Router.events.off('routeChangeError', end);
        };
    }, []);
    return (
        <>
            {loading ? (
                <LayoutLoading />
            ) : (
                <>
                    <Head>
                        <title>Konnect Marketplace</title>
                    </Head>
                    <AuthProvider>
                        <SimpleReactLightbox>
                            <StoreProvider>
                                <Component {...pageProps} />
                            </StoreProvider>
                        </SimpleReactLightbox>
                    </AuthProvider>
                </>
            )}
        </>
    );
}

export default MyApp;

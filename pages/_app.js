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

function MyApp({ Component, pageProps }) {
    return (
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
    );
}

export default MyApp;

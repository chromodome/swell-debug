import { useState, useEffect } from 'react';
import Router from 'next/router';
import { Slide, Bounce, ToastContainer } from 'react-toastify';
import '@/styles/globals.css';
import '@/styles/carouselcards.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-lightbox-pack/dist/index.css';
import { StoreProvider } from 'store-context';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '@/styles/datepicker.custom.css';
import '@/styles/rcSlider.css';
import 'rc-slider/assets/index.css';

import Head from 'next/head';
import SimpleReactLightbox from 'simple-react-lightbox';
import LayoutLoading from '@/components/layouts/LayoutLoading';

import { Provider } from 'react-redux';
import store from 'store';
import { loadUser } from '@/store/actions/auth';
import { fetchStartupData } from '@/helpers/apiServices/startup';

const contextClass = {
    success: 'bg-green-400 text-green-600',
    error: 'bg-red-600 text-white',
    info: 'bg-gray-600 ',
    warning: 'bg-orange-400',
    default: 'bg-indigo-600',
    dark: 'bg-white-600 text-gray-300'
};

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

        store.dispatch(loadUser());
        store.dispatch(fetchStartupData());

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
                        <meta
                            name="viewport"
                            content="width=device-width, user-scalable=no, initial-scale=1.0"
                        />
                    </Head>
                    <Provider store={store}>
                        <ToastContainer
                            className="mt-36"
                            // toastClassName={({ type }) =>
                            //     contextClass[type || 'default'] +
                            //     'shadow-xl flex relative p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
                            // }
                            // bodyClassName={() =>
                            //     'text-sm text-black text-opacity-80 flex font-medium block p-3'
                            // }
                            position="top-right"
                            hideProgressBar={true}
                            autoClose={1750}
                            transition={Bounce}
                            icon={false}
                            theme="colored"
                        />
                        <SimpleReactLightbox>
                            <StoreProvider>
                                <Component {...pageProps} />
                            </StoreProvider>
                        </SimpleReactLightbox>
                    </Provider>
                </>
            )}
        </>
    );
}

export default MyApp;

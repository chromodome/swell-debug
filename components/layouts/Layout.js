import Head from 'next/head';
import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import TopBar from '@/blocks/TopBar';

import { useState, useEffect } from 'react';
import Router from 'next/router';

export default function Layout({ title, keywords, description, children }) {
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
            <div id="root" className="">
                <Head>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta name="keywords" content={keywords} />
                </Head>

                <Header />
                <TopBar />
                {/* {loading ? (
                    <LayoutLoading />
                ) : ( */}
                <div className="flex flex-col h-screen justify-between">
                    <div className="overflow-x2-hidden">{children}</div>
                    <Footer />
                </div>
                {/* )} */}
            </div>
            <div id="modal-root"></div>
        </>
    );
}

Layout.defaultProps = {
    title: 'Konnect',
    description: 'Experience the world',
    keywords: 'travel, experience, trip, build, stay, world, host, tour, guide',
    tags: []
};

import { useState, useEffect } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Head from 'next/head';
import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import Footer2 from '@/layouts/Footer2';
import TopBar from '@/blocks/TopBar';
import {
    fetchPurchasedIds,
    resetPurchase
} from '@/helpers/apiServices/purchases';

function Layout({
    auth,
    fetchPurchasedIds,
    resetPurchase,
    purchased,
    title,
    keywords,
    description,
    children,
    options = {
        isHeader: {
            visible: true,
            options: {
                isLogo: true,
                isSearch: true,
                isAvatar: true,
                isMenu: true,
                isCustom: null
            }
        },
        isTopBar: {
            visible: true
        },
        isFooter: {
            visible: true,
            body: {
                isVisible: true
            },
            body2: {
                isVisible: false
            },
            bottomBar: {
                isVisible: true
            }
        }
    }
}) {
    const { isHeader, isTopBar, isFooter } = options;
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

    useEffect(() => {
        const { purchasedIds, updateIds, loadingIds } = purchased;

        if (auth.isAuthenticated && !auth.loading && updateIds && !loadingIds) {
            fetchPurchasedIds();
        } else if (!auth.isAuthenticated && !auth.loading) {
            if (purchasedIds.length || !updateIds) {
                resetPurchase();
            }
        }
    }, [auth, purchased]);

    return (
        <>
            <div id="root" className="">
                <Head>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta name="keywords" content={keywords} />
                </Head>

                {isHeader.visible && (
                    <Header
                        isLogo={isHeader.options.isLogo}
                        // isSearch={isHeader.options.isSearch}
                        isAvatar={isHeader.options.isAvatar}
                        isMenu={isHeader.options.isMenu}
                        isCustom={isHeader.options.isCustom}
                    />
                )}
                {isTopBar.visible && <TopBar />}
                {/* {loading ? (
                    <LayoutLoading />
                ) : ( */}
                <div className="flex flex-col h-screen justify-between">
                    <div className="">{children}</div>
                    {isFooter.body.isVisible && (
                        <Footer
                            isBody={isFooter.body.isVisible}
                            isBottomBar={isFooter.bottomBar.isVisible}
                        />
                    )}
                    {isFooter.body2.isVisible && (
                        <Footer2
                            isBody={isFooter.body2.isVisible}
                            isBottomBar={isFooter.bottomBar.isVisible}
                        />
                    )}
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchPurchasedIds,
            resetPurchase
        },
        dispatch
    );
}
const mapStateToProps = (state) => ({
    purchased: state.purchased,
    globalState: state.globalState,
    auth: state.auth,
    cart: state.cart // check what already in yhe cart

    // also once logged in check if they already booked this product
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

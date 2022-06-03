import Layout from '@/layouts/Layout';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setViewedThanks } from '@/store/actions/order';
import Row from '@/components/sections/Row';

import { useRouter } from 'next/router';
import ButtonLoad from '@/blocks/Button/ButtonLoad';

import translations from '@/constants/translations';
import SectionTitle from '@/components/blocks/Title/SectionTitle';
import classNames from 'classnames';
import LayoutLoading from '@/components/layouts/LayoutLoading';

const LandingPage = ({ setViewedThanks, order: { data: expData, viewed } }) => {
    const router = useRouter();
    const { isReady } = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isReady) {
            if (viewed) {
                router.push('/');
            } else {
                setViewedThanks();
                setLoading(false);
            }
        }
    }, []);

    const handleBrowse = () => {
        router.push('/experiences/purchased');
    };

    return (
        <Layout>
            {loading ? (
                <LayoutLoading />
            ) : (
                <>
                    <div
                        className={classNames(
                            'mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40'
                        )}>
                        <div className="px-4 mt-12 md:mt-20">
                            <SectionTitle
                                section={{
                                    title: 'Order Summary'
                                }}
                                padding=""
                                size="text-4xl md:text-4xl"
                                className=""
                            />
                            <div className="text-xl font-bold mb-1">
                                Success! Thank you for your purchase.
                            </div>

                            <div className="mb-12">
                                Kindly find your order summary below.
                            </div>
                        </div>
                    </div>
                    <Row>
                        <div
                            className={classNames(
                                'bg-gray-50 rounded-lg  flex w-full h-96 items-center justify-center mt-12'
                            )}>
                            <div className="flex flex-col items-center px-4">
                                <div className="text-center mt-4">
                                    You will receive an email with your order
                                    details in the next couple of mins.
                                </div>
                                <ButtonLoad
                                    handleClick={handleBrowse}
                                    isLoading={false}
                                    label={'View My Purchases'}
                                />
                            </div>
                        </div>
                    </Row>
                </>
            )}
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState,
    order: state.order,
    auth: state.auth
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            setViewedThanks
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

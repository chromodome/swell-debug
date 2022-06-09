import { useState, useEffect, useRef } from 'react';

import Layout from '@/layouts/Layout';

import translations from '@/constants/translations';
import SectionTitle from '@/components/blocks/Title/SectionTitle';
import classNames from 'classnames';
import Row from '@/components/sections/Row';

const AboutMarketplace = () => {
    return (
        <Layout>
            <>
                <div
                    className={classNames(
                        'mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40'
                    )}>
                    <div className="px-4 mt-12 md:mt-20">
                        <SectionTitle
                            section={{
                                title: 'The Marketplace'
                            }}
                            padding=""
                            size="text-4xl md:text-4xl"
                            className=""
                        />
                    </div>
                </div>
                <Row>
                    <div
                        className={classNames(
                            'bg-gray-50 rounded-lg  flex w-full h-96 items-center justify-center'
                        )}>
                        <div className="flex flex-col items-center px-4">
                            <div className="text-center">
                                content will go here
                            </div>
                        </div>
                    </div>
                </Row>
            </>
        </Layout>
    );
};

export default AboutMarketplace;

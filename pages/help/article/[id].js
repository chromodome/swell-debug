import React, { useState, useEffect } from 'react';

import Layout from '@/layouts/Layout';

import { getArticleById } from '@/helpers/apiServices/experiences';

import ButtonGeneric from '@/components/blocks/Button/ButtonGeneric';

import { capitalize, getDays, kreatorName } from '@/helpers/FEutils';
import Link from 'next/link';
import SectionTitle from '@/components/blocks/Title/SectionTitle';

export default function HelpArticle({ dataQuery }) {
    const dataError = (dataQuery) => {
        if (dataQuery) {
            if (dataQuery.error) return 500;
            if (
                !dataQuery.data?.marketplaceHelps ||
                !dataQuery.data?.marketplaceHelps.length ||
                !dataQuery.data?.marketplaceTopics ||
                !dataQuery.data?.marketplaceTopics.length
            )
                return 404;
            return 200;
        } else return 500;
    };

    if (dataError(dataQuery) == 500) {
        return <>Some server error</>;
    }

    if (dataError(dataQuery) == 404) {
        return <>Resource not found</>;
    }

    const topics = dataQuery.data.marketplaceTopics;
    const article = dataQuery.data.marketplaceHelps[0];
    // const
    // const singleArticle = articles.find(article => article.help_id)

    // useEffect(() => {}, []);

    return dataError(dataQuery) == 200 ? (
        <Layout>
            <div
                className={` mb-12 mt-24 mx-auto px-5 md:px-9 lg:px-12 xl:px-241 2xl:px-401 xl:max-w-6xl`}>
                <div className={`px-4 flex items-start gap-12`}>
                    <aside className="md:w-1/4 sticky top-24 py-4 pb-24 text-sm">
                        <div className="flex flex-col">
                            {topics.map((topic, index) => {
                                return (
                                    <li className="list-none mb-4">
                                        <span className="font-semibold">
                                            {topic.menu_name}
                                        </span>
                                        <div>
                                            <ul className="flex flex-col mt-2 gap-2">
                                                {topics[index].child_pages.map(
                                                    (subTopic) => {
                                                        const isSelected =
                                                            subTopic.help_id ===
                                                            article.help_id;
                                                        return (
                                                            <>
                                                                {/* <li
                                                                    className={`list-none flex items-center relative ${
                                                                        isSelected
                                                                            ? 'bg-green-200 rounded-md'
                                                                            : ''
                                                                    }`}>
                                                                    <span className="w-5 mr-3">
                                                                        {isSelected && (
                                                                            <i className="ml-2 text-lg ri-arrow-right-s-line"></i>
                                                                        )}
                                                                    </span>
    
                                                                    <Link
                                                                        href={`/help/article/${subTopic.help_id}`}>
                                                                        <a className="">
                                                                            {
                                                                                subTopic.menu_name
                                                                            }
                                                                        </a>
                                                                    </Link>
                                                                </li> */}
                                                                <li
                                                                    className={`list-none`}>
                                                                    {!isSelected ? (
                                                                        <Link
                                                                            href={`/help/article/${subTopic.help_id}`}>
                                                                            <a
                                                                                className={`list-none flex py-1 rounded-md hover:bg-green-100 items-center  ${
                                                                                    isSelected
                                                                                        ? 'bg-green-200 '
                                                                                        : ''
                                                                                }`}>
                                                                                <span className="w-5 mr-3">
                                                                                    {isSelected && (
                                                                                        <i className="ml-2 text-lg ri-arrow-right-s-line"></i>
                                                                                    )}
                                                                                </span>
                                                                                <span>
                                                                                    {
                                                                                        subTopic.menu_name
                                                                                    }
                                                                                </span>
                                                                            </a>
                                                                        </Link>
                                                                    ) : (
                                                                        <div
                                                                            className={`list-none flex py-1 rounded-md items-center  ${
                                                                                isSelected
                                                                                    ? 'bg-green-200 '
                                                                                    : ''
                                                                            }`}>
                                                                            <span className="w-5 mr-3">
                                                                                {isSelected && (
                                                                                    <i className="ml-2 text-lg ri-arrow-right-s-line"></i>
                                                                                )}
                                                                            </span>
                                                                            <span>
                                                                                {
                                                                                    subTopic.menu_name
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </li>
                                                            </>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        </div>
                                    </li>
                                );
                            })}
                        </div>
                    </aside>
                    <div className="md:w-3/4 mb-24">
                        {/* <h1 className="text-3xl mb-4 text-blue-800 font-semibold">
                            {article.page_name}
                        </h1> */}
                        <SectionTitle
                            section={{
                                title: article.page_name,
                                subTitle: ''
                            }}
                            padding=""
                            size="text-4xl"
                            className="mb-4"
                        />
                        <div
                            className="ckeditor"
                            dangerouslySetInnerHTML={{
                                __html: article.content
                            }}
                        />
                    </div>
                </div>

                <div className={`px-4 flex items-start`}>
                    <div className="w-full">
                        <div></div>
                    </div>
                </div>
            </div>
        </Layout>
    ) : null;
}

// export async function getServerSideProps({ params }) {
//     const { data: dataQuery } = await getArticleById(params.id);

//     return {
//         props: {
//             dataQuery
//         }
//     };
// }

export async function getStaticProps({ params }) {
    const { data: dataQuery } = await getArticleById(params.id);

    return {
        props: {
            dataQuery
        }
    };
}

export async function getStaticPaths() {
    const paths = [
        { params: { id: '1001' } },
        { params: { id: '1002' } },

        { params: { id: '4001' } },
        { params: { id: '4002' } },
        { params: { id: '4004' } }
    ];

    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return {
        paths,
        fallback: 'blocking'
    };
}

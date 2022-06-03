import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import router, { useRouter } from 'next/router';
import Layout from '@/layouts/Layout';
import GridList from '@/sections/GridList';
import ExperienceFilter from '@/blocks/ExperienceFilter';
import { NEXT_PUBLIC_ITEMS_PER_PAGE } from '@/constants/public';
import LoadMore from '@/blocks/LoadMore';
import translations from '@/constants/translations';
import { pageCount } from '@/helpers/FEutils';
import SectionTitle from '@/components/blocks/Title/SectionTitle';
import Row from '@/components/sections/Row';
import SkeletonText from '@/components/blocks/Card/SkeletonText';
import KreatorBadgeStatic from '@/components/blocks/KreatorBadgeStatic';
import KreatorBadgeStaticFlat from '@/components/blocks/KreatorBadgeStaticFlat';

const LandingPage = ({ globalState: { lang } }) => {
    const { query, isReady } = useRouter();
    const [dataLoading, setDataLoading] = useState(true);
    const [loadMoreData, setLoadMoreData] = useState(false);
    const [expList, setExpList] = useState([]);
    const [kreator, setKreator] = useState(null);
    const accepedTypes = ['all', 'digital', 'guided'];
    const currentPage = useRef(1);
    const totalPages = useRef(1);
    const totalCount = useRef(0);
    const filterType = useRef('all');
    const userName = useRef(null);
    const [pageIsReady, setPageIsReady] = useState(false);

    const getExps = async (user, type, page = 1) => {
        const response = await fetch(
            `/api/user/${user}/${type}?limit=${NEXT_PUBLIC_ITEMS_PER_PAGE}&page=${page}`
        );
        const data = await response.json();

        return data;
    };
    const handleLoadClick = () => {
        setLoadMoreData(true);
        loadExperiences(
            userName.current,
            filterType.current,
            currentPage.current + 1
        );
    };
    const loadExperiences = (user, type, page = 1) => {
        getExps(user, type, page).then((data) => {
            const { count, page, pages, results } = data;

            currentPage.current = page;
            totalPages.current = pageCount(count, NEXT_PUBLIC_ITEMS_PER_PAGE);
            totalCount.current = count;
            setExpList([...expList, ...results]);
            setDataLoading(false);
            setLoadMoreData(false);
        });
    };

    useEffect(() => {
        if (isReady) {
            if (query.id.length > 1) {
                userName.current = query.id[0].toLowerCase();
                filterType.current = accepedTypes.includes(
                    query.id[1].toLowerCase()
                )
                    ? query.id[1].toLowerCase()
                    : 'all';
            } else if (query.id.length === 1) {
                userName.current = query.id[0].toLowerCase();
            } else {
                // 404
            }

            loadExperiences(userName.current, filterType.current);
            setPageIsReady(true);
        }
    }, []);

    useEffect(() => {
        if (expList?.length > 0) {
            const { username, displayname, avatar } = expList?.[0]?.content;
            const newKreator = {
                username,
                profile: {
                    displayname,
                    avatar
                }
            };
            setKreator(newKreator);
        }
    }, [expList]);

    return (
        <Layout>
            {pageIsReady && (
                <>
                    <div
                        className={`mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40 mt-12 mb-8`}>
                        <SectionTitle
                            section={
                                translations[lang].sections.exploreByKreator
                            }
                        />
                    </div>

                    <ExperienceFilter query={query} classes="" />

                    {kreator && (
                        <Row>
                            <div className="px-4">
                                <div className="flex flex-col gap-4 border-t pt-8 pb-8 border-gray-300">
                                    <KreatorBadgeStaticFlat
                                        customHeight="h-12"
                                        customPadding="pl-16 pr-8"
                                        author={kreator}
                                        size="w-12 h-12"
                                        textSize="text-lg"
                                    />
                                    <div className="flex flex-wrap gap-2">
                                        {!dataLoading ? (
                                            <>
                                                {totalCount.current > 0 ? (
                                                    <>
                                                        <span className="text-xl font-light text-gray-700 tracking-tight">
                                                            We found
                                                        </span>
                                                        <span className="text-xl font-semibold text-gray-700 tracking-tight">
                                                            {`${
                                                                totalCount.current
                                                            } ${
                                                                totalCount.current >
                                                                1
                                                                    ? 'Experiences'
                                                                    : 'Experience'
                                                            }`}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-xl font-light text-gray-700 tracking-tight">
                                                        We couldn't find any
                                                        experiences matching
                                                        your criteria
                                                    </span>
                                                )}
                                            </>
                                        ) : (
                                            <div className="flex items-center gap-2 pt-2">
                                                <SkeletonText
                                                    height="h-4"
                                                    width="w-20"
                                                />
                                                <SkeletonText
                                                    height="h-4"
                                                    width="w-36"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Row>
                    )}

                    <GridList
                        // sectionTitles={
                        //     translations[lang].sections.exploreByKreator
                        // }
                        margins={''}
                        data={expList}
                        btnLabel="Load More"
                        btnAction="load"
                        btnUrl="/experiences/search"
                        dataLoading={dataLoading}
                        loadMoreData={loadMoreData}
                        handleLoadClick={handleLoadClick}
                        showButton={
                            currentPage.current !== totalPages.current ||
                            loadMoreData
                        }
                    />
                </>
            )}
            {/* <LoadMore loadMoreData={loadMoreData} /> */}
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState,
    auth: state.auth
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

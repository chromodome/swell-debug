import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouter } from 'next/router';
import Layout from '@/layouts/Layout';
import GridList from '@/sections/GridList';
import translations from '@/constants/translations';
import ExperienceFilter from '@/blocks/ExperienceFilter';
import LoadMore from '@/blocks/LoadMore';
import { NEXT_PUBLIC_ITEMS_PER_PAGE } from '@/constants/public';
import { pageCount } from '@/helpers/FEutils';
import SectionTitle from '@/components/blocks/Title/SectionTitle';
import Row from '@/components/sections/Row';
import SkeletonText from '@/components/blocks/Card/SkeletonText';
import SliderInterests from '@/components/sections/SliderInterests';
import SliderDestinations from '@/components/sections/SliderDestinations';

const LandingPage = ({
    globalState: {
        lang,
        siteData: { destinationList = [], categories = [] }
    }
}) => {
    const { query, isReady } = useRouter();
    const accepedTypes = ['all', 'digital', 'guided'];
    const [dataLoading, setDataLoading] = useState(true);
    const [loadMoreData, setLoadMoreData] = useState(false);
    const [expList, setExpList] = useState([]);
    const currentPage = useRef(1);
    const totalPages = useRef(1);
    const totalCount = useRef(0);
    const filterType = useRef('all');
    const [pageIsReady, setPageIsReady] = useState(false);

    const getExps = async (type, page = 1) => {
        const response = await fetch(
            `/api/search/${type}?limit=${NEXT_PUBLIC_ITEMS_PER_PAGE}&page=${page}`
        );
        const data = await response.json();

        return data;
    };

    const loadExperiences = (type, page = 1) => {
        getExps(type, page).then((data) => {
            const { count, page, pages, results } = data;

            currentPage.current = page;
            totalPages.current = pageCount(count, NEXT_PUBLIC_ITEMS_PER_PAGE);
            totalCount.current = count;

            setExpList([...expList, ...results]);
            setDataLoading(false);
            setLoadMoreData(false);
        });
    };

    const handleLoadClick = () => {
        setLoadMoreData(true);
        loadExperiences(filterType.current, currentPage.current + 1);
    };

    useEffect(() => {
        if (isReady) {
            let type = query.id.toLowerCase();

            type = accepedTypes.includes(type) ? type : 'all';
            filterType.current = type;
            loadExperiences(type);
            setPageIsReady(true);
        }
    }, []);

    return (
        <Layout>
            {pageIsReady && (
                <>
                    <div
                        className={`mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40 mt-12 mb-8 d-hdpi-2:px-vw-40 d-hdpi-2:mt-vw-12 d-hdpi-2:mb-vw-8`}>
                        <SectionTitle
                            section={
                                translations[lang].sections.exploreEverything
                            }
                        />
                    </div>

                    <ExperienceFilter query={query} classes="" />

                    <Row>
                        <div className="px-4 d-hdpi-2:px-vw-4">
                            <div className="flex flex-col gap-2 d-hdpi-2:gap-1 border-t pt-4 pb-8 border-gray-300 d-hdpi-2:pt-vw-4 d-hdpi-2:pb-vw-8">
                                <div className="flex flex-wrap gap-2 d-hdpi-2:gap-1">
                                    {!dataLoading ? (
                                        <>
                                            {totalCount.current > 0 ? (
                                                <>
                                                    <span className="text-xl d-hdpi-2:text-vw-xl font-light text-gray-700 tracking-tight">
                                                        We found
                                                    </span>
                                                    <span className="text-xl d-hdpi-2:text-vw-xl font-semibold text-gray-700 tracking-tight">
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
                                                <span className="text-xl d-hdpi-2:text-vw-xl font-light text-gray-700 tracking-tight">
                                                    We couldn't find any
                                                    experiences matching your
                                                    criteria
                                                </span>
                                            )}
                                        </>
                                    ) : (
                                        <div className="flex items-center gap-2 pt-2 d-hdpi-2:gap-1 d-hdpi-2:pt-vw-2">
                                            <SkeletonText
                                                height="h-4 d-hdpi-2:h-vw-4"
                                                width="w-20 d-hdpi-2:w-vw-20"
                                            />
                                            <SkeletonText
                                                height="h-4 d-hdpi-2:h-vw-4"
                                                width="w-36 d-hdpi-2:w-vw-36"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Row>

                    <GridList
                        // sectionTitles={
                        //     translations[lang].sections.exploreEverything
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
                    <Row>
                        <SliderInterests
                            margins="mt-12 d-hdpi-2:mt-vw-12"
                            sectionTitles={
                                translations[lang].sections.wanderByInterest
                            }
                            // data={dataLanding?.data?.interests || []}
                            data={categories || []}
                            path={'/experiences/interest/'}
                            tagRatio="landscape"
                        />
                    </Row>
                    <Row>
                        <SliderDestinations
                            margins="mt-12 d-hdpi-2:mt-vw-12"
                            sectionTitles={
                                translations[lang].sections.wanderByDestination
                            }
                            data={destinationList || []}
                            tagRatio="landscape"
                        />
                    </Row>
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

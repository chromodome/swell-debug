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
// import { getLandingPage } from '@/helpers/apiServices/experiences';
import SliderInterests from '@/components/sections/SliderInterests';
import Row from '@/components/sections/Row';
import SkeletonText from '@/components/blocks/Card/SkeletonText';
import SliderDestinations from '@/components/sections/SliderDestinations';

const LandingPage = ({
    globalState: {
        lang,
        siteData: { destinationList = [], categories = [] }
    }
    // landingData
}) => {
    // const dataLanding = JSON.parse(landingData);
    const { query, isReady } = useRouter();
    const [dataLoading, setDataLoading] = useState(true);
    const [loadMoreData, setLoadMoreData] = useState(false);
    const [expList, setExpList] = useState([]);
    const accepedTypes = ['all', 'digital', 'guided'];
    const currentPage = useRef(1);
    const totalCount = useRef(0);
    const totalPages = useRef(1);
    const filterType = useRef('all');
    const interest = useRef(null);
    const [pageIsReady, setPageIsReady] = useState(false);

    const getExps = async (category, type, page = 1) => {
        let response;
        console.log('category', category);
        if (category === 'all')
            response = await fetch(
                `/api/search/${type}?limit=${NEXT_PUBLIC_ITEMS_PER_PAGE}&page=${page}`
            );
        else
            response = await fetch(
                `/api/interests/${category}/${type}?limit=${NEXT_PUBLIC_ITEMS_PER_PAGE}&page=${page}`
            );
        const data = await response.json();

        return data;
    };

    const loadExperiences = (category, type, page = 1) => {
        getExps(category, type, page).then((data) => {
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
        loadExperiences(
            interest.current,
            filterType.current,
            currentPage.current + 1
        );
    };

    useEffect(() => {
        if (isReady) {
            if (query.id.length > 1) {
                if (query.id[0].toLowerCase() === 'all ')
                    interest.current = 'ALL';
                else {
                    interest.current = query.id[0].toLowerCase();
                    filterType.current = accepedTypes.includes(
                        query.id[1].toLowerCase()
                    )
                        ? query.id[1].toLowerCase()
                        : 'all';
                }
            } else if (query.id.length === 1) {
                if (query.id[0].toLowerCase() === 'all ')
                    interest.current = 'ALL';
                else interest.current = query.id[0].toLowerCase();
            } else {
                // 404
            }
            loadExperiences(interest.current, filterType.current);

            setPageIsReady(true);
        }
    }, []);

    return (
        <Layout>
            <Row>
                <SliderInterests
                    margins="mt-12 d-hdpi-2:mt-vw-12"
                    sectionTitles={translations[lang].sections.wanderByInterest}
                    // data={dataLanding?.data?.interests || []}
                    data={categories || []}
                    path={'/experiences/interest/'}
                    tagRatio="landscape"
                />
            </Row>

            {pageIsReady && (
                <>
                    <ExperienceFilter
                        query={query}
                        classes="-mt-8 d-hdpi-2:-mt-4"
                    />

                    <Row>
                        <div className="px-4 d-hdpi-2:px-vw-4">
                            <div className="flex flex-col gap-2 border-t pt-4 pb-8 border-gray-300 d-hdpi-2:gap-1 d-hdpi-2:pt-vw-4 d-hdpi-2:pb-vw-8">
                                {!dataLoading ? (
                                    <>
                                        <div className="text-3xl d-hdpi-2:text-vw-3xl tracking-tighter font-bold text-kn-primary">
                                            {categories.find(
                                                (item) =>
                                                    item.slug ===
                                                    interest.current
                                            )?.name ?? 'All Interests'}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
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
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex pt-2 mb-2 d-hdpi-2:pt-vw-2 d-hdpi-2:mb-vw-2">
                                            <SkeletonText
                                                height="h-6 d-hdpi-2:h-vw-6"
                                                width="w-36 d-hdpi-2:w-vw-36"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 pt-2 d-hdpi-2:gap1 d-hdpi-2:pt-vw-2">
                                            <SkeletonText
                                                height="h-4 d-hdpi-2:h-vw-4"
                                                width="w-20 d-hdpi-2:w-vw-20"
                                            />
                                            <SkeletonText
                                                height="h-4 d-hdpi-2:h-vw-4"
                                                width="w-36 d-hdpi-2:w-vw-36"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </Row>

                    <GridList
                        // sectionTitles={translations[lang].sections.trendingThisWeek}
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

// export async function getServerSideProps({ params }) {
//     let landingData = null;

//     try {
//         landingData = await getLandingPage();
//     } catch (error) {
//         return {
//             props: {},
//             notFound: true
//         };
//     }

//     return {
//         props: {
//             landingData: JSON.stringify(landingData?.data)
//         }
//     };
// }

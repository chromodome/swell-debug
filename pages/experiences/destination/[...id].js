import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import router, { useRouter } from 'next/router';
import Layout from '@/layouts/Layout';
import GridList from '@/sections/GridList';
import translations from '@/constants/translations';
import { countriesArray } from '@/helpers/countriesArray';
import ListBoxGeneric from '@/components/blocks/ListBoxGeneric';
import ExperienceFilter from '@/blocks/ExperienceFilter';
import LoadMore from '@/blocks/LoadMore';
import { NEXT_PUBLIC_ITEMS_PER_PAGE } from '@/constants/public';
import { pageCount } from '@/helpers/FEutils';
import SliderDestinations from '@/components/sections/SliderDestinations';
import { getLandingPage } from '@/helpers/apiServices/experiences';
import Row from '@/components/sections/Row';
import GenericSelectList from '@/components/blocks/GenericSelectList';
// import CountryList from '@/components/blocks/CountryList';

const LandingPage = ({
    globalState: {
        lang,
        siteData: { destinationList = [] }
    },
    landingData
}) => {
    const dataLanding = JSON.parse(landingData);
    const accepedTypes = ['all', 'digital', 'guided'];
    const { query, isReady } = useRouter();
    const [dataLoading, setDataLoading] = useState(true);
    const [loadMoreData, setLoadMoreData] = useState(false);
    const [expList, setExpList] = useState([]);
    const [guideDates, setGuideDates] = useState(
        [
            {
                code: 'n/a',
                name: 'Select a Destination...'
            },
            ...countriesArray
        ].map((country) => {
            const { code: id, name, slug } = country;

            return {
                id,
                name,
                slug,
                unavailable: false
            };
        })
    );
    const [selectedDate, setSelectedDate] = useState({});
    const currentPage = useRef(1);
    const totalPages = useRef(1);
    const totalCount = useRef(0);
    const filterType = useRef('all');
    const findParams = useRef([]);
    const [pageIsReady, setPageIsReady] = useState(false);

    const getExps = async (countryIds, type, page = 1) => {
        console.log('countryid', countryIds);
        let response;
        if (countryIds === 'WORLD')
            response = await fetch(
                `/api/search/${type}?limit=${NEXT_PUBLIC_ITEMS_PER_PAGE}&page=${page}`
            );
        else
            response = await fetch(
                `/api/destinations/${countryIds}/${type}?limit=${NEXT_PUBLIC_ITEMS_PER_PAGE}&page=${page}`
            );
        const data = await response.json();

        return data;
    };

    const countrySelect = (country) => {
        router.push(`${country.slug}/${filterType.current}`);
    };

    const loadExperiences = (countryIds, type, page = 1) => {
        getExps(countryIds, type, page).then((data) => {
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
            findParams.current,
            filterType.current,
            currentPage.current + 1
        );
    };

    useEffect(() => {
        console.log('selected country', selectedDate);
    }, [selectedDate]);

    useEffect(() => {
        console.log('query', query);
        if (isReady) {
            let found = destinationList.find(
                (element) =>
                    element.slug.toLowerCase() == query.id[0].toLowerCase()
            );
            setSelectedDate(guideDates[0]);

            if (destinationList.length) {
                if (!found) {
                    found = countriesArray.find(
                        (element) =>
                            element.slug.toLowerCase() ==
                            query.id[0].toLowerCase()
                    );

                    if (found) {
                        findParams.current = found.code;
                    } else {
                        findParams.current = 'WORLD';
                        // setDataLoading(false);
                    }
                } else {
                    findParams.current = found.country_list.join('-');
                }

                if (query.id.length > 1) {
                    filterType.current = accepedTypes.includes(
                        query.id[1].toLowerCase()
                    )
                        ? query.id[1].toLowerCase()
                        : 'all';
                }

                if (findParams.current.length) {
                    loadExperiences(findParams.current, filterType.current);
                }
            }
            setPageIsReady(true);
        }
    }, [destinationList]);

    return (
        <Layout>
            <SliderDestinations
                margins="mt-12"
                sectionTitles={translations[lang].sections.wanderByDestination}
                data={destinationList || []}
                tagRatio="landscape"
            />

            {pageIsReady && (
                <>
                    <ExperienceFilter query={query} classes="-mt-8" />
                    <Row>
                        {/* <GenericSelectList /> */}
                        <div className="w-80">
                            <ListBoxGeneric
                                listData={guideDates}
                                val={selectedDate}
                                handleChange={countrySelect}
                                className="mb-4"
                            />
                        </div>
                        {/* <CountryList
                            handleChange={countrySelect}
                            selectedValue={selectedCountry}
                            height="3.43rem"
                            width="w-full"
                            bgColor="white"
                            panelHeight="150px"
                            label="Country"
                            labelTextSize="0.875rem"
                            menuTextSize="0.75rem"
                            isLoading={false}
                        /> */}
                    </Row>
                    {!dataLoading && (
                        <Row>
                            <div className="px-4">
                                <div className="flex flex-wrap gap-2 border-t pt-4 pb-8 border-gray-300">
                                    {totalCount.current > 0 ? (
                                        <>
                                            <span className="text-xl font-light text-gray-700 tracking-tight">
                                                We found
                                            </span>
                                            <span className="text-xl font-semibold text-gray-700 tracking-tight">
                                                {`${totalCount.current} Experiences`}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-xl font-light text-gray-700 tracking-tight">
                                            We couldn't find any experiences
                                            matching your criteria
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Row>
                    )}
                    <GridList
                        // sectionTitles={
                        //     translations[lang].sections.trendingThisWeek
                        // }
                        data={expList}
                        btnLabel="Load More"
                        btnAction="load"
                        btnUrl="/experiences/search"
                        dataLoading={dataLoading}
                        handleLoadClick={handleLoadClick}
                        showButton={
                            currentPage.current !== totalPages.current ||
                            loadMoreData
                        }
                    />
                </>
            )}
            <LoadMore loadMoreData={loadMoreData} />
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

export async function getServerSideProps({ params }) {
    let landingData = null;

    try {
        landingData = await getLandingPage();
    } catch (error) {
        return {
            props: {},
            notFound: true
        };
    }

    return {
        props: {
            landingData: JSON.stringify(landingData?.data)
        }
    };
}

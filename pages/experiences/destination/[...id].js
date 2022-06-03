
import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import router, { useRouter } from "next/router";
import Layout from '@/layouts/Layout';
import GridList from '@/sections/GridList';
import translations from '@/constants/translations';
import { countriesArray } from '@/helpers/countriesArray';
import ListBoxGeneric from '@/components/blocks/ListBoxGeneric';
import ExperienceFilter from '@/blocks/ExperienceFilter';
import LoadMore from '@/blocks/LoadMore';
import { NEXT_PUBLIC_ITEMS_PER_PAGE } from '@/constants/public';
import { pageCount } from '@/helpers/FEutils';


const LandingPage = ({
    globalState: {
        lang,
        siteData: {
            destinationList=[]
        }
    },
}) => {
    const accepedTypes = ['all', 'digital', 'guided'];
    const { query, isReady } = useRouter();
    const [dataLoading, setDataLoading] = useState(true);
    const [loadMoreData, setLoadMoreData ] = useState(false);
    const [expList, setExpList] = useState([]);
    const [guideDates, setGuideDates] = useState([{
        code: 'n/a',
        name: 'Choose Country...'
    }, ...countriesArray].map((country) => {
        const { code: id, name, slug } = country;

        return {
            id,
            name,
            slug,
            unavailable: false
        };
    }));
    const [selectedDate, setSelectedDate] = useState({});
    const currentPage = useRef(1);
    const totalPages = useRef(1);
    const filterType = useRef('all');
    const findParams = useRef([]);
    const [pageIsReady, setPageIsReady] = useState(false);

    const getExps =  async (countryIds, type, page=1)=> {
        const response = await fetch(`/api/destinations/${countryIds}/${type}?limit=${NEXT_PUBLIC_ITEMS_PER_PAGE}&page=${page}`);
        const data = await response.json();

        return data;
    }

    const countrySelect = (country) => {
        console.log('country', country)
       // router.push(`${country.slug}/${filterType.current}`);
    }

    const loadExperiences = (countryIds, type, page=1) => {
        getExps(countryIds, type, page).then((data) => {
            const { count, page, pages, results } = data;

            currentPage.current = page;
            totalPages.current = pageCount(count, NEXT_PUBLIC_ITEMS_PER_PAGE);

            setExpList([...expList, ...results]);
            setDataLoading(false);
            setLoadMoreData(false);
        })
    }
    const handleLoadClick = () => {
        setLoadMoreData(true);
        loadExperiences(findParams.current, filterType.current, currentPage.current + 1 );
    }

    useEffect(() => {
        if(isReady) {
            let found = destinationList.find(element => element.slug.toLowerCase() == query.id[0].toLowerCase());
            setSelectedDate(guideDates[0]);

            if(destinationList.length) {
                if(!found) {
                    const slugList = query.id[0].toLowerCase().split('+');
                    findParams.current = slugList.reduce((last, next) => {
                        const finded = countriesArray.find(element => element.slug.toLowerCase() === next);
                            if(finded) {
                                return [...last, finded.code]
                            } else {
                                return last;
                            }
                    },[]).join('-')

                    if(!findParams.current.length) {
                        setDataLoading(false);
                    }
                } else {
                    findParams.current = found.country_list.join('-');
                }

                if(query.id.length > 1) {
                    filterType.current = accepedTypes.includes(query.id[1].toLowerCase()) ? query.id[1].toLowerCase() : 'all';
                }

                if(findParams.current.length) {
                    loadExperiences(findParams.current, filterType.current);
                }
            }
            setPageIsReady(true);
        }
    }, [destinationList]);
    

    return (
        <Layout>
            {pageIsReady && <>  
                <ExperienceFilter
                    query={query}
                />  
                <ListBoxGeneric
                    listData={guideDates}
                    val={selectedDate}
                    handleChange={countrySelect}
                    className='mb-4'
                />
                <GridList
                    sectionTitles={translations[lang].sections.trendingThisWeek}
                    data={expList}
                    btnLabel="Load More"
                    btnAction="load"
                    btnUrl="/experiences/search"
                    dataLoading={dataLoading}
                    handleLoadClick={handleLoadClick}
                    showButton={currentPage.current !== totalPages.current || loadMoreData}
                />
            </>}
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


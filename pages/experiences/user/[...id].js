
import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import router, { useRouter } from "next/router";
import Layout from '@/layouts/Layout';
import GridList from '@/sections/GridList';
import ExperienceFilter from '@/blocks/ExperienceFilter';
import { NEXT_PUBLIC_ITEMS_PER_PAGE } from '@/constants/public';
import LoadMore from '@/blocks/LoadMore';
import translations from '@/constants/translations';

const LandingPage = ({
    globalState: {
        lang
    },
}) => {
    const { query, isReady } = useRouter();
    const [dataLoading, setDataLoading] = useState(true);
    const [loadMoreData, setLoadMoreData ] = useState(false);
    const [expList, setExpList] = useState([]);
    const accepedTypes = ['all', 'digital', 'guided'];
    const currentPage = useRef(1);
    const totalPages = useRef(1);
    const filterType = useRef('all');
    const userName = useRef(null);
    const [pageIsReady, setPageIsReady] = useState(false);

    const getExps =  async (user, type, page=1)=> {
        const response = await fetch(`/api/user/${user}/${type}?limit=${NEXT_PUBLIC_ITEMS_PER_PAGE}&page=${page}`);
        const data = await response.json();

        return data;
    }
    const handleLoadClick = () => {
        setLoadMoreData(true);
        loadExperiences(userName.current, filterType.current, currentPage.current + 1 )
    }
    const loadExperiences = (user, type, page=1) => {
        getExps(user, type, page).then((data) => {
            const { page, pages, results } = data;

            currentPage.current = page;
            totalPages.current = pages ? Object.keys(pages).length : 1;

            setExpList([...expList, ...results]);
            setDataLoading(false);
            setLoadMoreData(false);
        })
    }

    useEffect(() => {
        if(isReady) {

            if(query.id.length > 1) {
                userName.current = query.id[0].toLowerCase();
                filterType.current = accepedTypes.includes(query.id[1].toLowerCase()) ? query.id[1].toLowerCase() : 'all';
            } else if(query.id.length === 1) {
                userName.current = query.id[0].toLowerCase();
            } else {
                // 404
            }

            loadExperiences(userName.current, filterType.current)
            setPageIsReady(true);
        }
        
    }, []);
    

    return (
        <Layout>
            {pageIsReady && <>
                <ExperienceFilter
                    query={query}
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

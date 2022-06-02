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

const LandingPage = ({ globalState: { lang } }) => {
    const { query, isReady } = useRouter();
    const accepedTypes = ['all', 'digital', 'guided'];
    const [dataLoading, setDataLoading] = useState(true);
    const [loadMoreData, setLoadMoreData] = useState(false);
    const [expList, setExpList] = useState([]);
    const currentPage = useRef(1);
    const totalPages = useRef(1);
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
                    <ExperienceFilter query={query} />
                    <GridList
                        sectionTitles={
                            translations[lang].sections.exploreEverything
                        }
                        margins={'mt-12 mb-12'}
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

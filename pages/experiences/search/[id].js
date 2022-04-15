
import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import router, { useRouter } from "next/router";
import Layout from '@/layouts/Layout';
import GridList from '@/sections/GridList';
import translations from '@/constants/translations';
import ExperienceFilter from '@/blocks/ExperienceFilter';

const LandingPage = ({
    globalState: {
        lang,
    },
}) => {
    const { query, isReady } = useRouter();
    const accepedTypes = ['all', 'digital', 'guided'];
    const [dataLoading, setDataLoading] = useState(true);
    const [loadMoreData, setLoadMoreData ] = useState(false)
    const [expList, setExpList] = useState([]);
    const currentPage = useRef(1);
    const totalPages = useRef(1);
    const currentType = useRef('all');
    const loadLimit = useRef(10)

    const getExps =  async (type, page=1)=> {
        const response = await fetch(`/api/search/${type}?limit=${loadLimit.current}&page=${page}`);
        const data = await response.json();

        return data;
    }

    const loadExperiences = (type, page=1) => {
        getExps(type, page).then((data) => {
            const { page, pages, results } = data;

            currentPage.current = page;
            totalPages.current = pages ? Object.keys(pages).length : 1;

            setExpList([...expList, ...results]);
            setDataLoading(false);
            setLoadMoreData(false);
        })
    }

    const handleLoadClick = () => {
        setLoadMoreData(true);
        loadExperiences(currentType.current, currentPage.current + 1 )
    }

    useEffect(() => {
        if(isReady) {
            let type = query.id.toLowerCase();
    
            type = accepedTypes.includes(type) ? type : 'all';
            currentType.current = type;
            loadExperiences(type);
            
        }
    }, []);

    return (
        <Layout>
        {  isReady &&  <>
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
            {
                loadMoreData
                && <div className={`mb-12 mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40`}>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        Loadng more data....
                    </div>
                </div>
            }
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


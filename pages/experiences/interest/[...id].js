
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouter } from "next/router";
import Layout from '@/layouts/Layout';
import GridList from '@/sections/GridList';
import translations from '@/constants/translations';
import ExperienceFilter from '@/blocks/ExperienceFilter';

const LandingPage = ({
    globalState: {
        lang
    },
}) => {
    const { query, isReady } = useRouter();
    const [dataLoading, setDataLoading] = useState(true);
    const [expList, setExpList] = useState([]);
    const accepedTypes = ['all', 'digital', 'guided'];
    const getExps =  async (category, type)=> {
        const response = await fetch(`/api/interests/${category}/${type}`);
        const data = await response.json();

        console.log('responsev', data)
        return data;
    }

    useEffect(() => {
        if(isReady) {
            let type = 'all';
            let category = '';

            if(query.id.length > 1) {
                category = query.id[0].toLowerCase();
                type = accepedTypes.includes(query.id[1].toLowerCase()) ? query.id[1].toLowerCase() : 'all';
            } else if(query.id.length === 1) {
                category = query.id[0].toLowerCase();
            } else {
                // 404
            }

            getExps(category, type).then((data) => {
                setExpList(data.results);
                setDataLoading(false);
            });
        }
        
    }, []);
    

    return (
        <Layout>
            {isReady && <>
                <ExperienceFilter
                    query={query}
                />
                <GridList
                    sectionTitles={translations[lang].sections.trendingThisWeek}
                    data={expList}
                    btnLabel="Explore all experiences"
                    btnAction="url"
                    btnUrl="/experiences/search/all"
                    dataLoading={dataLoading}
                />
            </>}
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


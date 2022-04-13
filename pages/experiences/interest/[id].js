
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import router, { useRouter } from "next/router";
import Layout from '@/layouts/Layout';
import GridList from '@/sections/GridList';
import translations from '@/constants/translations';


const LandingPage = ({
    globalState: {
        lang
    },
}) => {
    const { query, isReady } = useRouter();
    const [dataLoading, setDataLoading] = useState(true);
    const [expList, setExpList] = useState([]);
    const getExps =  async (category)=> {
        const response = await fetch(`/api/interests/${category}`);
        const data = await response.json();

        return data;
    }
console.log('expList', expList)

    useEffect(() => {
        if(isReady) {
            const category = query.id;

            getExps(category).then((data) => {
                setExpList(data.results);
                setDataLoading(false);
            })
        }
        
    }, []);
    

    return (
        <Layout>
            {isReady && <>  
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


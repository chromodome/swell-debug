
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


const LandingPage = ({
    globalState: {
        lang,
        siteData: {
            destinationList=[]
        }
    },
}) => {
    const accepedTypes = ['all', 'digital', 'guided'];
    const filyerType = useRef('all');
    const { query, isReady } = useRouter();
    const [dataLoading, setDataLoading] = useState(true);
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
    const getExps =  async (countryIds, type)=> {
        const response = await fetch(`/api/destinations/${countryIds}/${type}`);
        const data = await response.json();

        return data;
    }

    const countrySelect = (country) => {
        router.push(`${country.slug}/${filyerType.current}`);
    }


    useEffect(() => {
        if(isReady) {
            let type = 'all';
            let found = destinationList.find(element => element.slug.toLowerCase() == query.id[0].toLowerCase());
            setSelectedDate(guideDates[0]);
            if(destinationList.length) {
                let findParams = '';
                if(!found) {
                    found = countriesArray.find(element => element.slug.toLowerCase() == query.id[0].toLowerCase());

                    if(found) {
                        findParams =  found.code;
                    } else {
                        setDataLoading(false);
                    }
                } else {
                    findParams = found.country_list.join('-')
                }

                if(query.id.length > 1) {
                    type = accepedTypes.includes(query.id[1].toLowerCase()) ? query.id[1].toLowerCase() : 'all';
                }
                filyerType.current = type;
                if(findParams.length) {
                    getExps(findParams, type).then((data) => {
                        setExpList(data.results);
                        setDataLoading(false);
                    })
                }
            }
        }
    }, [destinationList]);
    

    return (
        <Layout>
            {isReady && <>  
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


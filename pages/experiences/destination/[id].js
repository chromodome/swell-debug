
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import router, { useRouter } from "next/router";
import Layout from '@/layouts/Layout';
import GridList from '@/sections/GridList';
import translations from '@/constants/translations';
import { countriesArray } from '@/helpers/countriesArray';
import ListBoxGeneric from '@/components/blocks/ListBoxGeneric';


const LandingPage = ({
    globalState: {
        lang,
        siteData: {
            destinationList=[]
        }
    },
}) => {
    const { query, isReady } = useRouter();
    const [dataLoading, setDataLoading] = useState(true);
    const [expList, setExpList] = useState([]);
    const [guideDates, setGuideDates] = useState([{
        code: 'n/a',
        name: 'Choose Country...'
    }, ...countriesArray].map((country) => {
        const { code: id, name } = country;

        return {
            id,
            name,
            unavailable: false
        };
    }));
    const [selectedDate, setSelectedDate] = useState({});
    const getExps =  async (countryIds)=> {
        const response = await fetch(`/api/destinations/${countryIds}`);
        const data = await response.json();

        return data;
    }

    const countrySelect = (country) => {
        console.log(country)
        router.push(`${country.name}`);
    }

    useEffect(() => {
        if(isReady) {
            let found = destinationList.find(element => element.name == query.id);
            setSelectedDate(guideDates[0]);
            if(destinationList.length) {
                let findParams = '';
                if(!found) {
                    found = countriesArray.find(element => element.name == query.id);

                    if(found) {
                        findParams =  found.code;
                    } else {
                        setDataLoading(false);
                    }
                } else {
                    findParams = found.country_list.join('-')
                }
                if(findParams.length) {
                    getExps(findParams).then((data) => {
                        setExpList(data.results);
                        setDataLoading(false);
                        console.log(data)
                    })
                }
            }
        }
    }, [destinationList]);
    

    return (
        <Layout>
            <>  
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
                    btnUrl="/experiences/search"
                    dataLoading={dataLoading}
                />
            </>
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


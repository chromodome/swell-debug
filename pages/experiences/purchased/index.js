
import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import router, { useRouter } from "next/router";
import Layout from '@/layouts/Layout';

import { fetchPurchasedAll } from '@/helpers/apiServices/purchases';
import GridList from '@/sections/GridList';
import translations from '@/constants/translations';
// import ExperiencePurchasedList from '@/components/purchased/ExperiencePurchasedList';



const Purchased = ({
    auth,
    globalState: {
        lang
    },
    purchasedExperiences,
    fetchPurchasedAll
}) => {
    const { query, isReady } = useRouter();
    const [pageIsReady, setPageIsReady] = useState(false);
    const [missingList, setMissingList] = useState([]);
    const [digitalList, setDigitalList] = useState([]);
    const [guidedList, setguidedList] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const parseExperienceData = (expData) => {

        return expData.map((data) => {
            const {
                people,
                travel_date: travelDate,
                experience,
                experience: {
                    title: name,
                    places_lists,
                    user: {
                        username,
                        profile: {
                            first,
                            last,
                            avatar,
                            displayname
                        }
                    }
                } 
                
            
            } = data;
            return {
                people,
                travelDate,
                name,
                content: {
                    ...experience,
                    username,
                    first,
                    last,
                    avatar,
                    displayname,
                    destinations: places_lists.map(dest => dest.name)
                }
            };
        })

    }


    useEffect(() => {
        if(isReady) {
            if (auth.isAuthenticated) {
                fetchPurchasedAll().then(() => {
                
                });
            }
            //loadExperiences(userName.current, filterType.current)
            setPageIsReady(true);
        }
        
    }, [auth]);
    
    useEffect(() => {
        const { digital, guided, missing } = purchasedExperiences;

        if(digital.length) {
            setDigitalList(parseExperienceData(digital))
        }
        if(guided.length) {
            setguidedList(parseExperienceData(guided))
        }
        if(missing.length) {
            setMissingList(missing)
        }

    }, [purchasedExperiences]);

    return (
        <Layout>
            {pageIsReady && auth.isAuthenticated && <>
                {/* Missing */}
                { missingList.length
                ? <GridList
                    missing={true}
                    sectionTitles={{ title: 'Missing', subTitle: '' }}
                    data={missingList}
                    purchasedView={true}
                />
                : null}
                {/* Digital */}
                {digitalList.length
                ? <GridList
                    sectionTitles={{ title: 'Digital', subTitle: '' }}
                    data={digitalList}
                    purchasedView={true}
                />
                : null}

                {/* Guided */}
                {guidedList.length
                ? <GridList
                    sectionTitles={{ title: 'Guided', subTitle: '' }}
                    data={guidedList}
                    purchasedView={true}
                />
                : null}
            </>}
            {!auth.isAuthenticated && 
                <div>Log in to see this page</div>
            }
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    purchasedExperiences: state.purchased,
    globalState: state.globalState,
    auth: state.auth
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchPurchasedAll
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchased);


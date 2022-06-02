import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import router, { useRouter } from 'next/router';
import Layout from '@/layouts/Layout';

import { fetchPurchasedAll } from '@/helpers/apiServices/purchases';
import GridList from '@/sections/GridList';
import translations from '@/constants/translations';
import SectionTitle from '@/components/blocks/Title/SectionTitle';
import classNames from 'classnames';
// import ExperiencePurchasedList from '@/components/purchased/ExperiencePurchasedList';

const Purchased = ({
    auth,
    globalState: { lang },
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
                        profile: { first, last, avatar, displayname }
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
                    destinations: places_lists.map((dest) => dest.name)
                }
            };
        });
    };

    useEffect(() => {
        if (isReady) {
            if (auth.isAuthenticated) {
                fetchPurchasedAll().then(() => {});
            }
            //loadExperiences(userName.current, filterType.current)
            setPageIsReady(true);
        }
    }, [auth]);

    useEffect(() => {
        const { digital, guided, missing } = purchasedExperiences;

        if (digital.length) {
            setDigitalList(parseExperienceData(digital));
        }
        if (guided.length) {
            setguidedList(parseExperienceData(guided));
        }
        if (missing.length) {
            setMissingList(missing);
        }
    }, [purchasedExperiences]);

    if (!auth.isAuthenticated) router.push('/');

    return (
        <Layout>
            {pageIsReady && auth.isAuthenticated && (
                <>
                    <div
                        className={classNames(
                            'mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40'
                        )}>
                        <div className="px-4 mt-36 mb-20">
                            <SectionTitle
                                section={{
                                    title: 'My Purchases'
                                }}
                                padding=""
                                size="text-5xl"
                                className=""
                            />
                            <div>
                                Clicking on a card will open a new tab and take
                                you to the Konnect Experience Viewer.
                            </div>
                        </div>
                    </div>
                    {/* Digital */}
                    {digitalList.length ? (
                        <GridList
                            sectionTitles={{
                                title: 'Digital Experiences'
                            }}
                            data={digitalList}
                            purchasedView={true}
                            margins="mb-24"
                            titleColor="text-green-400"
                            titleClass=""
                        />
                    ) : null}

                    {/* Guided */}
                    {guidedList.length ? (
                        <GridList
                            sectionTitles={{
                                title: 'Guided Experiences'
                            }}
                            data={guidedList}
                            purchasedView={true}
                            margins="mb-24"
                            titleColor="text-green-400"
                            titleClass=""
                        />
                    ) : null}
                    {/* Missing */}
                    {/* {missingList.length ? (
                        <GridList
                            missing={true}
                            sectionTitles={{ title: 'Missing', subTitle: '' }}
                            data={missingList}
                            purchasedView={true}
                        />
                    ) : null} */}
                </>
            )}
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    purchasedExperiences: state.purchased,
    globalState: state.globalState,
    auth: state.auth
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchPurchasedAll
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchased);

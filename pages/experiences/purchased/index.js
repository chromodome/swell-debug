import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import router, { useRouter } from 'next/router';
import Layout from '@/layouts/Layout';
import ButtonLoad from '@/blocks/Button/ButtonLoad';
import { fetchPurchasedAll } from '@/helpers/apiServices/purchases';
import GridList from '@/sections/GridList';
import translations from '@/constants/translations';
import SectionTitle from '@/components/blocks/Title/SectionTitle';
import classNames from 'classnames';
import Row from '@/components/sections/Row';
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
                creator: {
                    username,
                    first,
                    last,
                    avatar, 
                    displayname
                },
                content: {
                    ...experience,
                    destinations: places_lists.map((dest) => dest.name)
                }
            };
        });
    };

    useEffect(() => {
        if (isReady) {
            if (auth.isAuthenticated) {
                fetchPurchasedAll().then(() => {});
                setPageIsReady(true);
            } else {
                router.push('/');
            }
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

    const handleBrowse = () => {
        router.push('/experiences/search/all');
    };

    return (
        <Layout>
            {/* {!auth.isAuthenticated && <div>Log in to view this page</div>} */}
            {pageIsReady && auth.isAuthenticated && (
                <>
                    <div
                        className={classNames(
                            'mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40'
                        )}>
                        <div className="px-4 mt-12 md:mt-20">
                            <SectionTitle
                                section={{
                                    title: 'My Purchases'
                                }}
                                padding=""
                                size="text-4xl md:text-5xl"
                                className=""
                            />
                            {digitalList?.length || guidedList?.length ? (
                                <div className="mb-12">
                                    Clicking on an experience will open a new
                                    tab and take you to the Konnect Experience
                                    Viewer.
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {digitalList?.length || guidedList?.length ? (
                        <>
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
                        </>
                    ) : (
                        <Row>
                            <div
                                className={classNames(
                                    'bg-gray-50 rounded-lg  flex w-full h-96 items-center justify-center'
                                )}>
                                <div className="flex flex-col items-center px-4">
                                    <div className="text-center">
                                        Seems you don't have any plans yet. How
                                        about we change that?
                                    </div>
                                    <ButtonLoad
                                        handleClick={handleBrowse}
                                        isLoading={false}
                                        label={'Show me the world'}
                                    />
                                </div>
                            </div>
                        </Row>
                    )}

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

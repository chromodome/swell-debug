import Layout from '@/layouts/Layout';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Showcase from '@/sections/Showcase';
import SliderExperiences from '@/components/sections/SliderExperiences';
import SliderInterests from '@/sections/SliderInterests';
import SliderDestinations from '@/sections/SliderDestinations';
import SliderCollections from '@/sections/SliderCollections';
import GridList from '@/sections/GridList';
import translations from '@/constants/translations';

import { getLandingPage } from '@/helpers/apiServices/experiences';
import { randomItem } from '@/helpers/FEutils';

const LandingPage = ({ globalState: { lang } }) => {
    const [dataLanding, setDataLanding] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        const importData = async () => {
            const newData = await getLandingPage();
            setDataLanding(newData.data);
            setDataLoading(false);
        };
        importData();
    }, []);
    return (
        <Layout>
            <Showcase
                pill="bottom"
                data={
                    dataLoading ? null : randomItem(dataLanding?.data?.landing)
                }
                dataLoading={dataLoading}
                collection="showcase"
            />

            <>
                <SliderExperiences
                    sectionTitles={translations[lang].sections.newThisMonth}
                    data={dataLanding?.data?.exp_latest}
                    dataLoading={dataLoading}
                />
                <SliderInterests
                    sectionTitles={translations[lang].sections.wanderByInterest}
                    data={dataLanding?.data?.interests}
                    dataLoading={dataLoading}
                />

                <Showcase
                    pill="top"
                    data={
                        dataLoading
                            ? null
                            : randomItem(dataLanding?.data?.features)
                    }
                    dataLoading={dataLoading}
                />
                <SliderDestinations
                    sectionTitles={
                        translations[lang].sections.wanderByDestination
                    }
                    data={dataLanding?.data?.destinations}
                    dataLoading={dataLoading}
                />
                {/* <SliderCollections
                    sectionTitles={translations[lang].sections.curatedCollections}
                    data={dataCollections}
                    boxed
                /> */}
                <GridList
                    sectionTitles={translations[lang].sections.trendingThisWeek}
                    data={dataLanding?.data?.exp_trending}
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

// export async function getServerSideProps() {
//     const { data: dataLanding } = await getLandingPage();
//     const res1 = await fetch(`${API_URL}/experiences`);
//     const dataNewThisMonth = await res1.json();
//     const res4 = await fetch(`${API_URL_MOCK}/api/featured`);
//     const dataFeatured = await res4.json();
//     const res5 = await fetch(`${API_URL_MOCK}/api/collections`);
//     const dataCollections = await res5.json();
//     return {
//         props: {
//             dataLanding,
//             dataFeatured,
//             dataCollections
//         }
//     };
// }

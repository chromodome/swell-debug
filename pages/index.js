import Layout from '@/layouts/Layout';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SwellController } from '@/swell/api/swellNode';
import Showcase from '@/sections/Showcase';
import SliderExperiences from '@/components/sections/SliderExperiences';
import SliderInterests from '@/sections/SliderInterests';
import SliderDestinations from '@/sections/SliderDestinations';
import SliderCollections from '@/sections/SliderCollections';
import GridList from '@/sections/GridList';
import translations from '@/constants/translations';
import { getLandingPage } from '@/helpers/apiServices/experiences';
import { randomItem } from '@/helpers/FEutils';
import {
    NEXT_PUBLIC_LATEST_PER_PAGE,
    NEXT_PUBLIC_TRENDING_PER_PAGE
} from '@/constants/public';
import Row from '@/components/sections/Row';
import Community from '@/components/sections/Community';
import SliderShowcases from '@/components/sections/SliderShowcases';

const LandingPage = ({
    globalState: {
        lang,
        siteData: { destinationList, categories }
    },
    latest: { results: latestList },
    landingData,
    trending: { results: trendingList }
}) => {
    const dataLanding = JSON.parse(landingData);
    const [randomCover, setRandomCover] = useState(
        randomItem(dataLanding?.data?.landing)
    );

    return (
        <Layout>
            <Showcase pill="bottom" data={randomCover} collection="showcase" />

            <div className="hidden d-hdpi-2:block">Min Res is 2</div>
            <div className="hidden d-hdpi-3:block">Min Res is 3</div>
            <GridList
                sectionTitles={translations[lang].sections.trendingThisWeek}
                data={trendingList}
                btnLabel="Explore all experiences"
                btnPos="side"
                btnAction="url"
                btnUrl="/experiences/destination/world/all"
                margins="mt-16 mb-8 lg:mt-12 lg:mb-12 d-hdpi-2:mt-vw-12 d-hdpi-2:mb-vw-12"
                titleClass=""
            />

            <Row>
                <div className="">
                    <SliderDestinations
                        world={false}
                        sectionTitles={
                            translations[lang].sections.wanderByDestination
                        }
                        data={destinationList || []}
                        tagRatio="portrait2"
                    />
                </div>
            </Row>
            {/* <Row>
                    <div className="px-4">
                        <SliderExperiences
                            sectionTitles={
                                translations[lang].sections.newThisMonth
                            }
                            latestList={latestList}
                        />
                    </div>
                </Row> */}
            {/* <Row>
                    <div className="px-4">
                        <SliderInterests
                            sectionTitles={
                                translations[lang].sections.wanderByInterest
                            }
                            data={categories || []}
                            path={'/experiences/interest/'}
                            world={false}
                        />
                    </div>
                </Row> */}

            {/* <Showcase
                pill="top"
                data={randomItem(dataLanding?.data?.features)}
            /> */}
            <SliderShowcases data={dataLanding?.data?.features} />
            <Community />

            {/* <SliderCollections
                    sectionTitles={translations[lang].sections.curatedCollections}
                    data={dataLanding?.data?.curated || []}
                    boxed
                /> */}
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

export async function getStaticProps({ params }) {
    let latest = null;
    let landingData = null;
    let trending = null;

    try {
        latest = await SwellController.getLatestExperiences(
            NEXT_PUBLIC_LATEST_PER_PAGE
        );
        trending = await SwellController.trending(
            NEXT_PUBLIC_TRENDING_PER_PAGE
        );
        landingData = await getLandingPage();
    } catch (error) {
        return {
            props: {},
            notFound: true
        };
    }

    return {
        props: {
            trending,
            latest,
            landingData: JSON.stringify(landingData?.data)
        },

        revalidate: Number(process.env.NEXT_REVALIDATE_PERIOD_LANDING)
    };
}

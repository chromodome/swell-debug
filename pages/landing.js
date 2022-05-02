
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
import {NEXT_PUBLIC_LATEST_PER_PAGE, NEXT_PUBLIC_TRENDING_PER_PAGE } from '@/constants/public';



const LandingPage = ({
    globalState: {
        lang,
        siteData: {
            destinationList
        }
    },
    latest: { results: latestList },
    landingData,
    trending: { results: trendingList },
}) => {
  //  const [dataLanding, setDataLanding] = useState(null);
    const dataLanding = JSON.parse(landingData);
    const [date, setDate] = useState()

    return (
        <Layout>
            <Showcase
                pill="bottom"
                data={randomItem(dataLanding?.data?.landing)}
                collection="showcase"
            />

            <>
                <SliderExperiences
                    sectionTitles={translations[lang].sections.newThisMonth}
                    latestList={latestList}
                />
                <SliderInterests
                    sectionTitles={translations[lang].sections.wanderByInterest}
                    data={dataLanding?.data?.interests || []}
                    path={'/experiences/interest/'}
                />

                <Showcase
                    pill="top"
                    data={ randomItem(dataLanding?.data?.features)  }
                />
                <SliderDestinations
                    sectionTitles={
                        translations[lang].sections.wanderByDestination
                    }
                    data={destinationList || []}
                />
                {/* <SliderCollections
                    sectionTitles={translations[lang].sections.curatedCollections}
                    data={dataLanding?.data?.curated || []}
                    boxed
                /> */}
                <GridList
                    sectionTitles={translations[lang].sections.trendingThisWeek}
                    data={trendingList}
                    btnLabel="Explore all experiences"
                    btnAction="url"
                    btnUrl="/experiences/search/all"
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

export async function getStaticProps({ params }) {
    let latest = null;
    let landingData = null;
    let trending = null;

    try {
        latest =  await SwellController.getLatestExperiences(NEXT_PUBLIC_LATEST_PER_PAGE);
        trending = await  SwellController.trending(NEXT_PUBLIC_TRENDING_PER_PAGE);
        landingData = await getLandingPage();

    } catch (error) {
        console.log(error)
        return {
            props: {},
            notFound: true
        };
    }

    return { 
        props: {
            trending,
            latest,
            landingData:  JSON.stringify( landingData?.data)
        },

        revalidate: Number(process.env.NEXT_REVALIDATE_PERIOD)
    }

}

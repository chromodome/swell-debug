import Layout from '@/layouts/Layout';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Showcase from '@/sections/Showcase';
import SliderExperiences from '@/components/sections/SliderExperiences';
import SliderInterests from '@/sections/SliderInterests';
import SliderDestinations from '@/sections/SliderDestinations';
import SliderCollections from '@/sections/SliderCollections';
import GridList from '@/sections/GridList';
import translations from '@/constants/translations';
import { API_URL_MOCK } from '@/config/index';

export default function HomePage({
    dataNewThisMonth,
    dataInterests,
    dataDestinations,
    dataFeatured,
    dataCollections,
    dataTrending
}) {
    const { lang } = useContext(AuthContext);

    return (
        <Layout>
            <Showcase
                pill="bottom"
                data={dataFeatured.find((one) => one.collection == 'showcase')}
            />
            <SliderExperiences
                sectionTitles={translations[lang].sections.newThisMonth}
                data={dataNewThisMonth}
            />
            <SliderInterests
                sectionTitles={translations[lang].sections.wanderByInterest}
                data={dataInterests}
            />
            <Showcase
                pill="top"
                data={
                    dataFeatured.filter(
                        (one) => one.collection == 'experience'
                    )[1]
                }
            />
            <SliderDestinations
                sectionTitles={translations[lang].sections.wanderByDestination}
                data={dataDestinations}
            />
            <SliderCollections
                sectionTitles={translations[lang].sections.curatedCollections}
                data={dataCollections}
                boxed
            />
            <GridList
                sectionTitles={translations[lang].sections.trendingThisWeek}
                data={dataTrending}
            />
        </Layout>
    );
}

export async function getServerSideProps() {
    const res1 = await fetch(`${API_URL_MOCK}/api/experiences`);
    const dataNewThisMonth = await res1.json();

    const res2 = await fetch(`${API_URL_MOCK}/api/interests`);
    const dataInterests = await res2.json();

    const res3 = await fetch(`${API_URL_MOCK}/api/destinations`);
    const dataDestinations = await res3.json();

    const res4 = await fetch(`${API_URL_MOCK}/api/featured`);
    const dataFeatured = await res4.json();

    const res5 = await fetch(`${API_URL_MOCK}/api/collections`);
    const dataCollections = await res5.json();

    const res6 = await fetch(`${API_URL_MOCK}/api/experiences`);
    const dataTrending = await res6.json();

    return {
        props: {
            dataNewThisMonth,
            dataInterests,
            dataDestinations,
            dataFeatured,
            dataCollections,
            dataTrending
        }
        // revalidate: 1
    };
}

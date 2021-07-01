import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Layout from '@/layouts/Layout';
import Showcase from '@/sections/Showcase';
import SliderExperiences from '@/components/sections/SliderExperiences';
import SliderInterests from '@/sections/SliderInterests';
import SliderDestinations from '@/sections/SliderDestinations';
import SliderCollections from '@/sections/SliderCollections';
import GridList from '@/sections/GridList';
import translations from '@/constants/translations';
import { API_URL } from '@/config/index';
import ButtonsRow from '@/components/blocks/ButtonsRow';
import Row from '@/sections/Row';

export default function SearchPage({
    dataNewThisMonth,
    dataInterests,
    dataDestinations,
    dataFeatured,
    dataCollections,
    dataTrending,
    dataExperinces
}) {
    const { lang } = useContext(AuthContext);

    return (
        <Layout>
            <Row classes="mt-20">
                <ButtonsRow
                    type="selectable"
                    items={['All Types', 'Guided', 'Digital']}
                />
            </Row>
            <Row classes="mt-10">
                <h3 className="text-3xl">
                    We found {dataExperinces.length} experiences
                </h3>
                <ButtonsRow
                    type="exception"
                    items={['France', 'Freestyle trekking', '7 days']}
                />
            </Row>

            <GridList data={dataExperinces} />
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
            <SliderExperiences
                sectionTitles={translations[lang].sections.trendingThisWeek}
                data={dataNewThisMonth}
            />
        </Layout>
    );
}

export async function getServerSideProps() {
    const res1 = await fetch(`${API_URL}/api/experiences`);
    const dataNewThisMonth = await res1.json();

    const res2 = await fetch(`${API_URL}/api/interests`);
    const dataInterests = await res2.json();

    const res3 = await fetch(`${API_URL}/api/destinations`);
    const dataDestinations = await res3.json();

    const res4 = await fetch(`${API_URL}/api/featured`);
    const dataFeatured = await res4.json();

    const res5 = await fetch(`${API_URL}/api/collections`);
    const dataCollections = await res5.json();

    const res6 = await fetch(`${API_URL}/api/experiences`);
    const dataTrending = await res6.json();

    return {
        props: {
            dataNewThisMonth,
            dataInterests,
            dataDestinations,
            dataFeatured,
            dataCollections,
            dataTrending,
            dataExperinces: dataTrending
        }
    };
}

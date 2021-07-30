import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Layout from '@/layouts/Layout';
import Showcase from '@/sections/Showcase';
import SliderExperiences from '@/sections/SliderExperiences';
import SliderInterests from '@/sections/SliderInterests';
import SliderDestinations from '@/sections/SliderDestinations';
import SliderCollections from '@/sections/SliderCollections';
import GridList from '@/sections/GridList';
import translations from '@/constants/translations';
import { API_URL_MOCK } from '@/config/index';
import ButtonsRow from '@/blocks/Button/ButtonsRow';
import Row from '@/sections/Row';
import { getExperiences } from '../../helpers/apiServices/experiences';
//import { getAllTags } from '@/apiServices/tags';

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
    console.log(dataExperinces);
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
                    {dataExperinces.length > 0
                        ? `We found ${dataExperinces.length} experiences`
                        : `We didn't found any experience. `}
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

    const { data } = await getExperiences();
    const experiences = await data;

    return {
        props: {
            dataNewThisMonth,
            dataInterests,
            dataDestinations,
            dataFeatured,
            dataCollections,
            dataTrending: experiences,
            dataExperinces: experiences
        }
    };
}

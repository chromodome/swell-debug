import { useContext, useEffect } from 'react';
import AuthContext from '@/context/AuthContext';
import { StoreContext } from 'store';
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
import { getAllTags } from '../../helpers/apiServices/tags';

export default function SearchPage({
    dataNewThisMonth,
    dataInterests,
    dataDestinations,
    dataFeatured,
    dataCollections,
    dataExperinces,
    tags
}) {
    const { lang } = useContext(AuthContext);

    const [{ search }, dispatch] = useContext(StoreContext);

    const { selectedTags, filteredExperiences } = search;

    const removeSelectedTag = async (id) => {
        await dispatch({ type: 'removeSelectedTag', payload: id });

        if (selectedTags.length !== 1) {
            await dispatch({ type: 'searchExperiences' });
        }
    };

    useEffect(() => {
        if (search.tags.length === 0) {
            dispatch({ type: 'addAllTags', payload: tags });
        }
        if (search.experiences.length === 0) {
            dispatch({ type: 'addAllExperiences', payload: dataExperinces });
        }
    }, [search.tags, search.experiences]);

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
                    {filteredExperiences.length > 0
                        ? `We found ${filteredExperiences.length} experience${
                              filteredExperiences.length > 1 ? 's' : ''
                          }`
                        : `We didn't found any experience. `}
                </h3>
                <ButtonsRow
                    type="exception"
                    items={selectedTags}
                    handleClick={removeSelectedTag}
                />
            </Row>

            <GridList data={filteredExperiences} />
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

    const { data: experiences } = await getExperiences();

    const { data: tags } = await getAllTags();

    return {
        props: {
            dataNewThisMonth,
            dataInterests,
            dataDestinations,
            dataFeatured,
            dataCollections,
            dataExperinces: experiences,
            tags
        }
    };
}

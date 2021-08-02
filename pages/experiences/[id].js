import React from 'react';
import { API_URL, API_URL_MOCK } from '@/config/index';
import { useRouter } from 'next/router';
import Layout from '@/layouts/Layout';
import Row from '@/sections/Row';
import { Buttons__NextPrev, Button } from '@/blocks/Button/Buttons';
import ButtonLoad from '@/blocks/Button/ButtonLoad';
import ExperienceHeader from '@/sections/ExperienceHeader';
import TileImages from '@/sections/TileImages';
import BookingCard from '@/blocks/Card/BookingCard';
import BuyingCard from '@/blocks/Card/BuyingCard';
import BlockTitle from '@/blocks/Title/BlockTitle';
import ListWithIcon from '@/blocks/ListWithIcon';
import JourneyDaySlider from '@/sections/JourneyDaySlider';
import SliderExperiences from '@/sections/SliderExperiences';
import KreatorSection from '@/components/sections/KreatorSection';

export default function ExperienceDetail({ data, allExpData }) {
    const router = useRouter();

    if (data.length === 0) {
        return <div>Experience {router.query?.id} doesn't exist.</div>;
    }

    console.log(data[0]);

    const {
        authorId,
        days,
        destination,
        featured_image,
        id,
        price,
        type,
        recommended_for,
        overview_intro
    } = data[0];

    return (
        <Layout>
            <Row classes="mt-20 mb-12 mx-4">
                <Buttons__NextPrev
                    prev
                    icon="SHORT"
                    label="All Experiences"
                    buttonClasses="w-full max-w-max pl-4 pr-4 bg-kn-white"
                    goBackBtn
                />
            </Row>
            <Row classes="mt-20 mb-12">
                <ExperienceHeader
                    sectionTitles={{
                        title: overview_intro.title,
                        subTitle: destination.locations[0].place
                    }}
                    days={days}
                    type={type}
                    authorId={authorId}
                />
            </Row>
            <Row classes="mb-12">
                <TileImages
                    withGallery
                    url={[
                        featured_image,
                        featured_image,
                        featured_image,
                        featured_image
                    ]}
                />
            </Row>

            <Row classes="grid grid-cols-3 grid-rows-2 gap-3 mb-12">
                <div className="row-span-1 col-span-2 mb-12">
                    <ListWithIcon
                        title="What you need to know"
                        items={[
                            {
                                icon: 'calendar',
                                value: `${days} days, ${
                                    destination.locations.length
                                }
                        ${
                            destination.locations.length > 1
                                ? 'Contries'
                                : 'Contry'
                        }`
                            },
                            { icon: null, value: 'Humid experience' },
                            {
                                icon: 'USER',
                                value: `For maximum
                            ${
                                recommended_for[recommended_for.length - 1]
                            } people`
                            },
                            { icon: null, value: 'Intense activity level' }
                        ]}
                    />
                </div>
                <div className="row-span-2 col-span-1">
                    {type === 'guided' ? (
                        <BookingCard />
                    ) : (
                        <BuyingCard
                            price="255"
                            desc="Cras sit amet libero tempus, convallis lectus in,
                        venenatis dui. Sed sed euismod sem, dictum commodo
                        ipsum. Cras pellentesque ornare facilisis. Curabitur
                        finibus laoreet lorem, vitae elementum nisi varius et.
                        Praesent feugiat laoreet vulputate. Integer id aliquam
                        dolor."
                        />
                    )}
                </div>
                <div className="row-span-1 col-span-2 px-4 ">
                    <BlockTitle
                        text="Where you'll go and what you'll do"
                        component={3}
                        classes="mb-4"
                    />
                    <p className="mb-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed porttitor lacus quis ipsum pharetra, et hendrerit
                        nisl euismod.
                    </p>
                    <p>
                        Cras sit amet libero tempus, convallis lectus in,
                        venenatis dui. Sed sed euismod sem, dictum commodo
                        ipsum. Cras pellentesque ornare facilisis. Curabitur
                        finibus laoreet lorem, vitae elementum nisi varius et.
                        Praesent feugiat laoreet vulputate. Integer id aliquam
                        dolor.
                    </p>
                </div>
            </Row>
            <Row classes="mb-12 pr-4 pl-4">
                <ListWithIcon
                    title="Included"
                    items={[
                        { icon: null, value: 'airport transfer' },
                        { icon: null, value: 'accommodation' },
                        { icon: null, value: 'food' },
                        { icon: null, value: 'entries' },
                        { icon: null, value: 'activity equipment' }
                    ]}
                />
            </Row>
            {type === 'guided' ? (
                <Row classes="mb-12">
                    <JourneyDaySlider
                        day="1"
                        data={[
                            {
                                title: 'Gear up',
                                desc: 'Prepare all the gear and start a 300m upward journey with your mates',
                                img: featured_image,
                                time: '9.30 AM'
                            },
                            {
                                title: 'Start',
                                desc: 'Prepare all the gear and start a 300m upward journey with your mates',
                                img: featured_image,
                                time: '10.00 AM'
                            },
                            {
                                title: 'Start',
                                desc: 'Prepare all the gear and start a 300m upward journey with your mates',
                                img: featured_image,
                                time: '10.00 AM'
                            }
                        ]}
                    />
                </Row>
            ) : null}

            <Row classes="mb-12 lg:w-3/4">
                <BlockTitle
                    text="Special requirements for wanderers"
                    component={3}
                    classes="mb-6"
                />
                <div className="flex justify-between">
                    <p className="md:mr-4 lg:mr-8">
                        If you or the people accompanying you have any speacial
                        needs, please reach out to us via the contact button to
                        see if we can accommodate your needs.
                    </p>
                    <Button type="outlined" rounded="lg">
                        Konnect with us
                    </Button>
                </div>
            </Row>
            <Row classes="mb-16 flex justify-center">
                <ButtonLoad label="Wonder NOW" />
            </Row>
            <SliderExperiences
                sectionTitles={{
                    title: 'Other wanders by Nazar',
                    subTitle: ''
                }}
                data={allExpData}
            />
            <Row classes="mb-12">
                <KreatorSection author={authorId} />
            </Row>
            <SliderExperiences
                sectionTitles={{
                    title: 'Similar wanders by other Kreators',
                    subTitle: ''
                }}
                data={allExpData}
            />
            <SliderExperiences
                sectionTitles={{
                    title: 'Trending wanders',
                    subTitle: ''
                }}
                data={allExpData}
            />
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    const response = await fetch(`${API_URL}/experiences/${params.id}`);
    const data = await response.json();

    const allExpResponse = await fetch(`${API_URL_MOCK}/api/experiences`);
    const allExpData = await allExpResponse.json();

    return {
        props: {
            data,
            allExpData
        }
    };
}

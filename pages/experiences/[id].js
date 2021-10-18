import React, { useState, useEffect } from 'react';
import { useLightbox } from 'simple-react-lightbox';
import { SRLWrapper } from 'simple-react-lightbox';

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
import { getExperienceById } from '@/helpers/apiServices/experiences';
import { BookingPickerModal } from '@/blocks/BookingPicker';
import SectionTitle from '@/components/blocks/Title/SectionTitle';
import { User, Clock, MapPin, Users, Layers } from 'lucide-react';
import { country, findLowestPrice } from '@/helpers/LocaleHelper';
import CarouselGallery from '@/components/specialty/CarouselGallery';
import SliderImages from '@/components/sections/SliderImages';
import ImageHover from '@/components/blocks/Card/ImageHover';
import { Pill__Logo } from '@/components/blocks/Pills';
import ButtonGeneric from '@/components/blocks/Button/ButtonGeneric';
import KreatorBadgeStatic from '@/components/blocks/KreatorBadgeStatic';
import { capitalize, getDays, kreatorName } from '@/helpers/FEutils';
import DestinationMap from '@/components/blocks/Map/DestinationMap';
import ExpSubsection from '@/components/sections/ExpSubsection';
import DestinationList from '@/components/blocks/Map/DestinationList';
import BestTimeToGoRanges from '@/components/blocks/BestTimeToGoRanges';
import AccommodationMap from '@/components/blocks/Map/AccommodationMap';
import AccommodationList from '@/components/blocks/Map/AccommodationList';
import ItineraryCard from '@/components/blocks/Card/ItineraryCard';
import ButtonLink from '@/components/blocks/Button/ButtonLink';

import { toggleAuthModal, setAuthPage } from '@/store/actions/globalState';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const options = {
    settings: {
        autoplaySpeed: 3000,
        boxShadow: 'none',
        disableKeyboardControls: false,
        disablePanzoom: false,
        disableWheelControls: false,
        hideControlsAfter: false,
        lightboxTransitionSpeed: 0.3,
        lightboxTransitionTimingFunction: 'linear',
        overlayColor: '#F3F4F6',
        slideAnimationType: 'fade',
        slideSpringValues: [300, 50],
        slideTransitionSpeed: 0.6,
        slideTransitionTimingFunction: 'linear',
        usingPreact: false
    },
    buttons: {
        backgroundColor: 'rgba(30,30,36,0.8)',
        iconColor: 'rgba(255, 255, 255, 0.8)',
        iconPadding: '10px',
        showAutoplayButton: false,
        showCloseButton: true,
        showDownloadButton: false,
        showFullscreenButton: false,
        showNextButton: true,
        showPrevButton: true,
        showThumbnailsButton: false,
        size: '40px'
    },
    caption: {
        captionAlignment: 'center',
        captionColor: '#333333',
        captionContainerPadding: '0',
        captionFontFamily: 'inherit',
        captionFontSize: 'inherit',
        captionFontStyle: 'inherit',
        captionFontWeight: 'inherit',
        captionTextTransform: 'inherit',
        showCaption: true
    },
    thumbnails: {
        showThumbnails: true,
        thumbnailsAlignment: 'center',
        thumbnailsContainerBackgroundColor: 'transparent',
        thumbnailsContainerPadding: '0',
        thumbnailsGap: '0',
        thumbnailsIconColor: '#ffffff',
        thumbnailsOpacity: 0.4,
        thumbnailsPosition: 'bottom',
        thumbnailsSize: ['80px', '80px']
    }
};

const ExperienceDetail = ({
    dataExperience,
    auth,
    toggleAuthModal,
    setAuthPage,
    globalState: { authModalIsOpen, authComponent }
}) => {
    const router = useRouter();
    const [opened, setOpened] = useState(false);
    const [expImages, setExpImages] = useState([]);
    const { openLightbox, closeLightbox } = useLightbox();

    const buildGalleryImages = (data) => {
        const images = [];

        // overview image
        images.push({
            type: 'img',
            src: data.featured_image + '-/preview/-/quality/lightest/',
            thumbnail: data.featured_image + '-/preview/80x80/',
            caption: ''
        });
        images.push({
            type: data.overview_intro.overview_featured_image.type,
            src:
                data.overview_intro.overview_featured_image.data +
                '-/preview/-/quality/lightest/',
            thumbnail:
                data.overview_intro.overview_featured_image.data +
                '-/preview/80x80/',
            caption: ''
        });

        //Get day arrays
        const daysArrImages = data.itinerary.trip_days.map((day) => {
            const dayImages = [];
            dayImages.push({
                type: day.day_intro.day_featured_image.type,
                src:
                    day.day_intro.day_featured_image.data +
                    '-/preview/-/quality/lightest/',
                thumbnail:
                    day.day_intro.day_featured_image.data + '-/preview/80x80/',
                caption: ''
            });
            const dayActivities = day.activities.map((activity) => {
                return activity.images.map((image) => {
                    return {
                        type: image.type,
                        src: image.url + '-/preview/-/quality/lightest/',
                        thumbnail: image.url + '-/preview/80x80/',
                        caption: image.caption || ''
                    };
                });
            });
            dayImages.push(...dayActivities.flat());
            return dayImages;
        });

        images.push(...daysArrImages.flat());
        // console.log('All images', images);
        return images;
    };

    const buildNewGalleryImages = (data) => {
        const images = data.map((singleImage) => {
            return {
                type: singleImage.type,
                src: singleImage.url + '-/preview/-/quality/lightest/',
                thumbnail: singleImage.url + '-/preview/80x80/',
                caption: singleImage.caption
            };
        });

        return images;
    };

    console.log('all data', dataExperience);
    if (!dataExperience?.data?.publisheds) {
        return <div>Experience {router.query?.id} doesn't exist.</div>;
    }

    const tryExperience = () => {
        toggleAuthModal(true);
        setAuthPage('register');
    };

    const {
        content,
        short_content,
        short_content: { destination, title, featured_image },
        content_marketing: {
            gallery: mkGallery,
            intro: mkIntro,
            whatToDo: mkWhatToDo,
            whereToStay: mkWhereToStay,
            whatsIncluded: mkWhatsIncluded
        },
        tags,
        days,
        id,
        type,
        cats,
        cats_list,
        places_lists,
        budget_min,
        budget_max,
        guided_extra,
        experience_price,
        experience_id,
        user,
        user: { profile }
    } = dataExperience?.data?.publisheds[0];

    const EmptyData = <span className="w-20 bg-gray-300 rounded-full h-2" />;
    const ContentDays = days ? <span> {getDays(days)}</span> : EmptyData;
    const itineraryData = content.itinerary.trip_days;

    // console.log('experience data', dataExperience?.data?.publisheds[0]);

    useEffect(() => {
        if (mkGallery.length > 0)
            setExpImages(buildNewGalleryImages(mkGallery));
        else setExpImages(buildGalleryImages(content));
    }, []);

    const openBookingModal = (e) => {
        e.preventDefault();
        setOpened(true);
    };

    const lightBoxHandler = (imageIndex) => {
        openLightbox(imageIndex);

        // setSIndex(imageIndex);
        // setLightBox(true);
    };
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return true ? (
        <>
            <Layout>
                <SRLWrapper elements={expImages} options={options} />
                <div
                    className={`z-100 mb-6 mt-16 mx-auto px-5 md:px-9 lg:px-12 xl:px-241 2xl:px-401 xl:max-w-7xl`}>
                    <div className={`px-4`}>
                        <div className="inline-flex text-transparent bg-clip-text bg-gradient-to-l from-blue-600 via-green-400 to-green-400 font-bold text-3xl tracking-tight leading-none pb-1 flex-shrink-0 flex-initial">
                            {title}
                        </div>
                        <div className="mt-2 flex flex-wrap items-center font-sans text-sm text-gray-900">
                            <div className="flex  mr-8 py-1">
                                <span className="text-green-400 mr-2">
                                    <MapPin size={18} />
                                </span>

                                <span className="flex flex-wrap items-center">
                                    {places_lists?.length > 0 ? (
                                        places_lists.map(
                                            (item, index, itemArray) => {
                                                return (
                                                    <span
                                                        key={`${item}_${index}`}>
                                                        <span className="whitespace-nowrap">
                                                            {country(
                                                                'en',
                                                                item.code
                                                            )}
                                                        </span>
                                                        {index <
                                                            itemArray.length -
                                                                1 && (
                                                            <span className="px-1">
                                                                .
                                                            </span>
                                                        )}
                                                    </span>
                                                );
                                            }
                                        )
                                    ) : (
                                        <span className="w-20 bg-gray-300 rounded-full h-2" />
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center mr-8 py-1">
                                <span className="text-green-400 mr-2">
                                    <Clock size={18} />
                                </span>
                                {ContentDays}
                            </div>
                            <div className="flex items-center mr-8 py-1">
                                <span className="text-green-400 mr-2">
                                    <Layers size={18} />
                                </span>
                                <div className="flex items-center gap-2">
                                    {cats_list.map((cat, index) => {
                                        return (
                                            <span
                                                key={`cats_${index}`}
                                                className="uppercase text-xs tracking-wide">
                                                {index < cats_list.length - 1
                                                    ? `${cat.name}, `
                                                    : cat.name}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`z-100 mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40 relative`}>
                    <div className="h-96 lg:h-128 overflow-hidden rounded-xl w-full grid gap-2 grid-rows-4 grid-cols-8 grid-flow-col relative">
                        <ImageHover
                            url={expImages[1]?.src}
                            handleActionBtn={lightBoxHandler}
                            params={[1]}
                            className="row-span-4 col-span-2"
                        />
                        <ImageHover
                            url={expImages[0]?.src}
                            handleActionBtn={lightBoxHandler}
                            params={[0]}
                            className="row-span-4 col-span-4"
                        />
                        <ImageHover
                            url={expImages[2]?.src}
                            handleActionBtn={lightBoxHandler}
                            params={[2]}
                            className="row-span-2 col-span-1"
                        />
                        <ImageHover
                            url={expImages[3]?.src}
                            handleActionBtn={lightBoxHandler}
                            params={[3]}
                            className="row-span-2 col-span-2"
                        />
                        <ImageHover
                            url={expImages[4]?.src}
                            handleActionBtn={lightBoxHandler}
                            params={[4]}
                            className="row-span-2 col-span-1"
                        />

                        <div className="absolute bottom-4 right-4">
                            <ButtonGeneric
                                handleAction={lightBoxHandler}
                                shadow="shadow-double"
                                params={[0]}
                                label="View All"
                                icon="ri-image-line text-lg"
                                fontSize="text-xs"
                                ring=""
                            />
                        </div>
                    </div>
                    <div
                        className={`absolute z-100 top-0 -translate-y-1/2 left-1/2 transform -translate-x-1/2`}>
                        <div className="uppercase rounded-full h-8 w-24 flex justify-center items-center bg-gray-900 text-xxs text-kn-primary tracking-widest px-6">
                            {type}
                        </div>
                    </div>
                    <div
                        className={`absolute z-100 bottom-0 translate-y-1/2 left-1/2 transform -translate-x-1/2`}>
                        <Pill__Logo />
                    </div>
                </div>

                <div
                    className={` mb-12 mt-24 mx-auto px-5 md:px-9 lg:px-12 xl:px-241 2xl:px-401 xl:max-w-7xl`}>
                    <main className={`px-4 flex items-start gap-12`}>
                        <section className="md:w-4/6 mb-24">
                            <ExpSubsection className="border-b border-green-600 border-opacity-20 pb-6 mb-12">
                                <div className="flex justify-between ">
                                    <div>
                                        <div className="text-green-400 inline-flex font-semibold text-2xl tracking-tight leading-none flex-shrink-0 flex-initial mb-2">
                                            {`A ${capitalize(
                                                type
                                            )} Experience by`}{' '}
                                            <span className="underline ml-2 text-green-700">{`${kreatorName(
                                                profile
                                            )}`}</span>
                                        </div>
                                        <div className=" text-sm text-gray-600">
                                            Available in English
                                        </div>
                                    </div>
                                    <KreatorBadgeStatic
                                        author={user}
                                        card={false}
                                        avatarOnly={true}
                                    />
                                </div>
                            </ExpSubsection>

                            <ExpSubsection>
                                <div
                                    className="text-gray-800 leading-7"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            mkIntro.desc ||
                                            content.overview_intro
                                                .description_html
                                    }}
                                />
                                <BestTimeToGoRanges
                                    timeRange={
                                        content.best_time_to_go.time_range
                                    }
                                />
                            </ExpSubsection>

                            <ExpSubsection>
                                <div className="text-green-400 inline-flex font-semibold text-2xl tracking-tight leading-none flex-shrink-0 flex-initial mb-6">
                                    {`Where you'll go and what you'll do`}
                                </div>
                                <div
                                    className="text-gray-800 leading-7"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            mkWhatToDo.desc ||
                                            content.destination.description_html
                                    }}
                                />
                                <DestinationList
                                    destinations={content.destination.locations}
                                />
                                <DestinationMap
                                    destinations={content.destination.locations}
                                />
                            </ExpSubsection>

                            <ExpSubsection borders="">
                                <div className="text-green-400 inline-flex font-semibold text-2xl tracking-tight leading-none flex-shrink-0 flex-initial mb-6">
                                    {`Where you'll stay`}
                                </div>
                                <div
                                    className="text-gray-800 leading-7 mb-12"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            mkWhereToStay.desc ||
                                            content.accommodation
                                                .description_html
                                    }}
                                />
                                <AccommodationList
                                    locations={content.accommodation.locations}
                                />
                                <AccommodationMap
                                    destinations={content.accommodation}
                                    showCountryLayer={false}
                                    showCircleLayer={false}
                                />
                            </ExpSubsection>
                        </section>

                        <aside className="md:w-2/6 sticky top-24 py-4 pb-24">
                            <div className="">
                                {type === 'GUIDED' ? (
                                    <BookingCard
                                        setOpenBookingModal={openBookingModal}
                                    />
                                ) : (
                                    <BuyingCard
                                        setOpenModal={tryExperience}
                                        price={experience_price.price.price}
                                        desc="For a limited time only, you can try our experiences for free!"
                                        expId={experience_id}
                                        auth={auth}
                                    />
                                )}
                            </div>
                        </aside>
                    </main>

                    <section className={`px-4`}>
                        <ExpSubsection borders="border-t border-b">
                            <div className="text-green-400 inline-flex font-semibold text-2xl tracking-tight leading-none flex-shrink-0 flex-initial mb-126 mt-12">
                                {`Experience Itinerary`}
                            </div>

                            <div className="w-full">
                                {itineraryData.map((dayContent, index) => {
                                    return (
                                        <ItineraryCard
                                            key={`itin_${index}`}
                                            data={dayContent.day_intro}
                                            index={index}
                                        />
                                    );
                                })}
                            </div>
                        </ExpSubsection>
                        {type == 'GUIDED' && (
                            <ExpSubsection>
                                <div className="text-green-400 inline-flex font-semibold text-2xl tracking-tight leading-none flex-shrink-0 flex-initial mb-6 ">
                                    {`What's Included`}
                                </div>
                                <div className="text-gray-800 leading-7">
                                    Whats included text goes here
                                </div>
                            </ExpSubsection>
                        )}
                        <ExpSubsection borders="">
                            <div className="text-green-400 inline-flex font-semibold text-2xl tracking-tight leading-none flex-shrink-0 flex-initial mb-6 ">
                                {`Special requirements for Wanderers`}
                            </div>

                            <div className="flex justify-between">
                                <p className="md:mr-4 lg:mr-8 text-gray-800">
                                    If you have any special requests, please
                                    reach out to us via the contact button to
                                    see if we can accommodate your needs.
                                </p>
                                <Button type="outlined" rounded="lg">
                                    Konnect with us
                                </Button>
                            </div>
                            <div className="mt-16">
                                <ButtonLink
                                    label="Try out this Experience"
                                    expId={experience_id}
                                    width="w-96"
                                />
                            </div>

                            {/* <ButtonLoad label="Try out this Experience" /> */}
                        </ExpSubsection>
                    </section>
                </div>

                <BookingPickerModal
                    opened={opened}
                    days={days}
                    persons={'4'}
                    price={'50'}
                    onClose={() => setOpened(false)}
                />

                {false && (
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
                                content.destination.locations.length > 1
                                    ? 'Contries'
                                    : 'Contry'
                            }`
                                    },
                                    { icon: null, value: 'Humid experience' },
                                    {
                                        icon: 'USER',
                                        value: `For maximum
                                ${Number(recommended_for)} people`
                                    },
                                    {
                                        icon: null,
                                        value: 'Intense activity level'
                                    }
                                ]}
                            />
                        </div>
                        <div className="row-span-2 col-span-1">
                            {type === 'GUIDED' ? (
                                <BookingCard
                                    setOpenBookingModal={openBookingModal}
                                />
                            ) : (
                                <BuyingCard
                                    setOpenBookingModal={openBookingModal}
                                    price={experience_price.price.price}
                                    desc="For a limited time only, you can try our experiences for free!"
                                />
                            )}
                        </div>
                    </Row>
                )}

                {/* <Row classes="mb-12 lg:w-3/4">
                    <BlockTitle
                        text="Special requirements for wanderers"
                        component={3}
                        classes="mb-6"
                    />
                    <div className="flex justify-between">
                        <p className="md:mr-4 lg:mr-8">
                            If you have any special requests, please reach out
                            to us via the contact button to see if we can
                            accommodate your needs.
                        </p>
                        <Button type="outlined" rounded="lg">
                            Konnect with us
                        </Button>
                    </div>
                </Row> */}
            </Layout>
        </>
    ) : (
        <div>Hello There</div>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState,
    auth: state.auth
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            toggleAuthModal,
            setAuthPage
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceDetail);

export async function getServerSideProps({ params }) {
    const { data: dataExperience } = await getExperienceById(params.id);

    return {
        props: {
            dataExperience
        }
    };
}

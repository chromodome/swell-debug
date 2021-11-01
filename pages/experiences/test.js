import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import Layout from '@/layouts/Layout';
import Row from '@/sections/Row';
import { Buttons__NextPrev, Button } from '@/blocks/Button/Buttons';
import BookingCard from '@/blocks/Card/BookingCard';
import BuyingCard from '@/blocks/Card/BuyingCard';
import ListWithIcon from '@/blocks/ListWithIcon';
import { getExperienceById } from '@/helpers/apiServices/experiences';
import { BookingPickerModal } from '@/blocks/BookingPicker';
import DestinationMap from '@/components/blocks/Map/DestinationMap';
import ExpSubsection from '@/components/sections/ExpSubsection';
import DestinationList from '@/components/blocks/Map/DestinationList';
import AccommodationMap from '@/components/blocks/Map/AccommodationMap';
import AccommodationList from '@/components/blocks/Map/AccommodationList';
import ItineraryCard from '@/components/blocks/Card/ItineraryCard';
import ButtonLink from '@/components/blocks/Button/ButtonLink';
import { toggleAuthModal, setAuthPage } from '@/store/actions/globalState';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SectionMarketingTitles from '@/components/experiencepage/SectionMarketingTitles';
import SectionMarketingGallery from '@/components/experiencepage/SectionMarketingGallery';
import SectionMarketingIntro from '@/components/experiencepage/SectionMarketingIntro';
import SectionWhatToDo from '@/components/experiencepage/SectionWhatToDo';
import SectionWhereToStay from '@/components/experiencepage/SectionWhereToStay';
import SectionMarketingItinerary from '@/components/experiencepage/SectionMarketingItinerary';
// import SectionWhatsIncluded from '@/components/experiencepage/SectionWhatsIncluded';
import SectionPricingBooking from '@/components/experiencepage/SectionPricingBooking';

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
    globalState: { authModalIsOpen, authComponent, siteData }
}) => {
    const router = useRouter();

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

        cats_list,
        places_lists,

        experience_price,
        experience_id,
        user,
        user: { profile }
    } = dataExperience?.data?.publisheds[0];

    const experienceDetails = dataExperience?.data?.publisheds[0];

    const EmptyData = <span className="w-20 bg-gray-300 rounded-full h-2" />;
    const itineraryData = content.itinerary.trip_days;

    const openBookingModal = (e) => {
        e.preventDefault();
        setOpened(true);
    };

    return (
        <>
            <Layout>
                {!siteData.loading && (
                    <div className="overflow-x-hidden md:overflow-x-visible">
                        <SectionMarketingTitles
                            experienceDetails={experienceDetails}
                        />
                        <SectionMarketingGallery
                            experienceDetails={experienceDetails}
                        />
                        <div
                            className={`mb-12 mt-16 md:mt-16 lg:mt-24 mx-auto px-5 md:px-12 lg:px-12 xl:px-241 2xl:px-401 xl:max-w-7xl`}>
                            <main className={` flex items-start`}>
                                <section className="w-full lg:w-4/6 mb-24">
                                    <SectionMarketingIntro
                                        experienceDetails={experienceDetails}
                                    />
                                    <SectionWhatToDo
                                        experienceDetails={experienceDetails}
                                    />
                                    <SectionWhereToStay
                                        experienceDetails={experienceDetails}
                                    />
                                    <SectionMarketingItinerary
                                        experienceDetails={experienceDetails}
                                    />

                                    {/* {type.toLowerCase() === 'guided' ? (
                                        <SectionWhatsIncluded
                                            experienceDetails={
                                                experienceDetails
                                            }
                                        />
                                    ) : null} */}
                                </section>

                                <aside className="hidden lg:block lg:w-2/6 sticky top-24 pl-4 lg:pl-8 xl:pl-12 py-4 pb-24 ">
                                    <SectionPricingBooking
                                        experienceDetails={experienceDetails}
                                    />
                                </aside>
                            </main>
                            <ExpSubsection borders="">
                                <div className="text-green-400 inline-flex font-semibold text-2xl tracking-tight leading-none flex-shrink-0 flex-initial mb-6 ">
                                    {`Special requirements for Wanderers`}
                                </div>

                                <div className="flex justify-between">
                                    <p className="md:mr-4 lg:mr-8 text-gray-800">
                                        If you have any special requests, please
                                        reach out to us via the contact button
                                        to see if we can accommodate your needs.
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
                        </div>
                    </div>
                )}

                <div
                    className={` mb-12 mt-24 mx-auto px-5 md:px-9 lg:px-12 xl:px-241 2xl:px-401 xl:max-w-7xl`}>
                    <section className={`px-4`}></section>
                </div>
            </Layout>
        </>
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
    const { data: dataExperience } = await getExperienceById(
        '61123822ea5eeca04451a230'
    );

    return {
        props: {
            dataExperience
        }
    };
}

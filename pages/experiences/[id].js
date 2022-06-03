import React, { useEffect } from 'react';
import getMarketingExperience from '@/swell/api/getMarketingExperience';
import { useRouter } from 'next/router';
import Layout from '@/layouts/Layout';
import { Button } from '@/blocks/Button/Buttons';
import ExpSubsection from '@/components/sections/ExpSubsection';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SectionMarketingTitles from '@/components/experiencepage/SectionMarketingTitles';
import SectionMarketingGallery from '@/components/experiencepage/SectionMarketingGallery';
import SectionMarketingIntro from '@/components/experiencepage/SectionMarketingIntro';
import SectionWhatToDo from '@/components/experiencepage/SectionWhatToDo';
import SectionWhereToStay from '@/components/experiencepage/SectionWhereToStay';
import SectionMarketingItinerary from '@/components/experiencepage/SectionMarketingItinerary';
import SectionPricingBooking from '@/components/experiencepage/SectionPricingBooking';
import { NEXT_PUBLIC_DIGITAL_ONLY } from '@/constants/public';

const lang = 'en-US';
const ExperienceDetail = ({
    globalState: { siteData },
    contentfulExperience = {}
}) => {
    const router = useRouter();
    const { isReady } = useRouter();
    const {
        content_marketing: {
            [lang]: {
                whereToStay,
                whatToDo,
                gallery,
                intro: {
                    desc
                }
            },
        },
        budget_currency: {
            [lang]: budget_currency,
        },
        budget_min: {
            [lang]: budget_min,
        },
        budget_max: {
            [lang]: budget_max,
        },
        title: {
            [lang]: title,
        },
        days: {
            [lang]: days,
        },
        type: {
            [lang]: type,
        },
        user: {
            [lang]: user,
        },
        bestTimeToGo: {
            [lang]: bestTimeToGo,
        },
        destination: {
            [lang]: destination,
        },
        accommodation: {
            [lang]: accommodation,
        },
        itinerary: {
            [lang]: itinerary,
        },
        swellExp: {
            id: swellExpId,
            categories,
            tags,
            content: {
                destinations,
                experience_id,
                views,
            }
        }
    } = contentfulExperience;

    const updateViews =  async (swellExpId, views)=> {
        const response = await fetch(`/api/views/${swellExpId}?views=${views}`, {
            method: 'PUT',
            body: [],
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    useEffect(() => {
        if(isReady) {
            if(NEXT_PUBLIC_DIGITAL_ONLY && type.toLowerCase() ==='guided') {
                router.replace('/');
            } else {
                updateViews(swellExpId, views + 1);
            }
        }
    }, []);

    return (
        <>
            <Layout>
                {!siteData.loading && (
                    <div className="overflow-x-hidden md:overflow-x-visible">
                        <SectionMarketingTitles
                            title={title}
                            days={days}
                            tags={tags}
                            categories={categories}
                            destinations={destinations}
                        />
                        <SectionMarketingGallery
                            type={type}
                            images={gallery}
                        />
                        <div
                            className={`mb-12 mt-16 md:mt-16 lg:mt-24 mx-auto px-5 md:px-12 lg:px-12 xl:px-241 2xl:px-401 xl:max-w-7xl`}>
                            <main className={` flex items-start`}>
                                <section className="w-full lg:w-4/6 mb-24">
                                    <SectionMarketingIntro
                                        type={type}
                                        desc={desc}
                                        budget_max={budget_max}
                                        budget_min={budget_min}
                                        budget_currency={budget_currency}
                                        user={user}
                                        bestTimeToGo={bestTimeToGo}
                                    />
                                    <SectionWhatToDo
                                        destination={destination}
                                        whatToDo={whatToDo}
                                    />
                                    <SectionWhereToStay
                                        whereToStay={whereToStay}
                                        accommodation={accommodation}
                                    />
                                    <SectionMarketingItinerary
                                        itinerary={itinerary}
                                    />
                                </section>

                                <aside className="hidden lg:block lg:w-2/6 sticky top-24 pl-4 lg:pl-8 xl:pl-12 py-4 pb-24 ">
                                    <SectionPricingBooking
                                        expId={experience_id}
                                        swellExpId={swellExpId}
                                        type={type}
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
            // toggleAuthModal,
            // setAuthPage
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceDetail);

export async function getStaticProps({ params }) {
    let contentfulExperience = null;

    try {
        contentfulExperience = await getMarketingExperience(params?.id ? params?.id.toLowerCase(): '');
    } catch (error) {
        return {
            props: {},
            notFound: true
        };
    }

    return {
        props: {
            contentfulExperience: {...contentfulExperience.fields, swellExp: contentfulExperience.swellExp }
        },

        revalidate: Number(process.env.NEXT_REVALIDATE_PERIOD)
    };
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking' // true false or 'blocking'
    };
}
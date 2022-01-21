import { Pill__Logo } from 'components/blocks/Pills';
import Link from 'next/link';
import Button from '@/components/blocks/Button/Button';
// import Image from 'next/image';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from '@/components/layouts/Layout';
import GradientTitle from '@/components/blocks/Title/GradientTitle';
import LandingCapture from './LandingCapture';
import SliderCreators from '@/sections/SliderCreators';
import SliderCollabs from '@/sections/SliderCollabs';
import translations from '@/constants/translations';
import { getTempLandingPage } from '@/helpers/apiServices/experiences';

const list1 = [
    {
        text: 'Check your completion progress',
        tag: ''
    },
    {
        text: 'Follow the status of your submission',
        tag: ''
    },
    {
        text: 'Edit the price and calendar',
        tag: ''
    },
    {
        text: 'Get detailed performance analytics',
        tag: 'soon'
    }
];

const LayoutLanding = ({ globalState: { lang } }) => {
    const [dataLanding, setDataLanding] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        const importData = async () => {
            const newData = await getTempLandingPage();
            setDataLanding(newData.data);
            setDataLoading(false);
        };
        importData();
    }, []);

    const LayoutOptions = {
        isHeader: {
            visible: true,
            options: {
                isSearch: false,
                isAvatar: false,
                isLang: false,
                isMenu: false,
                isCustom: (
                    <div className="mr-8 md:flex items-center hidden">
                        <Button
                            animation={false}
                            as="url"
                            label="Become a Kreator"
                            url="https://kreator.viakonnect.com/accounts/signup"
                            width="w-64"
                        />
                    </div>
                )
            }
        },
        isTopBar: {
            visible: false
        },
        isFooter: {
            visible: true,
            body: {
                isVisible: false
            },
            bottomBar: {
                isVisible: true
            }
        }
    };
    const [tab, setTab] = useState('travel');
    const tabClasses = {
        on: 'border-green-400',
        off: 'text-gray-400 border-transparent hover:border-gray-200'
    };
    const containerClasses = {
        on: 'translate-x-0',
        off: '-translate-x-full'
    };

    return (
        <Layout options={LayoutOptions}>
            <div
                className="w-full mt-16 md:mt-20 py-8 lg:py-16 landing-gradient "
                // style={{
                //     backgroundImage: 'url("/assets/media/wood.svg")'
                // }}
            >
                <div
                    className={`relative 
                             md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto bg-contain bg-no-repeat bg-center py-0 xl:py-32 px-4 xl:px-16 2xl:px-0`}>
                    <div className="flex flex-col-reverse lg:flex-row justify-between items-center mb-8 md:px-16 lg:px-0 md:gap-16 ">
                        <div className="lg:w-1/2 flex flex-col px-8 md:px-0">
                            {/* <div className="uppercase tracking-widest text-green-400 text-xl md:text-3xl lg:text-2xl xl:text-3xl font-normal leading-tight mb-4">
                                via Konnect
                            </div> */}
                            <GradientTitle
                                label="An Ecosystem"
                                textSize="text-4xl md:text-6xl"
                                justify=""
                                containerClass=""
                            />
                            <div className="text-2xl md:text-4xl xl:text-5xl tracking-tight text-gray-900 font-semibold leading-tight mb-8">
                                For Travelers and Experience Creators
                            </div>
                            <div className="text-green-900 text-base md:text-lg xl:text-xl font-normal mb-8">
                                Join a community of ever-growing travelers,
                                content kreators, and travel professionals who
                                are transforming what it means to build truly
                                unique travel experiences.
                            </div>
                            <Button
                                // animation={false}
                                as="url"
                                label="Become a Kreator"
                                url="https://kreator.viakonnect.com/accounts/signup"
                                width="md:w-96"
                            />
                        </div>
                        <div className="px-4 md:px-0">
                            <img src="/assets/media/untangle@2x.png" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-gray-100 pb-8">
                <div
                    className={`relative 
                          md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto bg-contain bg-no-repeat bg-center pt-16 md:pt-32 px-0 lg:px-8 w-80 md:w-full`}>
                    <div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <Pill__Logo />
                    </div>
                    <div className="w-full flex flex-col px-0 md:px-8 lg:px-0">
                        <GradientTitle
                            label="How does it work?"
                            textSize="text-3xl md:text-6xl"
                            justify="justify-center"
                        />

                        <div className="max-w-lg w-full mx-auto flex items-center border-b border-gray-200 mb-8 md:mb-0 mt-4 md:mt-12">
                            <div
                                onClick={() => setTab('travel')}
                                className={`cursor-pointer w-1/2 h-12 flex items-center border-b-4 px-4 uppercase md:tracking-wider text-sm ${
                                    tab === 'travel'
                                        ? tabClasses.on
                                        : tabClasses.off
                                }`}>
                                For Travelers
                            </div>
                            <div
                                onClick={() => setTab('kreate')}
                                className={`cursor-pointer w-1/2 h-12 flex items-center border-b-4 px-4 uppercase md:tracking-wider text-sm ${
                                    tab === 'kreate'
                                        ? tabClasses.on
                                        : tabClasses.off
                                }`}>
                                For Kreators
                            </div>
                        </div>
                        <div className="w-full rounded-3xl bg-gray-100 overflow-hidden">
                            <div
                                className={`p-4 xl:p-16 flex flex-nowrap gap-8 md:gap-8 lg:gap-8 xl:gap-32 transform-gpu transition-all duration-500 ease-in-out-expo-hard ${
                                    tab === 'travel'
                                        ? containerClasses.on
                                        : containerClasses.off
                                }`}>
                                <div className="flex flex-nowrap flex-col lg:flex-row lg:justify-center gap-4 lg:gap-8 xl:gap-16  ">
                                    <OptionCard
                                        title="Explore"
                                        image="/assets/media/choosing.png">
                                        Browse the Konnect marketplace and
                                        explore the evergrowing collection of
                                        both experiences - both digital and
                                        guided.
                                    </OptionCard>
                                    <OptionCard
                                        title="Choose"
                                        image="/assets/media/aiming.png">
                                        Each experience sets clear expectations
                                        for travellers. Where, when and how and
                                        everything in between. We've got all the
                                        info you need so that when you go for
                                        it, you're sure about what you're
                                        getting
                                    </OptionCard>
                                    <OptionCard
                                        title="Enjoy"
                                        image="/assets/media/running.png">
                                        The rest is up to you. Share back your
                                        journey with the
                                        <a
                                            href="https://www.instagram.com/explore/tags/viakonnect/"
                                            target="_blank"
                                            className="text-sm bg-green-200 rounded px-2 mx-2">
                                            #viakonnect
                                        </a>
                                        tag
                                    </OptionCard>
                                </div>

                                <div className="flex flex-col lg:flex-row lg:justify-center gap-4 lg:gap-8 xl:gap-16 ">
                                    <OptionCard
                                        title="Kreate"
                                        image="/assets/media/create@2x.png">
                                        Use our uniquely built tool to build a
                                        flexible experience, digital or guided.
                                    </OptionCard>
                                    <OptionCard
                                        title="Share"
                                        image="/assets/media/share@2x.png">
                                        Share with your followers and on your
                                        channels your kreations that will be
                                        accessible on the Konnect Marketplace.
                                    </OptionCard>
                                    <OptionCard
                                        title="Earn"
                                        image="/assets/media/earn@2x.png">
                                        Sell your Kreations to the world. We'll
                                        take care of all the rest.
                                    </OptionCard>
                                </div>
                            </div>
                        </div>
                        {/* <div className="w-12 border-b-4 border-green-400 mx-auto mt-16 mb-16"></div> */}
                    </div>
                </div>
            </div>
            <div
                className="w-full bg-white pb-8 "
                // style={{
                //     backgroundImage: 'url("/assets/media/wood.svg")',
                //     backgroundSize: 'cover'
                // }}
            >
                <div
                    className={`relative 
                          mx-auto pt-16 md:pt-32 w-full`}>
                    <div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <Pill__Logo />
                    </div>
                    <div className="w-full flex flex-col px-0">
                        <GradientTitle
                            label="Our Kreators"
                            textSize="text-3xl md:text-6xl"
                            justify="justify-center"
                        />
                        <div className="md:max-w-3xl lg:max-w-5xl xl:max-w-3xl mx-auto text-green-900 text-base md:text-lg xl:text-2xl font-normal mb-8 px-12 md:px-28 lg:px-48 xl:px-0">
                            Meet our Kreators. The ones that make all of this
                            possible. They're the ones who meticulously craft
                            their own experiences, go over them dozens of times
                            to make sure nothing is left to chance.
                        </div>
                        <div className="w-full overflow-hidden ">
                            <SliderCreators
                                sectionTitles={
                                    translations[lang].sections
                                        .wanderByDestination
                                }
                                data={dataLanding?.data?.kreators}
                                dataLoading={dataLoading}
                            />
                        </div>
                        <div className="md:max-w-3xl lg:max-w-5xl xl:max-w-3xl mx-auto mb-16 px-12">
                            <Button
                                animation={true}
                                as="url"
                                label="Become a Kreator"
                                url="https://kreator.viakonnect.com/accounts/signup"
                                width="w-80 md:w-96"
                                fontSize="text-xl"
                                height="h-16"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-gray-100 pb-8">
                <div
                    className={`relative 
                          mx-auto pt-16 md:pt-32 w-full`}>
                    <div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <Pill__Logo />
                    </div>
                    <div className="w-full flex flex-col px-0">
                        <GradientTitle
                            label="Our Kollabs"
                            textSize="text-3xl md:text-6xl"
                            justify="justify-center"
                        />
                        <div className="md:max-w-3xl lg:max-w-5xl xl:max-w-3xl mx-auto text-green-900 text-base md:text-lg xl:text-2xl font-normal mb-8 px-12 md:px-28 lg:px-48 xl:px-0">
                            We're starting off by doing exclusive collaborations
                            with the best content kreators on some leading
                            destinations in Saudi Arabia. Check them out.
                        </div>
                        <div className="w-full overflow-hidden ">
                            <SliderCollabs
                                sectionTitles={
                                    translations[lang].sections
                                        .wanderByDestination
                                }
                                data={dataLanding?.data?.kollabs}
                                dataLoading={dataLoading}
                            />
                        </div>
                        {/* <div className="md:max-w-3xl lg:max-w-5xl xl:max-w-3xl mx-auto mb-16">
                            <Button
                                animation={true}
                                as="url"
                                label="Become a Kreator"
                                url="https://kreator.viakonnect.com/accounts/signup"
                                width="w-96"
                                fontSize="text-xl"
                                height="h-16"
                            />
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="relative w-full bg-white pb-20 pt-16" id="join">
                <div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <Pill__Logo />
                </div>
                <div
                    className={`relative 
                          md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto bg-contain bg-no-repeat bg-center  lg:px-8 px-12 md:w-full`}>
                    <LandingCapture />{' '}
                </div>
            </div>
        </Layout>
    );
};

const OptionCard = ({ title, children, image }) => {
    return (
        <div className="w-full lg:w-72 xl:w-80 mb-8  flex flex-col md:flex-row lg:flex-col md:gap-8 lg:gap-0">
            <div className="w-72 md:w-80 lg:w-72 md:h-96 flex items-center justify-center">
                <img src={image} className="" />
            </div>
            <div className="w-72 md:w-80 lg:w-72 md:mt-16 lg:mt-0 px-4 xl:px-0">
                {/* <GradientTitle label={title} textSize="text-4xl" /> */}
                <div className="text-4xl mb-4 text-green-400 font-semibold">
                    {title}
                </div>
                <div className="text-base text-gray-600 ">{children}</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState,
    auth: state.auth
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutLanding);

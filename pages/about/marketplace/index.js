import Layout from '@/layouts/Layout';

import { Pill__Logo } from 'components/blocks/Pills';
import Link from 'next/link';
import Button from '@/components/blocks/Button/Button';

import { useState, useEffect } from 'react';
import GradientTitle from '@/components/blocks/Title/GradientTitle';
import SliderCreators from '@/sections/SliderCreators';
import SliderCollabs from '@/sections/SliderCollabs';
import LandingCapture from '@/components/landing/LandingCapture';

const AboutMarketplace = () => {
    const [tab, setTab] = useState('kreate');
    const tabClasses = {
        on: 'border-green-400',
        off: 'text-gray-400 border-transparent hover:border-gray-200'
    };
    const containerClasses = {
        on: 'translate-x-0',
        off: '-translate-x-full'
    };

    return (
        <Layout>
            <div className="w-full py-8 lg:py-16 d-hdpi-2:py-vw-16 landing-gradient-a bg-green-100 ">
                <div
                    className={`relative 
                             md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto bg-contain bg-no-repeat bg-center py-0 xl:py-8 px-4 xl:px-16 2xl:px-0 d-hdpi-2:max-w-screen-2/3 d-hdpi-2:px-0 d-hdpi-2:py-vw-8`}>
                    <div className="flex flex-col-reverse lg:flex-row justify-between items-center mb-8 md:px-16 lg:px-0 md:gap-0 ">
                        <div className="lg:w-2/5 flex flex-col px-8 md:px-0 ">
                            <GradientTitle
                                label="A Marketplace"
                                textSize="text-4xl md:text-6xl d-hdpi-2:text-vw-6xl"
                                justify=""
                                containerClass=""
                            />
                            <div className="text-2xl md:text-4xl xl:text-4xl tracking-tight text-gray-900 font-semibold leading-tight mb-8 d-hdpi-2:text-vw-4xl d-hdpi-2:mb-vw-8">
                                For authentic Experiences made by Locals and
                                Travelers
                            </div>
                            <div className="text-green-900 text-base md:text-lg xl:text-xl font-normal mb-8 d-hdpi-2:text-vw-xl d-hdpi-2:mb-vw-8">
                                Konnect is a community driven platform that
                                allows travelers to develop and sell their
                                experiences to other travelers. We have listened
                                and worked hard to make it easy to find and
                                develop travel experiences that are intuitive
                                and useful.
                            </div>
                            <Button
                                as="link"
                                label="Find an Experience"
                                link={'/experiences/search/all'}
                                width="md:w-96 d-hdpi-2:w-vw-96"
                            />
                        </div>
                        <div className="lg:w-3/5 px-4 md:px-0 lg:pl-20 d-hdpi-2:pl-vw-24">
                            <img src="/assets/media/marketplace-01@2x.png" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-gray-100 ">
                <div
                    className={`relative 
                             md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto bg-contain bg-no-repeat bg-center py-16 xl:py-32 px-4 xl:px-16 2xl:px-0 d-hdpi-2:max-w-screen-2/3 d-hdpi-2:py-vw-32 d-hdpi-2:px-0`}>
                    <div className="flex flex-col-reverse lg:flex-row-reverse justify-between items-center mb-8 md:px-16 lg:px-0 md:gap-16 2xl:gap-32 d-hdpi-2:gap-16">
                        <div className="lg:w-1/2 flex flex-col px-8 md:px-0 d-hdpi-2:px-vw-8">
                            <div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                <Pill__Logo />
                            </div>
                            <GradientTitle
                                label="We're in Beta"
                                textSize="text-4xl md:text-6xl d-hdpi-2:text-vw-6xl"
                                justify=""
                                containerClass=""
                            />
                            <div className="text-2xl md:text-4xl xl:text-4xl tracking-tight text-gray-900 font-semibold leading-tight mb-8 d-hdpi-2:text-vw-4xl d-hdpi-2:mb-vw-8">
                                Search by Destination, Interest, or Travel
                                Kreator
                            </div>
                            <div className="text-green-900 text-base md:text-lg xl:text-xl font-normal mb-8 d-hdpi-2:text-vw-xl d-hdpi-2:mb-vw-8">
                                We have made the Konnect Marketplace as
                                intuitive as we posibly can, but we want to hear
                                from travelers. Tell us what you think and how
                                we can do better. This is your platform!
                            </div>
                            <Button
                                // animation={false}
                                as="link"
                                label="Find an Experience"
                                link={'/experiences/search/all'}
                                width="md:w-96 d-hdpi-2:w-vw-96"
                            />
                        </div>
                        <div className="px-4 md:px-0 mb-8 lg:w-1/2 overflow-hidden rounded-xl d-hdpi-2:rounded-vw-xl shadow-2xl-green d-hdpi-2:mb-vw-8">
                            <video controls autoPlay muted loop preload>
                                <source
                                    src="https://ucarecdn.com/951788ce-0e8c-4656-8a87-8b92087da93c/"
                                    type="video/mp4"></source>
                            </video>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-white pb-0">
                <div
                    className={`relative 
                          md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto bg-contain bg-no-repeat bg-center pt-16 md:pt-16 px-0 lg:px-8 w-80 md:w-full d-hdpi-2:max-w-screen-2/3 `}>
                    <div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <Pill__Logo />
                    </div>
                    <div className="w-full flex flex-col px-0 md:px-8 lg:px-0">
                        <GradientTitle
                            label="How does the Marketplace work?"
                            textSize="text-3xl md:text-6xl d-hdpi-2:text-vw-6xl"
                            justify="justify-center"
                        />

                        <div className="max-w-lg w-full mx-auto flex items-center border-b border-gray-200 mb-8 md:mb-0 mt-4 md:mt-12 d-hdpi-2:mt-vw-12 d-hdpi-2:max-w-screen-1/3">
                            <div
                                onClick={() => setTab('travel')}
                                className={`cursor-pointer w-1/2 h-12 flex items-center border-b-4 px-4 uppercase md:tracking-wider text-sm d-hdpi-2:text-vw-sm d-hdpi-2:border-b-2 d-hdpi-2:h-vw-12 d-hdpi-2:px-vw-4 ${
                                    tab === 'travel'
                                        ? tabClasses.on
                                        : tabClasses.off
                                }`}>
                                For Travelers
                            </div>
                            <div
                                onClick={() => setTab('kreate')}
                                className={`cursor-pointer w-1/2 h-12 flex items-center border-b-4 px-4 uppercase md:tracking-wider text-sm d-hdpi-2:text-vw-sm d-hdpi-2:border-b-2 d-hdpi-2:h-vw-12 d-hdpi-2:px-vw-4 ${
                                    tab === 'kreate'
                                        ? tabClasses.on
                                        : tabClasses.off
                                }`}>
                                For Kreators
                            </div>
                        </div>
                        <div className="w-full rounded-3xl bg-white overflow-hidden d-hdpi-2:rounded-vw-3xl">
                            <div
                                className={`p-4 xl:pb-16 flex flex-nowrap gap-8 md:gap-8 lg:gap-8 xl:gap-32 transform-gpu transition-all duration-500 ease-in-out-expo-hard d-hdpi-2:gap-16 d-hdpi-2:pb-vw-16 ${
                                    tab === 'travel'
                                        ? containerClasses.on
                                        : containerClasses.off
                                }`}>
                                <div className="flex flex-nowrap flex-col lg:flex-row lg:justify-center gap-4 lg:gap-8 xl:gap-16 d-hdpi-2:gap-8 ">
                                    <OptionCard
                                        title="Explore"
                                        image="/assets/media/choosing.png">
                                        Browse the Konnect marketplace and
                                        explore a growing collection of both
                                        digital and guided experiences made by
                                        locals and travelers.
                                    </OptionCard>
                                    <OptionCard
                                        title="Choose"
                                        image="/assets/media/aiming.png">
                                        Our marketplace was designed to make it
                                        easy to find and choose the right
                                        experience for you, in a format that
                                        covers the what, where, when, and how
                                        and everything in between.
                                    </OptionCard>
                                    <OptionCard
                                        title="Enjoy"
                                        image="/assets/media/running.png">
                                        Access guides on the go and take
                                        advantage of direct links to location
                                        and relevant information from a
                                        traveler’s perspective.
                                        {/* <a
                                            href="https://www.instagram.com/explore/tags/viakonnect/"
                                            target="_blank"
                                            className="text-sm bg-green-200 rounded px-2 mx-2">
                                            #viakonnect
                                        </a> */}
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

            <div className="w-full py-8 lg:py-16 d-hdpi-2:py-vw-16 landing-gradient-a bg-gray-100 ">
                <div
                    className={`relative 
                             md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto bg-contain bg-no-repeat bg-center py-0 xl:py-8 px-4 xl:px-16 2xl:px-0 d-hdpi-2:max-w-screen-2/3 d-hdpi-2:px-0 d-hdpi-2:py-vw-8`}>
                    <div className="flex flex-col-reverse lg:flex-row justify-between items-center mb-8 md:px-16 lg:px-0 md:gap-0 ">
                        <div className="lg:w-2/5 flex flex-col px-8 md:px-0 ">
                            <GradientTitle
                                label="Digital vs. Guided"
                                textSize="text-4xl md:text-6xl d-hdpi-2:text-vw-6xl"
                                justify=""
                                containerClass=""
                            />
                            <div className="text-2xl md:text-4xl xl:text-4xl tracking-tight text-gray-900 font-semibold leading-tight mb-8 d-hdpi-2:text-vw-4xl d-hdpi-2:mb-vw-8">
                                It's up to you
                            </div>
                            <div className="text-green-900 text-base md:text-lg xl:text-xl font-normal mb-8 d-hdpi-2:text-vw-xl d-hdpi-2:mb-vw-8">
                                Digital Experiences are written guides that you
                                can follow on your own without a guide and
                                include all the details you need including
                                google map locations, while Guided Experiences
                                are packages that include a personal guide
                                during the experience.
                            </div>
                            <Button
                                as="link"
                                label="Find an Experience"
                                link={'/experiences/search/all'}
                                width="md:w-96 d-hdpi-2:w-vw-96"
                            />
                        </div>
                        <div className="lg:w-3/5 px-4 md:px-0 lg:pl-32 d-hdpi-2:pl-vw-24">
                            <img src="/assets/media/marketplace-02@2x.png" />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="relative w-full bg-white pb-12 pt-10"
                id="join d-hdpi-2:pt-vw-16 d-hdpi-2:pb-vw-20">
                <div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <Pill__Logo />
                </div>
                <div
                    className={`relative 
                          md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto bg-contain bg-no-repeat bg-center  lg:px-8 px-12 md:w-full d-hdpi-2:max-w-screen-2/3`}>
                    <LandingCapture title="Learn More" />
                </div>
            </div>
        </Layout>
    );
};

export default AboutMarketplace;

const OptionCard = ({ title, children, image }) => {
    return (
        <div className="w-full lg:w-72 xl:w-80 mb-16 md:mb-0  flex flex-col md:flex-row lg:flex-col md:gap-8 lg:gap-0 d-hdpi-2:w-vw-80">
            <div className="w-72 md:w-80 lg:w-72 md:h-96 flex items-center justify-center d-hdpi-2:w-vw-72 d-hdpi-2:h-vw-96">
                <img src={image} className="" />
            </div>
            <div className="w-72 md:w-80 lg:w-72 md:mt-16 lg:mt-0 px-4 xl:px-0 d-hdpi-2:w-vw-72 d-hdpi-2:mt-0">
                {/* <GradientTitle label={title} textSize="text-4xl" /> */}
                <div className="text-4xl mb-4 text-green-400 font-semibold d-hdpi-2:text-vw-4xl d-hdpi-2:mb-vw-4">
                    {title}
                </div>
                <div className="text-base text-gray-600 d-hdpi-2:text-vw-base">
                    {children}
                </div>
            </div>
        </div>
    );
};

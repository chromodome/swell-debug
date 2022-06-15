import Link from 'next/link';
import Image from 'next/image';
import FooterMenuLink from '../blocks/FooterMenuLink';
const Footer = ({ isBody = true, isBottomBar = true }) => {
    // console.log('footer');
    return (
        <footer className="">
            {isBody && (
                <div className="bg-gray-800 pt-12 pb-6 px-8 w-full">
                    {/* <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 h-48a min-h-full text-white"> */}
                    <div className="mx-auto max-w-6xl gap-8 flex flex-col md:flex-row w-full text-white justify-center">
                        <section>
                            <div className="flex items-center gap-3 -mt-2">
                                <img
                                    className="h-8"
                                    src="/assets/media/kn_logoicon_white.svg"
                                    // height={45}
                                    // width={31}
                                />
                                <img
                                    className="flex-shrink-0 w-24"
                                    src="/assets/media/kn_logotext_white.svg"
                                    // height={45}
                                    // width={31}
                                />
                            </div>
                        </section>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8 text-white">
                            <section>
                                <h3 className="text-2xl md:text-base text-green-400 mb-2">
                                    About
                                </h3>
                                <nav className="flex flex-col gap-2 md:text-xs font-light">
                                    <FooterMenuLink
                                        url="/help/article/1001"
                                        label="What is Konnect"
                                    />
                                    <FooterMenuLink
                                        url="/help/article/1002"
                                        label="How Konnect works"
                                    />
                                    <FooterMenuLink
                                        url="/help/article/1003"
                                        label="Getting started"
                                    />
                                </nav>
                            </section>
                            <section>
                                <h3 className="text-2xl md:text-base text-green-400 mb-2">
                                    Explore
                                </h3>
                                <nav className="flex flex-col gap-2 md:text-xs font-light">
                                    <FooterMenuLink
                                        url="/experiences/search/all"
                                        label="All experiences"
                                    />
                                    <FooterMenuLink
                                        url="/experiences/destination/world/all"
                                        label="By Destination"
                                    />
                                    <FooterMenuLink
                                        url="/experiences/interest/all/all"
                                        label="By Interest"
                                    />
                                    {/* <FooterMenuLink
                                        url="/kreators/featured"
                                        label="Featured creators"
                                    /> */}
                                </nav>
                            </section>
                            <section>
                                <h3 className="text-2xl md:text-base text-green-400 mb-2">
                                    Support
                                </h3>
                                <nav className="flex flex-col gap-2 md:text-xs font-light">
                                    {/* <FooterMenuLink
                                        url="/help/article/5001"
                                        label="Updates for Covid-19"
                                    /> */}
                                    <FooterMenuLink
                                        url="/help/article/1001"
                                        label="Help Center"
                                    />
                                    <FooterMenuLink
                                        url="/help/article/4001"
                                        label="Terms of Service"
                                    />
                                    {/* <FooterMenuLink
                                        url="/help/article/4002"
                                        label="Cancellation and refunds"
                                    /> */}

                                    <FooterMenuLink
                                        url="/help/article/4004"
                                        label="Privacy Policy"
                                    />
                                </nav>
                            </section>
                            <section>
                                <h3 className="text-2xl md:text-base text-green-400 mb-2">
                                    Stay in touch
                                </h3>
                                <nav className="flex gap-2 text-2xl font-light">
                                    <a
                                        target="_blank"
                                        noreferrer
                                        href="https://www.instagram.com/viakonnect/"
                                        className="hover:text-green-400">
                                        <i className="ri-instagram-line"></i>
                                    </a>
                                    <a
                                        target="_blank"
                                        noreferrer
                                        href="https://www.facebook.com/Viakonnect-115723371137514/"
                                        className="hover:text-green-400">
                                        <i className="ri-facebook-fill"></i>
                                    </a>
                                    <a
                                        target="_blank"
                                        noreferrer
                                        href="https://www.youtube.com/channel/UCrv_eGOq3Almjhved39LR6Q"
                                        className="hover:text-green-400">
                                        <i className="ri-youtube-line"></i>
                                    </a>
                                </nav>
                                <nav className="flex flex-col gap-2 md:text-xs font-light"></nav>
                            </section>
                        </div>
                    </div>
                </div>
            )}
            {isBottomBar && (
                <div className="bg-gray-800 py-3">
                    <div className="mx-auto max-w-6xl text-white text-xs justify-center flex items-center">
                        © Copyright 2022 Viakonnect. All rights reserved.
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;

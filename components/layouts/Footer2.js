import Link from 'next/link';
import FooterMenuLink from '../blocks/FooterMenuLink';
const Footer2 = ({ isBody = true, isBottomBar = true }) => {
    // console.log('footer');
    return (
        <footer className="">
            {isBody && (
                <div className="bg-gray-800 py-16">
                    <div className="mx-auto grid-rows-3 gap-8 px-16 max-w-2xl md:max-w-3xl lg:max-w-4xl grid md:grid-cols-3 md:h-32 min-h-full text-white">
                        <section>
                            <h3 className="text-green-400 mb-4">About</h3>
                            <nav className="flex flex-col gap-2 text-xs font-light">
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
                            <h3 className="text-green-400 mb-4">Support</h3>
                            <nav className="flex flex-col gap-2 text-xs font-light">
                                <FooterMenuLink
                                    url="/help/article/4001"
                                    label="Terms of Service"
                                />
                                <FooterMenuLink
                                    url="/help/article/4002"
                                    label="Cancellation and refunds"
                                />

                                <FooterMenuLink
                                    url="/help/article/4004"
                                    label="Privacy Policy"
                                />
                            </nav>
                        </section>
                        <section>
                            <h3 className="text-green-400 mb-4">
                                Stay in touch
                            </h3>
                            <nav className="flex gap-2 text-2xl ">
                                <a
                                    href="https://instagram.com/viakonnect"
                                    target="_blank">
                                    <i className="ri-instagram-line hover:text-green-400"></i>
                                </a>
                                <a
                                    href="https://www.youtube.com/channel/UCrv_eGOq3Almjhved39LR6Q"
                                    target="_blank">
                                    <i className="ri-youtube-line hover:text-green-400"></i>
                                </a>
                            </nav>
                        </section>
                    </div>
                </div>
            )}
            {isBottomBar && (
                <div className="bg-gray-900 py-2">
                    <div className="mx-auto max-w-6xl text-white text-xs justify-center flex items-center">
                        © Copyright 2022 Viakonnect. All rights reserved.
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer2;

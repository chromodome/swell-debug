import Link from 'next/link';
import FooterMenuLink from '../blocks/FooterMenuLink';
const Footer = ({ isBody = true, isBottomBar = true }) => {
    // console.log('footer');
    return (
        <footer className="">
            {isBody && (
                <div className="bg-gray-800 py-16 mt-16">
                    <div className="mx-auto max-w-6xl grid grid-cols-5 h-48 min-h-full text-white">
                        <section> Konnect</section>
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
                            <h3 className="text-green-400 mb-4">Discover</h3>
                            <nav className="flex flex-col gap-2 text-xs font-light">
                                <FooterMenuLink
                                    url="/experiences/search"
                                    label="Find an experience"
                                />
                                <FooterMenuLink
                                    url="/experiences/collections"
                                    label="Curated collections"
                                />
                                <FooterMenuLink
                                    url="/experiences/featured"
                                    label="Featured experiences"
                                />
                                <FooterMenuLink
                                    url="/kreators/featured"
                                    label="Featured creators"
                                />
                            </nav>
                        </section>
                        <section>
                            <h3 className="text-green-400 mb-4">Support</h3>
                            <nav className="flex flex-col gap-2 text-xs font-light">
                                <FooterMenuLink
                                    url="/help/article/5001"
                                    label="Updates for Covid-19"
                                />
                                <FooterMenuLink url="" label="Help Center" />
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
                            <nav className="flex flex-col gap-2 text-xs font-light"></nav>
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

export default Footer;

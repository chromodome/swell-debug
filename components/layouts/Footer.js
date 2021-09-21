import Link from 'next/link';
const Footer = () => {
    return (
        <footer>
            <div className="bg-gray-800  py-16">
                <div className="mx-auto max-w-6xl grid grid-cols-5 h-48 min-h-full text-white">
                    <div> Konnect</div>
                    <div>
                        <div className="text-green-400 mb-4">About</div>
                        <div className="flex flex-col gap-2 text-xs">
                            <div>What is Konnect</div>
                            <div>Our team</div>
                            <div>Careers</div>
                            <div>Earn with Konnect</div>
                        </div>
                    </div>
                    <div>
                        <div className="text-green-400 mb-4">Discover</div>
                        <div className="flex flex-col gap-2 text-xs">
                            <div>What is Konnect</div>
                            <div>Our team</div>
                            <div>Careers</div>
                            <div>Earn with Konnect</div>
                        </div>
                    </div>
                    <div>
                        <div className="text-green-400 mb-4">Support</div>
                        <div className="flex flex-col gap-2 text-xs">
                            <div>Updates for Covid-19</div>
                            <div>Help Center</div>
                            <div>Terms and Conditions</div>
                            <div>Cancellation Policy</div>
                            <div>Refund Policy</div>
                            <div>Privacy Policy</div>
                        </div>
                    </div>
                    <div>
                        <div className="text-green-400 mb-4">Stay in touch</div>
                        <div className="flex flex-col gap-2 text-xs"></div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 py-2 ">
                <div className="mx-auto max-w-6xl text-white text-xs  flex items-center">
                    © Copyright 2021 Viakonnect. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

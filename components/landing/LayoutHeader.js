import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { handleRowReverse } from '@/helpers/FEutils';
import { ReactComponent as KLogoIcon } from 'components/svg/kn_logoicon.svg';
import { ReactComponent as KLogoText } from 'components/svg/kn_logotext.svg';
import debounce from 'helpers/debounce';

const LayoutHeader = (props) => {
    const [scrollPos, setScrollPos] = useState(0);
    const [showHeader, setShowHeader] = useState(true);

    const rtl = false;

    useEffect(() => {
        const debouncedHandleScroll = debounce(handleScroll, 100);

        window.addEventListener('scroll', debouncedHandleScroll);

        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
        };
    }, [scrollPos]);

    const handleScroll = () => {
        if (typeof window !== 'undefined') {
            const currentScrollPos = window.scrollY;

            setShowHeader(currentScrollPos - scrollPos < 0 || scrollPos < 400);
            setScrollPos(currentScrollPos);
        }
    };

    return (
        <>
            <div
                style={{ zIndex: 51 }}
                className={`${
                    handleRowReverse(rtl).rtl
                } fixed top-0 inset-x-0 h-16  md:h-20 bg-white transform-gpu duration-300 ${
                    showHeader
                        ? 'translate-y-0 shadow-cards'
                        : '-translate-y-24 shadow-none md:shadow-none'
                }`}>
                <div className="flex justify-center items-center mt-2.5 md:mt-4">
                    <div className="flex flex-1 flex-row justify-between items-center px-4 md:px-0 h-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
                        <div className="flex flex-grow justify-between ">
                            <div
                                className={`flex items-center gap-3 ${
                                    handleRowReverse(rtl).flex
                                }`}>
                                <KLogoIcon />
                                <KLogoText />
                                <span className="text-xs mt-1 whitespace-nowrap">
                                    (for Kreators)
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-end gap-8 items-center ">
                            <Link
                                to="/accounts/signup"
                                className={`hidden focus:outline-none relative overflow-hidden w-56 h-12 rounded-lg md:flex items-center justify-center bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-2xl-green-500 hover:shadow-none font-medium text-white hover:bg-gray-900 transition-all hover:text-white
                     duration-300  out-expo-hard `}>
                                <span className="absolute left-1/2 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2">
                                    <span className="whitespace-nowrap">
                                        Become a Kreator
                                    </span>
                                </span>
                                <span className="absolute inset-0 bg-gray-900 transition-opacity font-medium duration-200 hover:opacity-100 opacity-0">
                                    <span className="absolute left-1/2 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2">
                                        <span className="whitespace-nowrap">
                                            Become a Kreator
                                        </span>
                                    </span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LayoutHeader;

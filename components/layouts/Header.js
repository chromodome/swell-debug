import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import Search from '@/blocks/Search';
import LangList from '@/blocks/LangList';
import Avatar from '@/specialty/Avatar';
import NavbarSidebar from '@/layouts/NavbarSidebar';
import IconsLucide from '@/blocks/IconsLucide';
import NavbarItem from '@/blocks/NavbarItem';

import AuthContext from '@/context/AuthContext';
import { handleRowReverse } from '@/helpers/FEutils';
import translations from '@/constants/translations';
import uiStruct from '@/constants/uiStruct';
import { NEXT_URL } from '@/config/index';

import debounce from '@/helpers/debounce';

const Header = ({}) => {
    const { user, lang, setLang, rtl, setRtl, navIsOpen, toggleNav, logout } =
        useContext(AuthContext);

    const [scrollPos, setScrollPos] = useState(0);
    const [showHeader, setShowHeader] = useState(true);

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
            console.log('direction: ', currentScrollPos - scrollPos);

            setShowHeader(currentScrollPos - scrollPos < 0 || scrollPos < 400);
            setScrollPos(currentScrollPos);
        }
    };

    return (
        <>
            <header
                style={{ zIndex: 300 }}
                className={`${
                    handleRowReverse(rtl).rtl
                } fixed bottom-0 md:top-0 inset-x-0 h-16 md:h-20 bg-white shadow-cards-top md:shadow-cards flex items-center transform-gpu duration-300 ${
                    showHeader ? 'translate-y-0' : '-translate-y-24'
                }`}
            >
                <div className='flex flex-1 flex-row justify-between items-center h-full '>
                    <div className='flex flex-shrink-0  lg:w-1/3'>
                        <div
                            className={`flex  items-center ${
                                rtl
                                    ? 'mr-6 md:mr-8 lg:mr-10 xl:mr-32 2xl:mr-44'
                                    : 'ml-6 md:ml-8 lg:ml-10 xl:ml-32 2xl:ml-44'
                            } gap-3 ${handleRowReverse(rtl).flex}`}
                        >
                            <img src='/assets/media/kn_logoicon.svg' />
                            <img
                                className='hidden md:block'
                                src='/assets/media/kn_logotext.svg'
                            />
                        </div>
                    </div>
                    <Search lang={lang} rtl={rtl} />
                    <div className='flex justify-end items-center h-full  lg:w-1/3'>
                        <div className='hidden lg:flex items-center '>
                            <div className='hidden xl:block mx-4 text-sm'>
                                {user
                                    ? `${translations[lang].messages.hello} ${user.firstname}`
                                    : `Guest`}
                            </div>
                            {user ? (
                                <Avatar user={user} />
                            ) : (
                                <IconsLucide icon='User' />
                            )}
                        </div>
                        <LangList />

                        <button
                            onClick={() => toggleNav(!navIsOpen)}
                            className={`focus:outline-none w-20 
                               flex flex-shrink-0 h-12 items-center justify-center text-2xl bg-green-400 transition-all duration-200 hover:bg-gray-900 hover:text-white ${
                                   rtl ? 'rounded-r-lg' : 'rounded-l-lg'
                               }`}
                        >
                            <i
                                className={`${
                                    rtl ? 'ri-menu-2-line' : 'ri-menu-3-line'
                                }`}
                            ></i>
                        </button>
                    </div>
                </div>
            </header>
            <NavbarSidebar>
                {user ? (
                    <>
                        <NavbarItem
                            label={translations[lang].menu.messages.title}
                            icon='Inbox'
                            link={`${NEXT_URL}/c/messages`}
                            handleClick={toggleNav}
                            rtl={rtl}
                        />
                        <NavbarItem
                            label={translations[lang].menu.myPurchases.title}
                            icon='LayoutGrid'
                            link={`${NEXT_URL}/c/experiences`}
                            handleClick={toggleNav}
                            rtl={rtl}
                        />
                        <NavbarItem
                            label={translations[lang].menu.myFavourites.title}
                            icon='Heart'
                            link={`#`}
                            handleClick={toggleNav}
                            rtl={rtl}
                        />
                        <NavbarItem
                            label={translations[lang].menu.profile.title}
                            icon='User'
                            link={`${NEXT_URL}/c/profile`}
                            handleClick={toggleNav}
                            rtl={rtl}
                        />
                        <NavbarItem
                            label={translations[lang].menu.helpCenter.title}
                            icon='HelpCircle'
                            link={`http://academy.viakonnect.com`}
                            handleClick={() => console.log('hello')}
                            handleClick={toggleNav}
                            rtl={rtl}
                        />
                        <NavbarItem
                            label={translations[lang].menu.signout.title}
                            icon='LogOut'
                            link='#'
                            handleClick={() => console.log('hello')}
                            handleClick={toggleNav}
                            rtl={rtl}
                        />
                    </>
                ) : (
                    <>
                        <NavbarItem
                            label={translations[lang].menu.signin.title}
                            icon='LogIn'
                            link='#'
                            handleClick={() => console.log('hello')}
                            handleClick={toggleNav}
                            rtl={rtl}
                        />
                        <NavbarItem
                            label={translations[lang].menu.signup.title}
                            icon='UserPlus'
                            link='#'
                            handleClick={() => console.log('hello')}
                            handleClick={toggleNav}
                            rtl={rtl}
                        />
                        <NavbarItem
                            label={translations[lang].menu.helpCenter.title}
                            icon='HelpCircle'
                            link={`http://academy.viakonnect.com`}
                            handleClick={() => console.log('hello')}
                            handleClick={toggleNav}
                            rtl={rtl}
                        />
                    </>
                )}
            </NavbarSidebar>
        </>
    );
};

export default Header;

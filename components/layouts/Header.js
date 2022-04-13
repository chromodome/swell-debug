import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchCartAction } from '@/store/actions/swell/cart';
import Link from 'next/link';
import {
    toggleLang,
    toggleNav,
    toggleCart,
    toggleAuthModal,
    setAuthPage
} from '@/store/actions/globalState';
import { logout } from '@/store/actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Search from '@/components/blocks/Search/Search';
import LangList from '@/blocks/LangList';
import Avatar from '@/specialty/Avatar';
import NavbarSidebar from '@/layouts/NavbarSidebar';
import NavbarSidebarCart from '@/layouts/NavbarSidebarCart';
import IconsLucide from '@/blocks/Icon/IconsLucide';
import NavbarItem from '@/blocks/NavbarItem';

import { handleRowReverse } from '@/helpers/FEutils';
import translations from '@/constants/translations';

import { NEXT_URL } from '@/config/index';

import debounce from '@/helpers/debounce';
import ModalAuth from '../blocks/Modal/ModalAuth';

const Header = ({
    fetchCartAction,
    toggleLang,
    toggleNav,
    toggleCart,
    toggleAuthModal,
    setAuthPage,
    logout,
    globalState: { rtl, lang, navIsOpen, cartIsOpen, authModalIsOpen, authComponent },
    auth: { user, isAuthenticated, isProfile },

    isLogo = true,
    isSearch = true,
    isAvatar = true,
    isLang = false,
    isMenu = true,
    isCustom = null,

    children
}) => {
    const [scrollPos, setScrollPos] = useState(0);
    const [showHeader, setShowHeader] = useState(true);

    const router = useRouter();
    const handleClick = (e) => {
        e.preventDefault();
        router.push('/');
    };

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
            // console.log('direction: ', currentScrollPos - scrollPos);

            setShowHeader(currentScrollPos - scrollPos < 0 || scrollPos < 400);
            setScrollPos(currentScrollPos);
        }
    };

    const handleSignin = () => {
        toggleNav(false);
        setAuthPage('login');
        toggleAuthModal(true);
    };

    const handleSignup = () => {
        toggleNav(false);
        setAuthPage('register');
        toggleAuthModal(true);
    };

    const handleLogout = () => {
        toggleNav(false);
        toggleAuthModal(false);
        logout();
    };

    useEffect(() => {
        fetchCartAction()
    }, []);

    return (
        <>
            <header
                style={{ zIndex: 300 }}
                className={`${
                    handleRowReverse(rtl).rtl
                } fixed top-0 w-full inset-x-0 h-16 md:h-20 bg-white shadow-cards flex items-center transform-gpu duration-300 ${
                    showHeader ? 'translate-y-0' : '-translate-y-24'
                }`}>
                <div className="flex flex-1 flex-row justify-between items-center h-full ">
                    <div className="flex flex-shrink-0  lg:w-1/3">
                        <div
                            onClick={handleClick}
                            className={`flex  items-center cursor-pointer ${
                                rtl
                                    ? 'mr-6 md:mr-8 lg:mr-10 xl:mr-32 2xl:mr-44'
                                    : 'ml-6 md:ml-8 lg:ml-10 xl:ml-32 2xl:ml-44'
                            } gap-3 ${handleRowReverse(rtl).flex}`}>
                            <img src="/assets/media/kn_logoicon.svg" />
                            <img
                                className=""
                                src="/assets/media/kn_logotext.svg"
                            />
                        </div>
                    </div>
                    {isSearch && <Search lang={lang} rtl={rtl} />}
                    <div className="flex justify-end items-center h-full  lg:w-1/3">
                        {isAvatar && (
                            <div
                                className={`hidden lg:flex items-center ${
                                    isLang ? '' : 'mr-10'
                                }`}>
                                <div className="hidden xl:block mx-4 text-sm">
                                    {user
                                        ? `${translations[lang].messages.hello} ${user?.profile.first}`
                                        : `Guest`}
                                </div>
                                {user ? (
                                    <Avatar profile={user?.profile} />
                                ) : (
                                    <IconsLucide icon="User" />
                                )}
                            </div>
                        )}
                        {isLang && <LangList />}

                        {isMenu && (
                            <>
                                <button
                                onClick={() => toggleCart(!cartIsOpen)}
                                className={`focus:outline-none w-20 
                                flex flex-shrink-0 h-12 items-center justify-center text-2xl bg-green-400 transition-all duration-200 hover:bg-gray-900 hover:text-white ${
                                    rtl ? 'rounded-r-lg' : 'rounded-l-lg'
                                }`}>
                                <i
                                    className={`${
                                        rtl
                                            ? 'ri-menu-2-line'
                                            : 'ri-menu-3-line'
                                    }`}></i>
                            </button>
                            <button
                                onClick={() => toggleNav(!navIsOpen)}
                                className={`focus:outline-none w-20 
                               flex flex-shrink-0 h-12 items-center justify-center text-2xl bg-green-400 transition-all duration-200 hover:bg-gray-900 hover:text-white ${
                                   rtl ? 'rounded-r-lg' : 'rounded-l-lg'
                               }`}>
                                <i
                                    className={`${
                                        rtl
                                            ? 'ri-menu-2-line'
                                            : 'ri-menu-3-line'
                                    }`}></i>
                            </button>
                            </>
                        )}
                        {isCustom}
                    </div>
                </div>
            </header>
            <NavbarSidebarCart>kjh</NavbarSidebarCart>
            {isMenu && (
                <NavbarSidebar>
                    {isAuthenticated ? (
                        <>
                            <NavbarItem
                                label={translations[lang].menu.messages.title}
                                icon="Inbox"
                                link={`${NEXT_URL}/c/messages`}
                                handleClick={toggleNav}
                                rtl={rtl}
                            />
                            <NavbarItem
                                label={
                                    translations[lang].menu.myPurchases.title
                                }
                                icon="LayoutGrid"
                                link={`${NEXT_URL}/experiences`}
                                handleClick={toggleNav}
                                rtl={rtl}
                            />
                            <NavbarItem
                                label={
                                    translations[lang].menu.myFavourites.title
                                }
                                icon="Heart"
                                link={`${NEXT_URL}/favourites`}
                                handleClick={toggleNav}
                                rtl={rtl}
                            />
                            <NavbarItem
                                label={translations[lang].menu.profile.title}
                                icon="User"
                                link={`${NEXT_URL}/profile`}
                                handleClick={toggleNav}
                                rtl={rtl}
                            />
                            <NavbarItem
                                label={translations[lang].menu.helpCenter.title}
                                icon="HelpCircle"
                                link={`http://academy.viakonnect.com`}
                                handleClick={() => console.log('hello')}
                                handleClick={toggleNav}
                                rtl={rtl}
                            />
                            <NavbarItem
                                label={translations[lang].menu.signout.title}
                                icon="LogOut"
                                handleClick={handleLogout}
                                rtl={rtl}
                            />
                        </>
                    ) : (
                        <>
                            <NavbarItem
                                label={translations[lang].menu.signin.title}
                                icon="LogIn"
                                handleClick={handleSignin}
                                rtl={rtl}
                            />
                            <NavbarItem
                                label={translations[lang].menu.signup.title}
                                icon="UserPlus"
                                handleClick={handleSignup}
                                rtl={rtl}
                            />
                            <NavbarItem
                                label={translations[lang].menu.helpCenter.title}
                                icon="HelpCircle"
                                link={`http://academy.viakonnect.com`}
                                handleClick={() => console.log('hello')}
                                handleClick={toggleNav}
                                rtl={rtl}
                            />
                        </>
                    )}
                </NavbarSidebar>
            )}
            <ModalAuth />
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
            toggleLang,
            toggleNav,
            toggleCart,
            logout,
            toggleAuthModal,
            setAuthPage,
            fetchCartAction
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React from 'react';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import uiStruct from '@/constants/uiStruct';
import translations from '@/constants/translations';
import Icons from '@/blocks/Icons';
import { handleRowReverse } from 'helpers/FEutils';
import Avatar from '@/specialty/Avatar';
import IconsLucide from '@/blocks/IconsLucide';

const NavbarSidebar = ({ children }) => {
    const { user, rtl, lang, navIsOpen, toggleNav, logout } =
        useContext(AuthContext);

    return (
        <>
            <div
                style={{ zIndex: 302 }}
                className={`fixed inset-0  ${
                    navIsOpen ? '' : 'pointer-events-none'
                }`}
                onClick={() => toggleNav(!navIsOpen)}
            ></div>
            <div
                style={{ zIndex: 303 }}
                className={`fixed inset-y-0 ${
                    handleRowReverse(rtl).right
                }-0 w-full md:w-96 bg-white  shadow-images transition duration-300 ease-in-out transform-gpu ${
                    navIsOpen
                        ? 'translate-x-0'
                        : handleRowReverse(rtl).menuTranslateReverse +
                          ' pointer-events-none'
                }`}
            >
                <nav className=' flex flex-col relative flex-1 pt-28'>
                    <div className='md:hidden fixed inset-x-0 top-6'>
                        <div
                            className={`flex  items-center ml-8 gap-3 ${
                                handleRowReverse(rtl).flex
                            }`}
                        >
                            <img src='/assets/media/kn_logoicon.svg' />
                            <img
                                className=''
                                src='/assets/media/kn_logotext.svg'
                            />
                        </div>
                    </div>

                    <div className='fixed inset-x-0 bottom-3 md:bottom-full md:top-6'>
                        <div
                            className={`flex ${
                                handleRowReverse(rtl).rtl
                            } justify-between items-center `}
                        >
                            <div
                                className={`${
                                    handleRowReverse(rtl).ml
                                }-12 flex items-center`}
                            >
                                {user ? (
                                    <Avatar user={user} size={50} />
                                ) : (
                                    <IconsLucide icon='User' />
                                )}

                                <div className='px-2'>
                                    {user ? user.handle : 'Guest'}
                                </div>
                            </div>
                            <button
                                onClick={() => toggleNav(!navIsOpen)}
                                className={`focus:outline-none w-20 h-12
                                   flex  items-center justify-center text-2xl bg-green-400 hover:bg-gray-900 hover:text-white ${
                                       rtl ? 'rounded-r-lg' : 'rounded-l-lg'
                                   }`}
                            >
                                <i
                                    className={`${
                                        rtl
                                            ? 'las la-arrow-left'
                                            : 'las la-arrow-right'
                                    }`}
                                ></i>
                            </button>
                        </div>
                    </div>
                    <div
                        className={`border-t border-b border-gray-200 pt-8 pb-8 ${
                            handleRowReverse(rtl).rtl
                        }`}
                    >
                        {children}
                    </div>
                    <div className='px-12 flex items-center mt-8'>
                        <a
                            target='_blank'
                            href='https://kreator.viakonnect.com'
                            className='flex-1 py-3 px-4 rounded-full flex items-center justify-center border-2 border-green-400  hover:border-green-400 ring-4 ring-transparent hover:ring-green-200   hover:bg-green-50 transition-all duration-200 ease-in-out shadow-2xl-green-400'
                        >
                            Become a kreator
                        </a>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default NavbarSidebar;

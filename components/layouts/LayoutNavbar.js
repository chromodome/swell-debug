import React, { useState, useEffect } from 'react';
// import { NavLink, Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { toggleLang, toggleNav } from 'store/actions/globalState/master';
import { handleRowReverse } from '@/helpers/FEutils';
import LangList from '@/blocks/LangList';
import translations from '@/constants/translations';
import uiStruct from '@/constants/uiStruct';
import Avatar from '@/specialty/Avatar';
// import LayoutNavbarSidebar from '@/layouts/LayoutNavbarSidebar';
import IconsLucide from '@/blocks/IconsLucide';

const LayoutNavbar = ({ rtl = false, user }) => {
    // const [selectedLang, setSelectedLang] = useState(uiStruct.ui.languages[0]);
    // const rtl = !!translations[lang].rtl;

    // const handleLangChange = (selectedLang) => {
    //     setSelectedLang(selectedLang);
    //     toggleLang(selectedLang.id);
    // };

    const [navIsOpen, setNavIsOpen] = useState(false);

    return (
        <>
            <div
                style={{ zIndex: 51 }}
                className={`${
                    handleRowReverse(rtl).rtl
                } fixed bottom-0 md:top-0 inset-x-0 h-16 bg-white shadow-cards`}
            >
                <div className='flex flex-row justify-between items-center h-16'>
                    <div className='flex flex-grow justify-between max-w-2xl'>
                        <div
                            className={`w-96 flex items-center justify-center gap-3 ${
                                handleRowReverse(rtl).flex
                            }`}
                        >
                            <img src='/assets/media/kn_logoicon.svg' />
                            <img src='/assets/media/kn_logotext.svg' />
                        </div>
                    </div>

                    <div className='flex justify-end items-center h-full'>
                        <div className='flex items-center mr-12'>
                            <div className='mx-4'>
                                {`${
                                    translations[lang][
                                        uiStruct.ui.messages.hello
                                    ]
                                } ${user.firstname}`}
                            </div>
                            <Avatar user={user} />
                        </div>
                        <LangList
                            langType
                            listData={uiStruct.ui.languages}
                            val={selectedLang}
                            handleChange={handleLangChange}
                        />

                        <button
                            onClick={() => toggleNav(!navIsOpen)}
                            className={`focus:outline-none w-20 
                               flex h-full items-center justify-center text-2xl bg-green-400 hover:bg-gray-900 hover:text-white ${
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
            </div>
            <LayoutNavbarSidebar
            // menuIsOpen={menuIsOpen}
            // setMenuIsOpen={toggleNav}
            // user={user}
            >
                <LayoutNavbarItem
                    label={
                        translations[lang][uiStruct.ui.navmain.kreations.title]
                    }
                    icon='Grid'
                    link={`${process.env.REACT_APP_BASENAME_EXPERIENCE}/all`}
                    handleClick={toggleNav}
                    rtl={rtl}
                />
                <LayoutNavbarItem
                    label={translations[lang][uiStruct.ui.navmain.payout.title]}
                    icon='DollarSign'
                    link={`${process.env.REACT_APP_BASENAME}/payout`}
                    handleClick={toggleNav}
                    rtl={rtl}
                />
                <LayoutNavbarItem
                    label={
                        translations[lang][uiStruct.ui.navmain.profile.title]
                    }
                    icon='User'
                    link={`${process.env.REACT_APP_BASENAME}/settings/account/profile`}
                    handleClick={toggleNav}
                    rtl={rtl}
                />
                <LayoutNavbarItem
                    label={translations[lang][uiStruct.ui.navmain.help.title]}
                    icon='HelpCircle'
                    link={`http://www.chromodome.com`}
                    handleClick={toggleNav}
                    rtl={rtl}
                />
                <LayoutNavbarItem
                    label={
                        translations[lang][uiStruct.ui.navmain.signout.title]
                    }
                    icon='LogOut'
                    link='/'
                    handleClick={() => console.log('hello')}
                    handleClick={toggleNav}
                    rtl={rtl}
                />
            </LayoutNavbarSidebar>
        </>
    );
};

const mapStateToProps = (state) => ({
    experienceDetails: state.experienceDetails,
    globalState: state.globalState,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            toggleLang,
            toggleNav,
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutNavbar);

const LayoutNavbarItem = ({
    label,
    icon,
    link = '/',
    handleClick = () => {},
    rtl = false,
}) => {
    return (
        <Link
            className='flex items-center px-12'
            to={link}
            onClick={() => handleClick(false)}
        >
            <div
                className={`transition duration-200 ${
                    rtl ? 'text-base' : 'text-sm'
                } rounded-lg flex flex-grow py-4 px-8 items-center text-gray-400 hover:bg-green-100 hover:text-green-600`}
            >
                <span className='mx-2 w-8'>
                    <IconsLucide icon={icon} />
                </span>

                {label}
            </div>
        </Link>
    );
};

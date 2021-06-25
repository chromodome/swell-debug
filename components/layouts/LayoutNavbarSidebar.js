import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uiStruct from 'constants/uiStruct';
import translations from 'constants/translations';
import { toggleLang, toggleNav } from 'store/actions/globalState/master';
import Icons from 'components/blocks/Icons';
import { handleRowReverse } from 'helpers/FEutils';

import Avatar from 'components/specialty/Avatar';

const LayoutNavbarSidebar = (props) => {
    const {
        toggleNav,
        globalState: { lang, user, navIsOpen },
        children,
    } = props;

    const rtl = !!translations[lang].rtl;

    return (
        <>
            <div
                style={{ zIndex: 51 }}
                className={`fixed inset-0  ${
                    navIsOpen ? '' : 'pointer-events-none'
                }`}
                onClick={() => toggleNav(!navIsOpen)}
            ></div>
            <div
                style={{ zIndex: 52 }}
                className={`fixed inset-y-0 ${
                    handleRowReverse(rtl).right
                }-0 w-full md:w-96 bg-white  shadow-images transition duration-300 ease-in-out transform ${
                    navIsOpen
                        ? 'translate-x-0'
                        : handleRowReverse(rtl).menuTranslateReverse +
                          ' pointer-events-none'
                }`}
            >
                <nav className=' flex flex-col relative flex-1 pt-28'>
                    <div className='absolute inset-x-0 top-6'>
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
                                <Avatar user={user} />
                                <div className='px-2'>{user.handle}</div>
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
                        className={`border-t border-gray-200 pt-8 ${
                            handleRowReverse(rtl).rtl
                        }`}
                    >
                        {children}
                    </div>
                </nav>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            toggleNav,
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutNavbarSidebar);

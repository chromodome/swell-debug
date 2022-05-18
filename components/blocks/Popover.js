import { Popover, Transition } from '@headlessui/react';

import { connect } from 'react-redux';
import translations from 'constants/translations';
import Icons from 'components/blocks/Icons';

import { handleRowReverse } from 'helpers/FEutils';
// import uiStruct from 'constants/uiStruct';

// const colorObj = uiStruct.ui.styles.buttons;

const PopoverButton = ({
    globalState: { lang },
    label,
    color='red',
    icon,
    // handleClick,
    children,
    // isOpen,
    // handleOpen,
    hintMain = null
}) => {
    const rtl = !!translations[lang].rtl;

    const colorClass = color;
        // ? colorObj[color] ?? colorObj.green
        // : colorObj.default;

    const gapClass = icon && label ? 'gap-2' : '';
    const popoverPos = rtl ? '' : '';
    const hintMainClass = hintMain
        ? 'md:max-w-2xl lg:max-w-4xl xl:max-w-6xl top-full'
        : 'lg:w-parent-120 top-1/2';

    return (
        <Popover className={`${handleRowReverse(rtl).rtl}`}>
            {({ open }) => (
                <>
                    <Popover.Button
                        className={` flex ${
                            handleRowReverse(rtl).flex
                        } items-center  justify-center ${gapClass} h-12 rounded-xl hover:bg-gray-900 hover:text-white w-full min-w-max focus:outline-none ${colorClass}`}
                    >
                        {icon && <Icons iName={icon} iClasses='font-normal' />}
                        <div className='font-medium'>
                            {icon ? label || '' : label || 'undefined name'}
                        </div>
                    </Popover.Button>

                    <Transition
                        as='div'
                        enter='transition ease-out duration-200'
                        enterFrom='opacity-0 translate-y-1'
                        enterTo='opacity-100 translate-y-0'
                        leave='transition ease-in duration-150'
                        leaveFrom='opacity-100 translate-y-0'
                        leaveTo='opacity-0 translate-y-1'
                    >
                        <Popover.Panel
                            className={`absolute z-50 left-1/2 w-screen-100 max-h-screen-100 md:max-h-screen-4/5 ${hintMainClass} transform -translate-y-1/2 -translate-x-1/2 ${popoverPos}`}
                        >
                            <div className='relative overflow-hidden rounded-2xl bg-white shadow-2xl-green-400 ring-1 ring-green-400 ring-opacity-5'>
                                <div
                                    className={`absolute top-3 transform  rounded-full flex z-50 ${
                                        handleRowReverse(rtl).right
                                    }-4  `}
                                >
                                    <Popover.Button
                                        className={`border-2 p-1 border-transparent rounded-full text-gray-900 opacity-30 hover:opacity-100 focus:outline-none  flex items-center justify-center`}
                                    >
                                        <Icons iName='CLOSEALT' Classes='' />
                                    </Popover.Button>
                                </div>

                                {children}
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

const PopoverBodyNS = ({ children, globalState: { lang } }) => {
    const rtl = !!translations[lang].rtl;
    return (
        <div
            className={`p-6`}
            style={rtl ? { direction: 'rtl', textAlign: 'right' } : {}}
        >
            {children}
        </div>
    );
};

const PopoverFooterDefaultNS = ({ rounded, globalState: { lang } }) => {
    const rtl = !!translations[lang].rtl;
    const rtlClass = handleRowReverse(rtl);
    return (
        <div
            className={`${rounded ? 'rounded-b-3xl' : ''} p-4 bg-gray-50 ${
                rtlClass.rtl
            }`}
        >
            <a
                href={uiStruct.ui.links.help}
                className='flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
            >
                <span className='flex items-center'>
                    <span className={`text-sm font-medium text-gray-900 `}>
                        {translations[lang][uiStruct.ui.help.need_more_help]}
                    </span>
                </span>
                <span className={`block text-sm text-gray-500`}>
                    {translations[lang][uiStruct.ui.help.konnect_academy]}
                </span>
            </a>
        </div>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState
});

const PopoverFooterDefault = connect(mapStateToProps)(PopoverFooterDefaultNS);
const PopoverBody = connect(mapStateToProps)(PopoverBodyNS);

export { PopoverFooterDefault, PopoverBody };

export default connect(mapStateToProps, null)(PopoverButton);

/* This example requires Tailwind CSS v2.0+ */

import { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

import { connect } from 'react-redux';
import translations from 'constants/translations';
import Icons from 'components/blocks/Icons';

import { handleRowReverse } from 'helpers/FEutils';
import uiStruct from 'constants/uiStruct';
import Popover, {
    PopoverBody,
    PopoverFooterDefault
} from 'components/blocks/Popover';
import { BlockHTML } from 'components/blocks/Blocks';
import { ButtonsClose } from 'components/blocks/Buttons';

// const modalRoot = document.getElementById('modal-root');

// const ModalContainer = ({
//     showModal = true,
//     handleOpen,
//     handleTransition,
//     animationCss,
//     children,
//     close,
//     icon,
//     globalState: { lang },
//     width,
//     // height,
//     help = null,
//     image = null
// }) => {
//     const rtl = !!translations[lang].rtl;

//     const sizeClass = () => {
//         if (help)
//             return `sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl w-full max-h-full`;
//         else if (image)
//             return `max-h-screen-90 xl:max-w-screen-80 xl:max-h-screen-90`;
//         else
//             return width
//                 ? 'w-full max-h-full sm:max-w-' + width
//                 : 'md:max-w-2xl lg:max-w-3xl w-full max-h-full';
//     };

//     const pillColoring = {
//         pill: help
//             ? `bg-kn-yellow`
//             : `bg-gradient-to-tr from-green-300 via-green-400 to-green-500 shadow-2xl-green-500`,
//         text: help
//             ? `text-black text-3xl`
//             : `text-transparent bg-clip-text  bg-gradient-to-tr from-gray-900 to-blue-400 mix-blend-multiply`
//     };

//     useEffect(() => {
//         handleTransition();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [showModal]);

//     return ReactDom.createPortal(
//         <>
//             <div
//                 className='z-1000 fixed h-full w-full inset-0 flex items-center justify-center'
//                 style={{ display: showModal ? '' : 'none', zindex: '9999999' }}
//                 id='xxx'
//             >
//                 {/* Overlay object} */}

//                 <div
//                     onMouseDown={handleOpen}
//                     className={`fixed inset-0 bg-modal-100 transform transition duration-300 ease-in-out ${animationCss.overlay}`}
//                 ></div>

//                 {/* The glass window */}

//                 <div
//                     className={`relative rounded-4xl bg-glass-50 shadow-cards p-4 border-2 border-glass-25 ${sizeClass()}  transform transition duration-300 ease-in-out ${
//                         animationCss.glass
//                     }`}
//                 >
//                     {/* The white window */}

//                     <div
//                         className={` relative rounded-3xl ${
//                             help ? '' : 'p-4 md:px-8 pt-8'
//                         } bg-gradient-to-b bg-white shadow-2xl-green-400`}
//                     >
//                         {close && (
//                             /* The close x button */
//                             <ButtonsClose handleClose={handleOpen} rtl={rtl} />
//                         )}

//                         {/* Pill thing */}
//                         {icon && (
//                             <div className='absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
//                                 <div
//                                     className={`w-24 h-12 flex flex-shrink-0 items-center justify-center rounded-full ${pillColoring.pill}`}
//                                 >
//                                     {/* icon with coloring and size*/}
//                                     <Icons
//                                         iName={icon.name}
//                                         iClasses={`${pillColoring.text}`}
//                                     />
//                                 </div>
//                             </div>
//                         )}

//                         {children}
//                     </div>
//                 </div>
//             </div>
//         </>,
//         modalRoot
//     );
// };

const ModalButtonNS = ({
    globalState: { lang },
    label,
    color="green",
    icon,
    handleClick,
    isDisabled = false
}) => {
    const rtl = !!translations[lang].rtl;
    // const colorObj = uiStruct.ui.styles.buttons;
    const colorClass = isDisabled
        ? 'bg-gray-200 text-gray-400 md:w-32 px-4'
        : color;
        // ? colorObj[color] ?? colorObj.green
        // : colorObj.default;

    const gapClass = icon && label ? 'gap-2' : '';

    return (
        <button
            disabled={isDisabled}
            onClick={handleClick}
            className={`flex ${
                handleRowReverse(rtl).flex
            } items-center  justify-center ${gapClass} h-12 rounded-xl ${
                !isDisabled ? 'hover:bg-gray-900 hover:text-white' : ''
            }  w-full min-w-max focus:outline-none ${colorClass}`}
        >
            {icon && (
                <Icons
                    iName={icon.name}
                    size={icon.size}
                    iClasses='font-normal'
                />
            )}
            <div className='font-medium'>
                {icon ? label || '' : label || 'undefined name'}
            </div>
        </button>
    );
};

const ModalHelpNS = ({
    isHtml,
    helpText,
    globalState: { lang },
    hintMain = null
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className='flex flex-shrink-0 flex-col-reverse sm:flex-row-reverse gap-2'>
            <Popover
                icon='QUESTION'
                color='help'
                isOpen={isOpen}
                handleOpen={toggleOpen}
                hintMain={hintMain}
            >
                {helpText && (
                    <PopoverBody>
                        {isHtml ? (
                            <BlockHTML
                                className='break-words md:break-normal px-0 sm:px-8 pt-8 text-xs sm:text-base'
                                html={helpText}
                            />
                        ) : (
                            helpText
                        )}
                    </PopoverBody>
                )}
                <PopoverFooterDefault />
            </Popover>
        </div>
    );
};

const ModalCTANS = ({ children, globalState: { lang } }) => {
    const rtl = !!translations[lang].rtl;
    return (
        <div
            className={`w-full flex flex-col justify-end sm:${
                handleRowReverse(rtl).flex
            } gap-2 sm:items-center`}
        >
            {children}
        </div>
    );
};

const ModalFooterNS = ({ children, globalState: { lang } }) => {
    const rtl = !!translations[lang].rtl;
    return (
        <div
            className={`flex flex-col gap-2 justify-between sm:${
                handleRowReverse(rtl).flex
            } sm:items-center`}
        >
            {children}
        </div>
    );
};

const ModalBodyNS = ({
    rtlOff,
    height,
    maxheight,
    minheight,
    children,
    globalState: { lang }
}) => {
    // const sizeClass = `${height ? 'min-h-max h-' + height : 'min-h-max h-24'}`;
    const maxClass = `${
        maxheight
            ? 'overflow-y-scroll max-h-screen-1/2 sm:max-h-screen-' + maxheight
            : ''
    }`;
    const rtl = !!translations[lang].rtl;
    const editorClassRtl = rtlOff ? '' : handleRowReverse(rtl).rtl;
    return (
        <div className='pb-6'>
            <div className={`${editorClassRtl} ${maxClass}`}>{children}</div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState
});

const ModalButton = connect(mapStateToProps)(ModalButtonNS);
// const ModalBody = connect(mapStateToProps)(ModalBodyNS);
// const ModalFooter = connect(mapStateToProps)(ModalFooterNS);
// const ModalCTA = connect(mapStateToProps)(ModalCTANS);
// const ModalHelp = connect(mapStateToProps)(ModalHelpNS);

// export { ModalButton, ModalBody, ModalFooter, ModalCTA, ModalHelp };

export { ModalButton };
// export default connect(mapStateToProps, null)(ModalContainer);

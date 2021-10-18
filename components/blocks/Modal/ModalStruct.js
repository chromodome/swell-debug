/* This example requires Tailwind CSS v2.0+ */

import { useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import Icons from '../Icon/Icons';

const ModalStruct = ({
    showModal = true,
    handleOpen,
    handleTransition,
    animationCss,
    children,
    size = 'w-full max-w-3xl h-64',
    rounded = 'rounded-none md:rounded-2xl',
    padding = 'px-4 py-4 md:py-12 md:px-12',
    overlayColor = 'bg-modal-100',
    bgColor = 'bg-white',
    shadow = 'shadow-none md:shadow-cards',
    close
}) => {
    const modalRoot = document.getElementById('modal-root');

    useEffect(() => {
        handleTransition();
    }, [showModal]);

    return ReactDom.createPortal(
        <>
            <div
                className="z-1000 fixed h-full w-full inset-0 flex items-center justify-center"
                style={{ display: showModal ? '' : 'none', zindex: '9999999' }}
                id="xxx">
                {/* Overlay object} */}

                <div
                    onMouseDown={handleOpen}
                    className={`fixed inset-0 ${overlayColor} transform transition duration-300 ease-in-out ${animationCss.overlay}`}></div>

                {/* The glass window */}

                <div
                    className={`relative ${padding} ${rounded} ${bgColor} ${size} w-full  h-full md:h-auto min-h-screen md:min-h-0  ${shadow} transform transition-all duration-300 ease-in-out ${animationCss.glass}`}>
                    {/* The white window */}

                    {close && (
                        /* The close x button */
                        <Buttons__Close handleClose={handleOpen} />
                    )}

                    {children}
                </div>
            </div>
        </>,
        modalRoot
    );
};

const Buttons__Close = ({ rtl = false, handleClose, type = 'normal' }) => {
    const posClass = {
        normal: {
            pos: `top-3 right-4 `,
            btn: 'p-1 text-gray-900 opacity-30 hover:opacity-100'
        }
    };
    return (
        <div
            className={`absolute transform ${posClass[type].pos}  rounded-full flex z-50  `}>
            <button
                onClick={handleClose}
                className={`border-2  border-transparent rounded-full ${posClass[type].btn}  focus:outline-none  flex items-center justify-center`}>
                <Icons iName="CLOSEALT" size="xl" iClasses="" />
            </button>
        </div>
    );
};

export default ModalStruct;

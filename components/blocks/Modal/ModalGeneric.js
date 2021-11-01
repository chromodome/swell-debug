/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react';

import ModalStruct from './ModalStruct';

import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const animationCSS = {
    off: {
        glass: 'opacity-0 scale-90',
        overlay: 'opacity-0'
    },
    on: {
        glass: 'opacity-100 scale-100',
        overlay: 'opacity-90'
    }
};

function ModalGeneric({
    auth,
    size,
    close,
    setModalIsOpen,
    handleActionBtn,
    children
}) {
    const targetElement = document.querySelector('#root');
    const [transitionState, setTransitionState] = useState('off');
    useEffect(() => {
        if (auth.isAuthenticated == true && auth.isProfile == true)
            handleTransitionStateOff();
    }, [auth.loading]);

    // Prevent BG from scrolling
    useEffect(() => {
        disableBodyScroll(targetElement, { reserveScrollBarGap: true });

        return () => {
            clearAllBodyScrollLocks();
        };
    }, []);

    // Handle When Modal is loaded
    const handleTransitionStateOn = () => {
        setTransitionState('on');
    };

    // Handle When Modal is about to unload (trigger animation then change modal state)
    const handleTransitionStateOff = () => {
        setTransitionState('off');
        setTimeout(() => setModalIsOpen(false), 300);
    };

    ///////////////////////////////////////////////////////////////////

    const handleActionClick = () => {
        handleActionBtn();
        handleTransitionStateOff(); // important... don't forget to add it in all modals
    };

    return (
        <>
            <ModalStruct
                size={size}
                handleOpen={handleTransitionStateOff}
                handleTransition={handleTransitionStateOn}
                animationCss={animationCSS[transitionState]}
                close={close}>
                {children}
            </ModalStruct>
        </>
    );
}

export default ModalGeneric;

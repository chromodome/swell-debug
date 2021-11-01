import React, { useState, useEffect, useCallback } from 'react';
// import { useLightbox } from 'simple-react-lightbox';
// import { SRLWrapper } from 'simple-react-lightbox';
// import { lightBoxOptions } from '@/constants/lightboxOptions';
import { connect } from 'react-redux';
import CarouselContainer from './CarouselContainer';

const CarouselWithLightbox = ({ slides }) => {
    // const { openLightbox, closeLightbox } = useLightbox();
    const expImages = slides.map((singleImage) => {
        return {
            type: singleImage.type,
            src: singleImage.url + '-/preview/-/quality/lightest/',
            thumbnail: singleImage.url + '-/preview/80x80/',
            caption: singleImage.caption
        };
    });

    const lightBoxHandler = (imageIndex) => {
        // openLightbox(imageIndex);
    };

    return (
        <>
            {/* <SRLWrapper elements={slides} options={lightBoxOptions} /> */}
            <CarouselContainer
                slides={expImages}
                handleActionBtn={lightBoxHandler}
            />
        </>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState
});

export default connect(mapStateToProps)(CarouselWithLightbox);

import React, { useState, useEffect, useCallback } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
// import 'styles/embla.css';
// import ImageModal from 'components/modals/ImageModal';
import { connect } from 'react-redux';
import { Buttons__GroupNextPrev } from '@/components/blocks/Button/Buttons';
// import { youtubeCode, galleryVidtType } from 'constants/experienceDetailConsts';

const CarouselContainer = ({ slides, handleActionBtn, scroll = 1 }) => {
    const [viewportRef, embla] = useEmblaCarousel({
        dragFree: true,
        slidesToScroll: 1,
        align: 'start',
        skipSnaps: true,
        containScroll: 'trimSnaps'
    });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
    const onSelect = useCallback(() => {
        if (!embla) return;
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);

    useEffect(() => {
        if (!embla) return;
        embla.on('select', onSelect);
        onSelect();
    }, [embla, onSelect, slides]);

    useEffect(() => {
        if (!embla) return;
        embla.reInit();
        onSelect();
    }, [slides]);

    const openSesame = (slideIndex) => {
        handleActionBtn(slideIndex);
    };
    // console.log('slides', slides);
    // const expImages = slides.map((singleImage) => {
    //     return {
    //         type: singleImage.type,
    //         src: singleImage.url + '-/preview/-/quality/lightest/',
    //         thumbnail: singleImage.url + '-/preview/80x80/',
    //         caption: singleImage.caption
    //     };
    // });
    // console.log('expslides', expImages);

    return (
        <div className="relative max-w-6xl mx-auto pt-12 xl:pt-0 touch:pt-8 gallery-sm">
            <div className="mb-8 h-8 touch:hidden">
                <Buttons__GroupNextPrev
                    nextEnabled={nextBtnEnabled}
                    nextAction={scrollNext}
                    prevEnabled={prevBtnEnabled}
                    prevAction={scrollPrev}
                    // isPrev={!prevBtnState}
                    className={`z-30 touch:hidden`}
                    // rtl={rtl}
                />
            </div>
            <div className="embla__viewport" ref={viewportRef}>
                <div className="embla__container">
                    {slides.map((slide, index) => (
                        <div
                            className="embla__slide x4 md:x4 lg:x6"
                            key={slide.src}
                            onClick={null}>
                            <div className="embla__slide__inner h-32">
                                <img
                                    className="object-cover rounded-md lg:rounded-lg overflow-hidden w-full h-full"
                                    src={`${slide.src}-/scale_crop/240x240/smart_objects_faces_points/`}
                                    alt={slide.caption}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* {isOpen && (
                <ImageModal
                    edit={edit}
                    setModalIsOpen={setIsOpen}
                    handleActionBtn={handleActionBtn}
                    slide={slides[selectedSlide]}
                    galleryVidtType={galleryVidtType}
                    hintObj={''}
                />
            )} */}
        </div>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState
});

export default connect(mapStateToProps)(CarouselContainer);

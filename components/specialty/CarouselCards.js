import React, { useState, useEffect, useCallback } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import { Buttons__GroupNextPrev } from '@/blocks/Buttons';

const CarouselCards = ({ children, scrollSlides = 5, loop = false }) => {
    const [viewportRef, embla] = useEmblaCarousel({
        slidesToScroll: scrollSlides,
        skipSnaps: false,
        loop: loop,
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
    }, [embla, onSelect]);

    return (
        <div className=''>
            <div className=''>
                <Buttons__GroupNextPrev
                    nextEnabled={nextBtnEnabled}
                    nextAction={scrollNext}
                    prevEnabled={prevBtnEnabled}
                    prevAction={scrollPrev}
                    // isPrev={!prevBtnState}
                    className={`z-50 touch:hidden`}
                    // rtl={rtl}
                />
            </div>

            <div className='embla'>
                <div className='embla__viewport' ref={viewportRef}>
                    <div className='embla__container'>
                        {/* {slides.map((index) => (
                            <div className='embla__slide' key={index}>
                                <div className='embla__slide__inner'>
                                    <img
                                        className='embla__slide__img'
                                        src={mediaByIndex(index)}
                                        alt='A cool cat.'
                                    />
                                </div>
                            </div>
                        ))} */}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarouselCards;

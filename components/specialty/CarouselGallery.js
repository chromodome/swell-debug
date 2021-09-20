import React, { useState, useEffect, useCallback } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import { Buttons__GroupNextPrev } from '@/blocks/Button/Buttons';

const CarouselGallery = ({ slides, scrollSlides = 5, loop = false }) => {
    const [viewportRef, embla] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        slidesToScroll: scrollSlides,
        dragFree: true,
        loop: loop
        // slidesToScroll: scrollSlides,
        // skipSnaps: false,
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
        <div className="">
            <div className="">
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

            <div className="embla">
                <div className="embla__viewport" ref={viewportRef}>
                    <div className="embla__container">
                        {slides.map((slide, index) => (
                            <div className="embla__slide_gallery" key={index}>
                                <div className="embla__slide__inner">
                                    {slide.type == 'img' ? (
                                        <img
                                            className="embla__slide__img"
                                            src={slide.data}
                                        />
                                    ) : (
                                        <>nothing to show</>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarouselGallery;

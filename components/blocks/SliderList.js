import React, { useState, useEffect } from 'react';
import CarouselCards from '@/specialty/CarouselCards';
import SectionTitle from '@/blocks/Title/SectionTitle';
import { getSlidesPerBp } from '@/helpers/responsive';
import debounce from '@/helpers/debounce';

const SliderList = ({
    section,
    children,
    breakPoints,
    boxed,
    classes,
    padding = 'px-5a md:px-9a lg:px-12a xl:px-24a 2xl:px-40a ',
    margins = 'mt-20 mb-4 md:mt-24 md:mb-4 d-hdpi-2:mb-vw-4 d-hdpi-2:mt-vw-24',
    dataLoading,
    loop,
    useRow,
    randomStart
}) => {
    const [slidesPerBp, setSlidesPerBp] = useState(getSlidesPerBp(breakPoints));

    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setSlidesPerBp(getSlidesPerBp(breakPoints));
        }, 1000);

        window.addEventListener('resize', debouncedHandleResize);

        return (_) => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    }, []);

    return (
        <>
            <div
                className={`overflow-x-hidden z-100  ${margins} mx-auto ${padding} ${classes}`}>
                {section && (
                    <SectionTitle
                        section={section}
                        className="mb-4 md:mb-0"
                        // padding=""
                    />
                )}
                {!dataLoading ? (
                    <div>
                        <CarouselCards
                            loop={loop}
                            randomStart={randomStart}
                            scrollSlides={slidesPerBp}
                            useRow={useRow}>
                            {children}
                        </CarouselCards>
                    </div>
                ) : (
                    children
                )}
            </div>
        </>
    );
};

export default SliderList;

SliderList.defaultProps = {
    breakPoints: {
        default: { width: 320, slides: 2 },
        sm: { width: 640, slides: 2 },
        md: { width: 768, slides: 3 },
        lg: { width: 1024, slides: 4 },
        xl: { width: 1280, slides: 5 }
    }
};

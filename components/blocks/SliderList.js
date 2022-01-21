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
    padding = 'px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40',
    margins = 'mt-24 mb-12',
    dataLoading
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
                {section && <SectionTitle section={section} />}
                {!dataLoading ? (
                    <div>
                        <CarouselCards scrollSlides={slidesPerBp}>
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

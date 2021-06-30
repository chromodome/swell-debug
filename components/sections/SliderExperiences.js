import ResultCard from '@/blocks/ResultCard';
import SliderList from '@/blocks/SliderList';

const breakPoints = {
    default: { width: 320, slides: 2 },
    sm: { width: 640, slides: 2 },
    md: { width: 768, slides: 3 },
    lg: { width: 1024, slides: 4 },
    xl: { width: 1280, slides: 5 },
};

const SliderExperiences = ({ sectionTitles, data }) => {
    return (
        <>
            <SliderList breakPoints={breakPoints} section={sectionTitles}>
                {data.map((item) => {
                    return (
                        <ResultCard
                            key={item.id}
                            data={item}
                            containerClass='embla__slide x2 md:x3 lg:x4 xl:x5'
                        />
                    );
                })}
            </SliderList>
        </>
    );
};

export default SliderExperiences;

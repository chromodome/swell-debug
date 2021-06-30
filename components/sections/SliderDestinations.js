import TagCard from '@/blocks/TagCard';
import SliderList from '@/blocks/SliderList';

const breakPoints = {
    default: { width: 320, slides: 2 },
    sm: { width: 640, slides: 2 },
    md: { width: 768, slides: 4 },
    lg: { width: 1024, slides: 5 },
    xl: { width: 1280, slides: 7 },
};

const SliderDestinations = ({ sectionTitles, data }) => {
    return (
        <>
            <SliderList breakPoints={breakPoints} section={sectionTitles}>
                {data.map((item) => {
                    return (
                        <TagCard
                            key={item.id}
                            data={item}
                            containerClass='embla__slide x2 md:x4 lg:x5 xl:x7'
                        />
                    );
                })}
            </SliderList>
        </>
    );
};

export default SliderDestinations;

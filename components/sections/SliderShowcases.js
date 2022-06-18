import SliderList from '@/blocks/SliderList';
import TagCardSkeleton from '@/blocks/Card/TagCardSkeleton';
import Showcase from './Showcase';

const breakPoints = {
    default: { width: 320, slides: 1 },
    sm: { width: 640, slides: 1 },
    md: { width: 768, slides: 1 },
    lg: { width: 1024, slides: 1 },
    xl: { width: 1280, slides: 1 }
};

const skeletonArray = [1, 2, 3, 4, 5, 6];

const SliderShowcases = ({
    sectionTitles,
    data,
    dataLoading = false,
    classes,
    margins = 'mt-0 mb-0 lg:mt-0 lg:mb-0'
}) => {
    return (
        <>
            <SliderList
                classes={classes}
                randomStart={true}
                useRow={true}
                loop={true}
                margins={margins}
                padding="py-4 d-hdpi-2:py-vw-4"
                breakPoints={breakPoints}
                section={sectionTitles}
                dataLoading={dataLoading}>
                {!dataLoading ? (
                    data.map((item, index) => {
                        return (
                            <div
                                className="embla__slide x1"
                                key={`showcase_${item.id}_${index}`}>
                                <Showcase pill="top" data={item} />
                            </div>
                        );
                    })
                ) : (
                    <div className="flex gap-4 mt-9 d-hdpi-2:mt-vw-8">
                        {skeletonArray.map((item, index) => (
                            <TagCardSkeleton
                                key={`sk_${index}`}
                                containerClass="embla__slide x2 md:x4 lg:x5 xl:x7"
                            />
                        ))}
                    </div>
                )}
            </SliderList>
        </>
    );
};

export default SliderShowcases;

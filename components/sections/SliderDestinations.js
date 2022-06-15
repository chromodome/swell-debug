import TagCard from '@/blocks/Card/TagCard';
import SliderList from '@/blocks/SliderList';
import TagCardSkeleton from '@/blocks/Card/TagCardSkeleton';

const breakPoints = {
    default: { width: 320, slides: 2 },
    sm: { width: 640, slides: 2 },
    md: { width: 768, slides: 4 },
    lg: { width: 1024, slides: 5 },
    xl: { width: 1280, slides: 7 }
};

const skeletonArray = [1, 2, 3, 4, 5, 6];

const SliderDestinations = ({
    sectionTitles,
    data,
    dataLoading = false,
    classes,
    margins = 'mt-8 mb-0 lg:mt-8 lg:mb-0',
    tagMargins = 'mt-3 lg:mt-4 ',
    tagPadding = 'px-2 lg:px-2 pb-12',
    tagRatio = 'portrait',
    world = true
}) => {
    return (
        <>
            <SliderList
                classes={classes}
                margins={margins}
                breakPoints={breakPoints}
                section={sectionTitles}
                dataLoading={dataLoading}>
                {world && (
                    <TagCard
                        overrideData={{ linkName: 'world', name: 'The World' }}
                        containerClass="embla__slide x2 md:x4 lg:x5 xl:x7"
                        type=""
                        padding={tagPadding}
                        margins={tagMargins}
                        preset={tagRatio}
                    />
                )}
                {!dataLoading ? (
                    data.map((item, index) => {
                        return (
                            <TagCard
                                key={`dest_${item.id}_${index}`}
                                data={item}
                                containerClass="embla__slide x2 md:x4 lg:x5 xl:x7"
                                type=""
                                linkName="slug"
                                padding={tagPadding}
                                margins={tagMargins}
                                preset={tagRatio}
                            />
                        );
                    })
                ) : (
                    <div className="flex gap-4 mt-9">
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

export default SliderDestinations;

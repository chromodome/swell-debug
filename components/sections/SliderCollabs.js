import CollabCard from '@/blocks/Card/CollabCard';
import SliderList from '@/blocks/SliderList';
import TagCardSkeleton from '@/blocks/Card/TagCardSkeleton';

const breakPoints = {
    default: { width: 320, slides: 1 },
    sm: { width: 640, slides: 1 },
    md: { width: 768, slides: 3 },
    lg: { width: 1024, slides: 3 },
    xl: { width: 1280, slides: 4 }
};

const skeletonArray = [1, 2, 3, 4, 5, 6];

const SliderCollabs = ({ data, dataLoading }) => {
    return (
        <>
            <SliderList
                breakPoints={breakPoints}
                padding="px-8 md:px-8 lg:px-20 xl:px-64"
                margins=""
                // section={sectionTitles}
                dataLoading={dataLoading}>
                {!dataLoading ? (
                    data?.map((item, index) => {
                        return (
                            <CollabCard
                                key={`collab_${item.id}_${index}`}
                                data={item}
                                containerClass="embla__slide x1 md:x3 lg:x3 xl:x4"
                                type=""
                            />
                        );
                    })
                ) : (
                    <div className="flex gap-4 mt-9">
                        {skeletonArray.map((item, index) => (
                            <TagCardSkeleton
                                key={`collab_sk_${index}`}
                                containerClass="embla__slide x2 md:x3 lg:x3 xl:x5"
                            />
                        ))}
                    </div>
                )}
            </SliderList>
        </>
    );
};

export default SliderCollabs;

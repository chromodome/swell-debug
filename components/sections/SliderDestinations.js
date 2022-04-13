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

const SliderDestinations = ({ sectionTitles, data, dataLoading=false }) => {
    console.log('destination', data)
    return (
        <>
            <SliderList
                breakPoints={breakPoints}
                section={sectionTitles}
                dataLoading={dataLoading}>
                {!dataLoading ? (
                    data.map((item, index) => {
                        return (
                            <TagCard
                                key={`dest_${item.id}_${index}`}
                                data={item}
                                containerClass="embla__slide x2 md:x4 lg:x5 xl:x7"
                                type=""
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

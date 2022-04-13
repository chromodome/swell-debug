import { Pill__Logo } from '../blocks/Pills';
import CollectionCard from '@/blocks/Card/CollectionCard';
import SliderList from '@/blocks/SliderList';

const breakPoints = {
    default: { width: 320, slides: 1 },
    sm: { width: 640, slides: 1 },
    md: { width: 768, slides: 2 },
    lg: { width: 1024, slides: 2 },
    xl: { width: 1280, slides: 3 }
};

const SliderCollections = ({ sectionTitles, data, boxed=false }) => {
    return (
        <div className={`w-full relative pt-1`}>
            <div
                style={{ zIndex: '-50' }}
                className="z-1 absolute inset-0 overflow-hidden bg-cyan-100 opacity-100">
                <img
                    data-blink-src="https://ucarecdn.com/a2d79e9e-1fd3-443a-b0d2-df3ac26dd79c/photo14436949100043567042689f5.jpg"
                    className="object-cover w-full h-full filter blur-2xl transform scale-110"
                />
            </div>
            <div
                style={{ zIndex: '-49' }}
                className="absolute inset-0 bg-glass-100 opacity-50"></div>
            <div
                className={`absolute z-50 top-0 -translate-y-1/2                           
                    left-1/2 transform -translate-x-1/2`}>
                <Pill__Logo />
            </div>

            <SliderList breakPoints={breakPoints} section={sectionTitles} boxed={boxed}>
                {data.map((item, index) => {
                    return (
                        <CollectionCard
                            key={`coll_${item.id}_${index}`}
                            data={item}
                            containerClass="embla__slide x1 md:x2 lg:x2 xl:x3"
                        />
                    );
                })}
            </SliderList>
        </div>
    );
};

export default SliderCollections;

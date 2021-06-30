import { Pill__Logo, Pill__Experience } from '../blocks/Pills';
import * as data from 'mockdata/featured.json';

const featured = data.featured[0];

const {
    type,
    label,
    title,
    subtitle,
    description,
    author,
    image,
    bgimage,
    url,
} = featured;

const FeaturedContent = ({ children, pill }) => {
    return (
        <div className={`w-full h-128 bg-gray-400 relative`}>
            <div className='absolute inset-0 overflow-hidden bg-cyan-100'>
                <img
                    data-blink-src={bgimage}
                    className='object-cover w-full h-full filter blur-2xl opacity-50'
                />
            </div>
            <div
                className={`absolute z-50 top-0 -translate-y-1/2                           
                    left-1/2 transform -translate-x-1/2`}
            >
                <Pill__Logo />
            </div>
            <div
                className={`absolute z-50 bottom-0 translate-y-1/2                           
                    left-1/2 transform -translate-x-1/2`}
            >
                <Pill__Experience label='digital experience' />
            </div>
        </div>
    );
};

export default FeaturedContent;

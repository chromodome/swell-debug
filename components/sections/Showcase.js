import { Pill__Logo, Pill__Experience } from '@/blocks/Pills';

import ButtonCard from '@/blocks/Button/ButtonCard';
import { randomItem } from '@/helpers/FEutils';
import Avatar from 'components/specialty/Avatar';
import Link from 'next/link';
import KreatorBadgeStatic from '../blocks/KreatorBadgeStatic';
import KreatorBadgeStaticFlat from '../blocks/KreatorBadgeStaticFlat';

const Showcase = ({
    profile,
    data,
    children,
    pill,
    dataLoading = false,
    collection = 'experience'
}) => {
    const dark = !!data?.dark_theme;
    const blur =
        collection != 'showcase' ? 'filter blur-2xl transform scale-110' : '';
    const overlay =
        collection != 'showcase' ? (
            <div
                // style={{ zIndex: '-49' }}
                className={`absolute inset-0 ${
                    dark ? 'bg-gray-600 opacity-50' : 'bg-glass-100 opacity-50'
                }`}></div>
        ) : null;
    return !dataLoading ? (
        <div
            className={`w-full md:h-128 relative flex justify-between flex-col-reverse md:flex-row`}>
            {/* div that will house bg + overlay */}
            <div className="absolute inset-0 bg-gray-200 overflow-hidden">
                <img
                    src={data.image}
                    //  src={`${data.image}-/preview/300x300/`}
                    className={` object-cover w-full h-full ${
                        dark ? 'brightness-50' : 'opacity-50'
                    } ${blur} `}
                />
                {overlay}
            </div>

            {pill ? (
                <div
                    className={`absolute z-100 ${
                        pill == 'top'
                            ? 'top-0 -translate-y-1/2'
                            : 'bottom-0 translate-y-1/2'
                    }                        
                    left-1/2 transform -translate-x-1/2`}>
                    <Pill__Logo />
                </div>
            ) : null}
            {collection == 'experience' && data.blackPill && (
                <div
                    className={`absolute z-100 bottom-0 translate-y-1/2                           
                    left-1/2 transform -translate-x-1/2`}>
                    <Pill__Experience label={data.blackPillTxt} />
                </div>
            )}
            {true && (
                <div
                    className={`z-100 mb-12 px-5 md:px-9 lg:px-12 xl:pl-24 xl:pr-12 2xl:pl-40 2xl:pr-20 w-full md:w-1/2 flex-none`}>
                    <div className={`z-100 px-4 mt-8 md:mt-20 `}>
                        {!children ? (
                            <>
                                {data?.username && (
                                    <>
                                        <KreatorBadgeStatic
                                            author={data.user_id}
                                        />
                                    </>
                                )}

                                <div
                                    className={`inline-flex ${
                                        dark
                                            ? 'text-green-400'
                                            : 'text-green-500'
                                    } font-bold text-2xl lg:text-3xl tracking-tight leading-tight flex-shrink-0 flex-initial mb-2`}>
                                    {data.title}
                                </div>
                                <div
                                    className={`${
                                        dark ? 'text-white' : 'text-gray-800'
                                    } mt-2 text-xl md:text-2xl lg:text-4xl md:font-bold lg:leading-tight mb-8 whitespace-normal`}>
                                    {data.headline}
                                </div>
                                {data.description && (
                                    <div
                                        className={`${
                                            dark
                                                ? 'text-white'
                                                : 'text-gray-800'
                                        } text-base mb-8`}
                                        dangerouslySetInnerHTML={{
                                            __html: data.description
                                        }}
                                    />
                                )}

                                {data.button && (
                                    <ButtonCard
                                        url={data.url}
                                        icon={'las la-arrow-right'}
                                        label={data.label}
                                        darkMode={dark}
                                    />
                                )}
                            </>
                        ) : (
                            children
                        )}
                    </div>
                </div>
            )}
            {collection != 'showcase' && (
                <div className="z-50 flex-none md:w-1/2 h-64 md:h-full overflow-hidden ">
                    <img
                        alt="Placeholder"
                        className="rounded-b-2xl object-cover w-full h-full transform md:rounded-l-full md:scale-150 md:translate-x-1/4"
                        src={data.image}
                    />
                </div>
            )}
        </div>
    ) : (
        <div
            className={`w-full h-128 relative pt-1 bg-gray-300 animate-pulse`}></div>
    );
};

export default Showcase;

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
            className={`w-full lg:h-128 d-hdpi-2:h-vw-128 relative flex justify-between flex-col-reverse lg:flex-row`}>
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
                    className={`z-100 mb-12 px-5 lg:px-9 lg:px-12 xl:pl-24 xl:pr-12 2xl:pl-40 2xl:pr-20 d-hdpi-2:pl-vw-40 d-hdpi-2:pr-vw-20  w-full lg:w-1/2 flex-none`}>
                    <div
                        className={`z-100 px-4 mt-8 lg:mt-20 d-hdpi-2:px-vw-4 d-hdpi-2:mt-vw-20`}>
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
                                    } font-bold text-2xl lg:text-3xl d-hdpi-2:text-vw-3xl tracking-tight leading-tight flex-shrink-0 flex-initial mb-2 d-hdpi-2:mb-vw-2`}>
                                    {data.title}
                                </div>
                                <div
                                    className={`${
                                        dark ? 'text-white' : 'text-gray-800'
                                    } mt-2 text-xl lg:text-2xl lg:text-4xl d-hdpi-2:text-vw-4xl lg:font-bold lg:leading-tight mb-8 d-hdpi-2:mb-vw-8 whitespace-normal`}>
                                    {data.headline}
                                </div>
                                {data.description && (
                                    <div
                                        className={`${
                                            dark
                                                ? 'text-white'
                                                : 'text-gray-800'
                                        } text-base d-hdpi-2:text-vw-base mb-8 d-hdpi-2:mb-vw-8`}
                                        dangerouslySetInnerHTML={{
                                            __html: data.description
                                        }}
                                    />
                                )}

                                {data.button && (
                                    <ButtonCard
                                        url={data.url}
                                        icon={
                                            'las la-arrow-right d-hdpi-2:mt-vw-0.5'
                                        }
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
                <>
                    <div
                        className="hidden lg:block z-50 flex-none lg:w-1/2 h-64 lg:h-full overflow-hidden rounded-l-fulla "
                        style={{ borderRadius: '100px 0 0 100px' }}>
                        <img
                            alt="Placeholder"
                            className="object-cover d-hdpi-2:object-right lg:object-right w-full h-full transform lg:rounded-l-fulla lg:scale-150a 2xl:translate-x-0 "
                            src={data.image}
                        />
                    </div>
                    <div className=" lg:hidden z-50 flex-none lg:w-1/2 h-64 lg:h-full overflow-hidden rounded-b-2xl">
                        <img
                            alt="Placeholder"
                            className="rounded-b-2xl object-cover lg:object-right w-full h-full transform lg:rounded-l-fulla lg:scale-150a lg:translate-x-0"
                            src={data.image}
                        />
                    </div>
                </>
            )}
        </div>
    ) : (
        <div
            className={`w-full h-128 d-hdpi-2:h-vw-128 relative pt-1 d-hdpi-2:pt-vw-1 bg-gray-300 animate-pulse`}></div>
    );
};

export default Showcase;

import { Pill__Logo, Pill__Experience } from '@/blocks/Pills';

import ButtonCard from '@/blocks/Button/ButtonCard';
import { randomItem } from '@/helpers/FEutils';
import Avatar from 'components/specialty/Avatar';
import Link from 'next/link';
import KreatorBadgeStatic from '../blocks/KreatorBadgeStatic';

const Showcase = ({
    data,
    children,
    pill,
    dataLoading=false,
    collection = 'experience'
}) => {
    // const {
    //     label,
    //     title,
    //     subtitle,
    //     description,
    //     author,
    //     btn,
    //     bgImage,
    //     darkMode
    // } = data;

    const dark = !!data?.dark_theme;
    const blur =
        collection != 'showcase' ? 'filter blur-2xl transform scale-110' : '';
    const overlay =
        collection != 'showcase' ? (
            <div
                style={{ zIndex: '-49' }}
                className={`absolute inset-0 ${
                    dark ? 'bg-gray-600 opacity-50' : 'bg-glass-100 opacity-50'
                }`}></div>
        ) : null;
    return !dataLoading ? (
        <div className={`w-full h-128 relative pt-1`}>
            <div
                style={{ zIndex: '-50' }}
                className="z-1 absolute inset-0 overflow-hidden bg-gray-200">
                <img
                    src={data.image}
                  //  src={`${data.image}-/preview/300x300/`}
                    className={`object-cover w-full h-full ${
                        dark ? 'brightness-50' : ''
                    } ${blur} `}
                />
            </div>
            {overlay}
            {collection != 'showcase' && (
                <div
                    style={{ zIndex: '51' }}
                    className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="z-50 w-full h-196  overflow-hidden absolute -right-1/3 top-1/2 transform translate-x-24 -translate-y-1/2 rounded-l-full ">
                        <img
                            alt="Placeholder"
                            className="object-cover w-full h-full  transform scale-75 -translate-x-1/4"
                            src={data.image}
                        />
                    </div>
                </div>
            )}
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
            <div
                className={`z-100 mb-12 mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40`}>
                <div className={`z-100 px-4 mt-20`}>
                    {data.username && (
                        <>
                            <KreatorBadgeStatic author={data?.user_id} />
                        </>
                    )}
                    <div
                        className={`inline-flex ${
                            dark ? 'text-green-400' : 'text-green-500'
                        } font-bold text-3xl tracking-tight  leading-none flex-shrink-0 flex-initial mb-2`}>
                        {data.title}
                    </div>
                    <div
                        className={`${
                            dark ? 'text-white' : 'text-gray-800'
                        } mt-2 text-4xl font-bold w-128 leading-none mb-8`}>
                        {data.headline}
                    </div>
                    {data.description && (
                        <div
                            className={`${
                                dark ? 'text-white' : 'text-gray-800'
                            } text-base w-128  mb-8`}
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
                </div>
            </div>
        </div>
    ) : (
        <div
            className={`w-full h-128 relative pt-1 bg-gray-300 animate-pulse`}></div>
    );
};

export default Showcase;

import { Pill__Logo, Pill__Experience } from '@/blocks/Pills';

import ButtonCard from '@/blocks/Button/ButtonCard';

const Showcase = ({ data, children, pill }) => {
    const {
        collection,
        label,
        title,
        subtitle,
        description,
        author,
        btn,
        bgImage,
        darkMode
    } = data;

    const dark = !!darkMode;
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
    return (
        <div className={`w-full h-128 relative pt-1`}>
            <div
                style={{ zIndex: '-50' }}
                className="z-1 absolute inset-0 overflow-hidden bg-cyan-100 opacity-100">
                <img
                    data-blink-src={bgImage}
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
                            src={bgImage}
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
            {collection == 'experience' && (
                <div
                    className={`absolute z-100 bottom-0 translate-y-1/2                           
                    left-1/2 transform -translate-x-1/2`}>
                    <Pill__Experience label={label} />
                </div>
            )}
            <div
                className={`z-100 mb-12 mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40`}>
                <div className={`z-100 px-4 mt-20`}>
                    {author && (
                        <div
                            className={`${
                                dark ? 'text-white' : 'text-gray-800'
                            } text-base mb-8 flex items-center `}>
                            <div className="rounded-full bg-green-400 h-8 flex items-center text-gray-900 text-xs font-bold shadow-2xl-green-500">
                                <img
                                    src={author.avatar}
                                    className="object-cover rounded-full w-8 h-8 -mr-3"
                                    alt=""
                                />

                                <span className="px-6">@{author.handle}</span>
                            </div>
                        </div>
                    )}
                    <div
                        className={`inline-flex ${
                            dark ? 'text-green-400' : 'text-green-500'
                        } font-bold text-3xl tracking-tight  leading-none flex-shrink-0 flex-initial mb-2`}>
                        {title}
                    </div>
                    <div
                        className={`${
                            dark ? 'text-white' : 'text-gray-800'
                        } mt-2 text-4xl font-bold w-128 leading-none mb-8`}>
                        {subtitle}
                    </div>
                    {description && (
                        <div
                            className={`${
                                dark ? 'text-white' : 'text-gray-800'
                            } text-base w-128  mb-8`}>
                            {description}
                        </div>
                    )}

                    {btn && (
                        <ButtonCard
                            url={btn.url}
                            icon={btn.icon}
                            label={btn.label}
                            darkMode={dark}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Showcase;

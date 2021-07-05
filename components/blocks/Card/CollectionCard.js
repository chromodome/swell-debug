import React from 'react';
import Link from 'next/link';
import ButtonCard from '@/blocks/Button/ButtonCard';

const CollectionCard = ({
    data: { name, url, image, descriptionShort, direction = 'vertical' },
    containerClass
}) => {
    return (
        <div className={`my-3 pb-16 px-2 lg:my-4 lg:px-2 ${containerClass} `}>
            <div className="overflow-hidden rounded-xl group relative shadow-2xl-green-600 ring-4 ring-transparent hover:ring-opacity-80 hover:ring-white transition-all hover:shadow-6xl-green-center duration-300 ease-in-out">
                <img
                    alt="Placeholder"
                    className="transform scale-110 object-cover filter blur-lg brightness-50 w-full h-40 xs360:h-44 xs390:h-52 xs410:h-56 sm:h-64 md:h-64 lg:h-64 xl:h-80 2xl:h-80"
                    data-blink-src={image}
                />
                {direction == 'vertical' ? (
                    <img
                        alt="Placeholder"
                        className=" absolute right-8 bottom-0 top-0 transform translate-x-1/4 translate-y-16 rounded-t-full object-cover w-2/3 h-full"
                        data-blink-src={image}
                    />
                ) : (
                    <img
                        alt="Placeholder"
                        className="absolute -right-1/3 bottom-0 top-20 transform rounded-l-full object-cover w-full h-full"
                        data-blink-src={image}
                    />
                )}
                <div className="absolute flex flex-col left-4 right-4 top-8 text-white px-6 py-2">
                    <div className="text-2xl font-bold">{name}</div>
                    <div className="flex text-sm w-1/2 ">
                        {descriptionShort}
                    </div>
                </div>
                <ButtonCard
                    pagelink={url}
                    icon={'las la-arrow-right'}
                    iconSize={'text-xl'}
                    label={'View All'}
                    className="absolute left-8 bottom-8 text-sm"
                />

                {/* <div className='absolute z-50 inset-0 rounded-xl border-2 border-transparent hover:border-green-400 ring-4 ring-transparent hover:ring-green-200  transition-all duration-200 ease-in-out'></div> */}
            </div>
        </div>
    );
};

export default CollectionCard;

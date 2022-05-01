import React from 'react';
import KreatorBadge from '@/blocks/KreatorBadge';
import Link from 'next/link';
import { User, Clock, MapPin, Users } from 'lucide-react';
import Icons from '../Icon/Icons';
import { country, findLowestPrice } from '@/helpers/LocaleHelper';
import { NEXT_PUBLIC_KREATOR_BASE_URL } from '@/constants/public';
import moment from 'moment';

const baseUrl = {
    kreatorPage: '/kreator',
    experiencePage: '/experiences',
    avatar: '/assets/media/kreators',
    experienceImageFeatured: '/assets/media/results'
};
const currencyPrefix = '$US';

const ResultCard = ({
        purchasedView=false,
        data,
        containerClass
    }) => {
    const {
        name: title,
        people,
        travelDate,
        price,
        slug,
        content: {
            experience_id,
            featured_image,
            type,
            days,
            destinations,
            username="",
            first="",
            last="",
            avatar="",
            displayname="",
        },

    } = data;
    const user = {
                username,
                first,
                last,
                avatar,
                displayname,
    }
    // const { destination, days, featured_image, title } = short_content?.destination ? short_content : { destination: '', days:1, featured_image: '', title: '' };

    // const EmptyData = <span className="w-20 bg-gray-300 rounded-full h-2" />;
    const ContentDays = days ? (
        <span> {`${days}  ${days > 1 ? 'Days' : 'Day'}`}</span>
    ) : (
        EmptyData
    );

    // const ContentPrice = content?.price ? (
    //     <span>{`${currencyPrefix} ${content.price}`}</span>
    // ) : (
    //     EmptyData
    // );

    // const contentPrice = type === 'DIGITAL' ? experience_price.price : findLowestPrice(experience_price.price)
    
    const makeLink = () => {
        const linkJsx = 
            <>
                {featured_image ? (
                    <img
                        alt="Placeholder"
                        className="rounded-xl object-cover w-full h-40 xs360:h-44 xs390:h-52 xs410:h-56 sm:h-64 md:h-64 lg:h-64 xl:h-72 2xl:h-96"
                        // data-blink-src={featured_image || ''}
                        src={featured_image || ''}
                    />
                ) : (
                    <div className="rounded-xl bg-gray-200 w-full h-40 xs360:h-44 xs390:h-52 xs410:h-56 sm:h-64 md:h-64 lg:h-64 xl:h-72 2xl:h-96">
                        <div className="relative h-full">
                            <div className="text-xs whitespace-nowrap tracking-widest uppercase absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <Icons iName="IMAGEALT2" />
                            </div>
                        </div>
                    </div>
                )}
            </>
        if(purchasedView) {
            return <a href={`${NEXT_PUBLIC_KREATOR_BASE_URL}/purchased/${experience_id}/0`} target="_blank">
                {linkJsx}
            </a>
        }

        return <Link href={`${baseUrl.experiencePage}/${slug}`}>
                    <a>
                        {linkJsx}
                    </a>
                </Link>
        
    }

    return (
        <div
            className={`my-3 px-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 lg:my-4 lg:px-2 ${containerClass}`}>
            <div className="group-scope relative bg-transparent transition-all duration-300 transform-gpu overflow-hidden rounded-xl hover:shadow-xl hover:-translate-y-1 hover:bg-white">
                <KreatorBadge author={user} baseUrl={baseUrl} />
                <div>
                    {makeLink()}
                </div>
                <div className="flex justify-around w-full transform-gpu -mt-4 px-4">
                    <div className="uppercase rounded-full h-8 flex justify-center items-center bg-gray-900 text-xxs text-kn-primary tracking-widest px-6">
                        {type}
                    </div>
                </div>
                <div className="p-2 sm:p-4">
                    <div className="flex items-center justify-between leading-tight text-black font-sans text-xs md:text-sm">
                        <span className="flex">
                            {title ? (
                                title
                            ) : (
                                <span className="flex">
                                    <span className="w-48 bg-gray-300 rounded-xl h-3" />
                                </span>
                            )}
                        </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center font-sans text-xs text-gray-900">
                        <div className="flex  mr-8 py-1">
                            <span className="text-kn-primary mr-2">
                                <MapPin size={18} />
                            </span>
                            <span className="flex flex-wrap items-center">
                                {destinations?.length > 0 ? (
                                    destinations.map(
                                        (item, index, itemArray) => {
                                            return (
                                                <span key={`${item}_${index}`}>
                                                    <span className="whitespace-nowrap">
                                                        {item}
                                                    </span>
                                                    {index <
                                                        itemArray.length -
                                                            1 && (
                                                        <span className="px-1">
                                                            .
                                                        </span>
                                                    )}
                                                </span>
                                            );
                                        }
                                    )
                                ) : (
                                    <span className="w-20 bg-gray-300 rounded-full h-2" />
                                )}
                            </span>
                        </div>
                        <div className="flex items-center mr-8 py-1">
                            <span className="text-kn-primary mr-2">
                                <Clock size={18} />
                            </span>
                            {ContentDays}
                        </div>
                    </div>
                    {purchasedView && type.toLowerCase()==='guided' && <div className='mt-4'>
                        <div className='flex flex-wrap items-center gap-2'>
                            <span className='text-xxs bg-green-100 text-green-600 whitespace-nowrap rounded-full px-2 py-0.5'>
                                {`Travel Date:  ${moment(travelDate).format(
                                    'MMM Do YYYY'
                                )}`}
                            </span>
                            <span className='text-xxs bg-blue-100 text-blue-600 whitespace-nowrap rounded-full px-2 py-0.5'>
                                People: {people}
                            </span>
                        </div>
                    </div>}
                    {!purchasedView && <div className="transition-colors duration-300 group-hover:bg-kn-primary flex justify-center items-center mt-6 w-full rounded-lg border-2 border-kn-primary h-10 text-black text-sm font-bold tracking-tight group-hover:text-white">
                        <span className="mr-2 font-normal uppercase text-xs tracking-wide">
                            {type.toUpperCase() === 'DIGITAL' ? 'get if for' : 'starting'}
                        </span>
                        <span>
                            {`${currencyPrefix} `}
                            {price}
                        </span>
                        {type.toUpperCase() === 'DIGITAL' ? (
                            ''
                        ) : (
                            <span className="ml-1 flex gap-1 text-xs font-medium">
                                / person
                            </span>
                        )}
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default ResultCard;

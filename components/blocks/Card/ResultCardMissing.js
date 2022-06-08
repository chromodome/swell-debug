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

const ResultCard = ({ purchasedView = false, data, containerClass, myKey }) => {
    const {
        title,
        people,
        travelDate,
        price,
        type,
        experience_id,
        content: {
            // experience_id,
            // featured_image,
            // type,
            // days,
            // destinations,
            // username="",
            // first="",
            // last="",
            // avatar="",
            // displayname="",
        } = {}
    } = data;

    const makeLink = () => {
        return (
            <>
                <div className="rounded-xl bg-gray-200 w-full h-56 md:h-36 lg:h-44 xl:h-36 2xl:h-52">
                    <div className="relative h-full">
                        <div className="text-xs whitespace-nowrap tracking-widest uppercase absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Icons iName="IMAGEALT2" />
                        </div>
                    </div>
                </div>
            </>
        );

        // return <Link href={`${baseUrl.experiencePage}/${slug}`}>
        //             <a>
        //                 {linkJsx}
        //             </a>
        //         </Link>
    };

    return (
        <div
            key={myKey}
            className={`my-3 px-2 w-full md:w-1/3a lg:w-1/4a xl:w-1/5a lg:my-4 lg:px-2 ${containerClass}`}>
            <div className="group-scope relative bg-transparent transition-all duration-300 transform-gpu overflow-hidden rounded-xl hover:shadow-xl hover:-translate-y-1 hover:bg-white">
                <div>{makeLink()}</div>
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
                    <div className="transition-colors duration-300 group-hover:bg-kn-primary flex justify-center items-center mt-6 w-full rounded-lg border-2 border-kn-primary h-10 text-black text-sm font-bold tracking-tight group-hover:text-white">
                        <span className="mr-2 font-normal uppercase text-xs tracking-wide">
                            Contact For Refund
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;

import React from 'react';
import KreatorBadge from './KreatorBadge';

import { User, Clock, MapPin, Users } from 'lucide-react';

const baseUrl = {
    kreatorPage: '/kreator',
    experiencePage: '/experiences',
    avatar: '/assets/media/kreators',
    experienceImageFeatured: '/assets/media/results'
};

const currencyPrefix = '$US';

const ResultCard = ({ data, containerClass }) => {
    return (
        <div
            className={`my-3 px-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 lg:my-4 lg:px-2 ${containerClass}`}>
            <div className="group relative bg-transparent transition-all duration-300 transform-gpu overflow-hidden rounded-xl hover:shadow-xl hover:-translate-y-1 hover:bg-white">
                <KreatorBadge author={data.authorId} baseUrl={baseUrl} />
                <div>
                    <a href={`${baseUrl.experiencePage}/${data.id}`}>
                        <img
                            alt="Placeholder"
                            className="rounded-xl object-cover w-full h-40 xs360:h-44 xs390:h-52 xs410:h-56 sm:h-64 md:h-64 lg:h-64 xl:h-72 2xl:h-96"
                            data-blink-src={data.featured_image}
                        />
                    </a>
                </div>
                <div className="flex justify-around w-full transform-gpu -mt-4 px-4">
                    <div className="uppercase rounded-full h-8 flex justify-center items-center bg-gray-900 text-xxs text-kn-primary tracking-widest px-6">
                        {data.type}
                    </div>
                </div>
                <div className="p-2 sm:p-4">
                    <div className="flex items-center justify-between leading-tight text-black font-sans text-xs md:text-sm">
                        {data.overview_intro.title}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center font-sans text-xs text-gray-900">
                        <div className="flex items-center mr-8 py-1">
                            <span className="text-kn-primary mr-2">
                                <MapPin size={18} />
                            </span>

                            {data.destination.locations[0].countryCode}
                        </div>
                        <div className="flex items-center mr-8 py-1">
                            <span className="text-kn-primary mr-2">
                                <Clock size={18} />
                            </span>
                            {`${data.days}  ${data.days > 1 ? 'Days' : 'Day'}`}
                        </div>
                        <div className="flex items-center mr-8 py-1">
                            <span className="text-kn-primary mr-2">
                                <Users size={18} />
                            </span>
                            {data.recommended_for.length > 1
                                ? `${data.recommended_for[0]} - ${data.recommended_for[1]}`
                                : data.recommended_for[0]}
                        </div>
                    </div>
                    <div className="transition-colors duration-300 group-hover:bg-kn-primary flex justify-center items-center mt-6 w-full rounded-lg border-2 border-kn-primary h-10 text-black text-sm font-bold tracking-tight group-hover:text-white">
                        <span className="mr-2 font-normal uppercase text-xs tracking-wide">
                            {data.type === 'digital'
                                ? 'get if for'
                                : 'starting'}
                        </span>
                        {currencyPrefix + ' ' + data.price}
                        {data.type === 'digital' ? (
                            ''
                        ) : (
                            <span className="ml-2">
                                <User size={18} strokeWidth="2" />
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;

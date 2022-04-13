import React from 'react';
import Link from 'next/link';

const TagCard = ({ data, containerClass, path='/experiences/destination/' }) => {
    return (
        <div className={`my-3 pb-16 px-2 lg:my-4 lg:px-2 ${containerClass} `}>
            <div className="overflow-hidden rounded-xl group relative border-transparent hover:border-green ring-2 ring-transparent hover:ring-green-400 hover:shadow-2xl-green-600 ring-offset-2 transition-all duration-300 ease-in-out ">
                <Link href={`${path}${data.name}`}>
                    <div>
                    <img
                        alt="Placeholder"
                        className="object-cover w-full h-40 xs360:h-44 xs390:h-52 xs410:h-56 sm:h-64 md:h-64 lg:h-64 xl:h-72 2xl:h-96"
                        data-blink-src={data.image}
                    />
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-green-800 to-transparent mix-blend-multiply text-white"></div>
                    <div className="uppercase tracking-wide leading-none text-lg absolute left-4 right-16 bottom-4 text-white">
                        {data.name}
                    </div>
                    {/* <div className='absolute z-50 inset-0 rounded-xl border-2 border-transparent hover:border-green-400 ring-4 ring-transparent hover:ring-green-200  transition-all duration-200 ease-in-out'></div> */}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default TagCard;

//

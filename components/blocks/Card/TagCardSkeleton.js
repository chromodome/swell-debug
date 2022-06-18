import React from 'react';

const TagCardSkeleton = ({ containerClass }) => {
    return (
        <div
            className={`my-3 pb-16 px-2 lg:my-4 lg:px-2  d-hdpi-2:my-vw-4  d-hdpi-2:px-vw-2 animate-pulse ${containerClass} `}>
            <div className="relative ">
                <div className="bg-gray-300 w-full h-40 xs360:h-44 xs390:h-52 xs410:h-56 sm:h-64 md:h-64 lg:h-64 xl:h-72 2xl:h-96 d-hdpi-2:h-vw-96  d-hdpi-2:rounded-vw-xl rounded-xl"></div>

                {/* <div className="uppercase tracking-wide leading-none text-lg absolute left-4 right-16 bottom-4 text-white">
                    <div className="w-32 bg-white rounded-lg h-3.5 mb-4"></div>
                </div> */}
            </div>
        </div>
    );
};

export default TagCardSkeleton;

import React from 'react';

const ResultCardSkeleton = ({ containerClass }) => {
    return (
        <div
            className={`my-3 px-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 lg:my-4 lg:px-2 animate-pulse ${containerClass}`}>
            <div className="relative ">
                <div>
                    <div className=" rounded-xl bg-gray-300 w-full h-40 xs360:h-44 xs390:h-52 xs410:h-56 sm:h-64 md:h-64 lg:h-64 xl:h-72 2xl:h-96"></div>
                </div>

                <div className="p-2 sm:p-4 mt-4">
                    <div className="w-32 bg-gray-300 rounded-lg h-3.5 mb-4" />
                    <div className="flex items-center mb-4">
                        <div className="w-4 h-4 bg-gray-300 rounded-full mr-2" />
                        <div className="w-48 bg-gray-300 rounded-md h-2 mr-2" />
                    </div>
                    <div className="flex items-center  mb-20">
                        <div className="w-4 h-4 bg-gray-300 rounded-full mr-2" />
                        <div className="w-12 bg-gray-300 rounded-md h-2 mr-4" />
                        <div className="w-4 h-4 bg-gray-300 rounded-full mr-2" />
                        <div className="w-8 bg-gray-300 rounded-md h-2 " />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultCardSkeleton;

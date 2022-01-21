import React from 'react';

const CreatorCard = ({ data, containerClass }) => {
    return (
        <div className={`my-3 pb-16 px-2 lg:my-4 lg:px-2 ${containerClass} `}>
            <div className="overflow-hidden rounded-xl group relative ring-2 ring-transparent hover:ring-green-400 hover:shadow-2xl-green-600 ring-offset-22 transition-all duration-500 ease-in-out ">
                <a
                    target="_blank"
                    href={`${data.url}`}
                    className="rounded-xl overflow-hidden">
                    <img
                        alt="Placeholder"
                        className="rounded-xl object-cover w-full h-80 sm:h-64 md:h-96 lg:h-96 xl:h-72 2xl:h-96"
                        data-blink-src={data.image}
                    />
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-green-800 to-transparent mix-blend-multiply text-white"></div>
                    <div className="uppercase tracking-wide leading-none text-lg absolute left-4 right-16 bottom-4 text-white">
                        {data.name}
                    </div>
                    <div className="rounded-lg group-hover:opacity-100 group-hover:translate-y-0 translate-y-full transform-gpu opacity-0 duration-500 transition-all absolute w-full h-full inset-0 bg-white bg-opacity-90 backdrop-filter1 backdrop-blur-lg1 ease-in-out ">
                        <div className="px-6 mt-6 ">
                            <div className="flex gap-2 items-center">
                                <img
                                    alt="Placeholder"
                                    className="rounded-full object-cover h-12 w-12"
                                    data-blink-src={data.image}
                                />
                                <div className="uppercase leading-none lg:text-sm xl:text-base">
                                    {data.name}
                                </div>
                            </div>
                            <div
                                className="text-xs xl:text-sm text-gray-800 mt-4 leading-5"
                                dangerouslySetInnerHTML={{
                                    __html: data.description
                                }}
                            />
                        </div>
                    </div>
                    {/* <div className='absolute z-50 inset-0 rounded-xl border-2 border-transparent hover:border-green-400 ring-4 ring-transparent hover:ring-green-200  transition-all duration-200 ease-in-out'></div> */}
                </a>
            </div>
        </div>
    );
};

export default CreatorCard;

//

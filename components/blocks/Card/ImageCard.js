import React from 'react';

const ImageCard = ({ imgObj, containerClass }) => {
    const { type, data } = imgObj;

    return (
        <div
            className={`my-3 px-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 lg:my-4 lg:px-2 ${containerClass}`}>
            <div className="group-scope relative bg-transparent transition-all duration-300 transform-gpu overflow-hidden rounded-xl hover:shadow-xl hover:-translate-y-1 hover:bg-white">
                <div>
                    <img
                        alt="Placeholder"
                        className="rounded-xl object-cover w-full h-40 xs360:h-44 xs390:h-52 xs410:h-56 sm:h-64 md:h-64 lg:h-64 xl:h-72 2xl:h-96"
                        data-blink-src={data || ''}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageCard;

{
    /* <img
                        alt="Placeholder"
                        className="rounded-xl object-cover w-full h-40 xs360:h-44 xs390:h-52 xs410:h-56 sm:h-64 md:h-64 lg:h-64 xl:h-72 2xl:h-96"
                        data-blink-src={data || ''}
                    /> */
}

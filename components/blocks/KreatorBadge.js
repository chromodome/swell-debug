import React from 'react';

const KreatorBadge = ({
    author: { id, first_name, last_name, handle, avatar },
    baseUrl,
}) => {
    return (
        <div className='group absolute flex top-4 left-4 w-max overflow-hidden rounded-full h-8'>
            <a
                className='h-8 flex items-center no-underline text-white'
                href={`${baseUrl.kreatorPage}/${handle}`}
            >
                <img
                    className='absolute z-10 inline-block h-8 w-8 rounded-full '
                    data-blink-src={`${avatar}`}
                    alt=''
                />
                <div className='h-8 bg-gradient-to-l from-kn-primary via-kn-primary to-blue-300 z-0 text-xs text-gray-900 flex items-center bg-kn-primary pl-10 pr-4 rounded-full transform transition-all duration-300 -translate-x-full group-hover:translate-x-0'>
                    {handle}
                </div>
            </a>
        </div>
    );
};

export default KreatorBadge;

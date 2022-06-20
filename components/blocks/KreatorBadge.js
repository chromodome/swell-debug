import React from 'react';
import Avatar from 'components/specialty/Avatar';
import Link from 'next/link';

const KreatorBadge = ({
    author: {
        displayname = '',
        username = '',
        avatar = '',
        first = '',
        last = ''
    } = {},
    baseUrl,
    nolink
}) => {
    const profile = {
        avatar,
        first,
        last
    };

    return (
        <div
            className={` absolute flex top-4 left-4 w-max overflow-hidden rounded-full h-8 d-hdpi-2:h-vw-8 d-hdpi-2:left-vw-4 d-hdpi-2:top-vw-4`}>
            {!nolink ? (
                <Link href={`/experiences/user/${username}/all`}>
                    <a className="h-8 d-hdpi-2:h-vw-8 flex items-center no-underline text-white">
                        <Avatar profile={profile} card username={username} />
                        {/* <img
                        className="absolute z-10 inline-block h-8 w-8 rounded-full "
                        data-blink-src={`${avatar}`}
                        alt=""
                    /> */}
                        <div className="h-8 d-hdpi-2:h-vw-8 bg-green-500 z-0 text-xs text-gray-900 flex items-center pl-10 pr-4 rounded-full transform-gpu transition-all duration-300 -translate-x-full group-scope-hover:translate-x-0 d-hdpi-2:text-vw-xs d-hdpi-2:pl-vw-10 d-hdpi-2:pr-vw-4">
                            {displayname ? displayname : username}
                        </div>
                    </a>
                </Link>
            ) : (
                <div className="h-8 d-hdpi-2:h-vw-8 flex items-center no-underline text-white">
                    <Avatar profile={profile} username={username} card />
                    {/* <img
                    className="absolute z-10 inline-block h-8 w-8 rounded-full "
                    data-blink-src={`${avatar}`}
                    alt=""
                /> */}
                    <div className="h-8 d-hdpi-2:h-vw-8 bg-green-500 z-0 text-xs text-gray-900 flex items-center pl-10 pr-4 rounded-full transform-gpu transition-all duration-300 -translate-x-full group-scope-hover:translate-x-0 d-hdpi-2:pl-vw-10 d-hdpi-2:pr-vw-4 d-hdpi-2:text-vw-xs">
                        {displayname ? displayname : username}
                    </div>
                </div>
            )}
        </div>
    );
};

export default KreatorBadge;

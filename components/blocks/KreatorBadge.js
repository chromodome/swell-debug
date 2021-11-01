import React from 'react';
import Avatar from 'components/specialty/Avatar';
import Link from 'next/link';

const KreatorBadge = ({ author, baseUrl, nolink }) => {
    return (
        <div
            className={` absolute flex top-4 left-4 w-max overflow-hidden rounded-full h-8`}>
            {!nolink ? (
                <Link href={`/c/${author?.username}`}>
                    <a className="h-8 flex items-center no-underline text-white">
                        <Avatar profile={author?.profile} card />
                        {/* <img
                        className="absolute z-10 inline-block h-8 w-8 rounded-full "
                        data-blink-src={`${avatar}`}
                        alt=""
                    /> */}
                        <div className="h-8 bg-green-500 z-0 text-xs text-gray-900 flex items-center pl-10 pr-4 rounded-full transform-gpu transition-all duration-300 -translate-x-full group-scope-hover:translate-x-0">
                            {author?.profile?.displayname
                                ? author.profile.displayname
                                : author.username}
                        </div>
                    </a>
                </Link>
            ) : (
                <div className="h-8 flex items-center no-underline text-white">
                    <Avatar profile={author?.profile} card />
                    {/* <img
                    className="absolute z-10 inline-block h-8 w-8 rounded-full "
                    data-blink-src={`${avatar}`}
                    alt=""
                /> */}
                    <div className="h-8 bg-green-500 z-0 text-xs text-gray-900 flex items-center pl-10 pr-4 rounded-full transform-gpu transition-all duration-300 -translate-x-full group-scope-hover:translate-x-0">
                        {author?.profile?.displayname
                            ? author.profile.displayname
                            : author.username}
                    </div>
                </div>
            )}
        </div>
    );
};

export default KreatorBadge;

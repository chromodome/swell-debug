import React from 'react';
import Avatar from 'components/specialty/Avatar';
import Link from 'next/link';

const KreatorBadgeStatic = ({ author, avatarOnly = false, card = true }) => {
    return (
        <>
            {author && (
                <Link
                    href={`${process.env.NEXT_PUBLIC_KREATOR_ROUTE}/${author.id}`}>
                    {avatarOnly ? (
                        <a className="">
                            <Avatar
                                profile={author?.profile}
                                card={card}
                                size={'w-14 h-14'}
                            />
                        </a>
                    ) : (
                        <a className={`flex rounded-full h-8 mb-8`}>
                            <div className="h-8 flex items-center no-underline text-white">
                                <Avatar
                                    profile={author?.profile}
                                    card={card}
                                    size={'w-8 h-8'}
                                />

                                <div className="h-8 bg-green-400 z-0 text-xs text-gray-900 flex  whitespace-nowrap font-bold shadow-2xl-green-500 items-center pl-10 pr-4 rounded-full">
                                    {author.profile?.displayname
                                        ? author.profile.displayname
                                        : author.username}
                                </div>
                            </div>
                        </a>
                    )}
                </Link>
            )}
        </>
    );
};

export default KreatorBadgeStatic;

import React from 'react';
import Avatar from 'components/specialty/Avatar';

import classNames from 'classnames';

const KreatorBadgeStaticFlat = ({
    author,
    author: { username },
    avatarOnly = false,
    card = true,
    size = 'w-14 h-14 d-hdpi-2:w-vw-14 d-hdpi-2:h-vw-14',
    customHeight,
    customPadding,
    textSize = 'text-xs font-bold d-hdpi-2:text-vw-xs'
}) => {
    return (
        <>
            {author && (
                <>
                    {avatarOnly ? (
                        <Avatar
                            profile={author?.profile}
                            card={card}
                            size={size}
                            username={username}
                        />
                    ) : (
                        <div
                            className={classNames(
                                customHeight ||
                                    'h-8 mb-8 d-hdpi-2:h-vw-8 d-hdpi-2:mb-vw-8',
                                'flex rounded-full'
                            )}>
                            <div
                                className={classNames(
                                    customHeight || 'h-8 d-hdpi-2:h-vw-8',
                                    'flex items-center no-underline text-white'
                                )}>
                                <Avatar
                                    username={username}
                                    profile={author?.profile}
                                    card={card}
                                    size={
                                        customHeight
                                            ? size
                                            : 'w-8 h-8 d-hdpi-2:w-vw-8 d-hdpi-2:h-vw-8'
                                    }
                                />

                                <div
                                    className={classNames(
                                        customHeight || 'h-8 d-hdpi-2:h-vw-8',
                                        customPadding ||
                                            'pl-10 pr-4 d-hdpi-2:pl-vw-10 d-hdpi-2:pr-vw4',
                                        textSize,
                                        'bg-green-400 z-0  text-gray-900 flex  whitespace-nowrap  shadow-2xl-green-500 items-center rounded-full select-none'
                                    )}>
                                    {author.profile?.displayname
                                        ? author.profile.displayname
                                        : author.username}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default KreatorBadgeStaticFlat;

import classNames from 'classnames';
import React from 'react';

const SectionTitle = ({
    section: { title = '', subTitle = '' },
    className = '',
    padding = 'px-4 d-hdpi-2:px-vw-4',
    size = 'text-3xl d-hdpi-2:text-vw-3xl',
    titleColor,
    titlePadding = 'pb-3 d-hdpi-2:pb-vw-3'
}) => {
    return (
        <div className={`${padding} ${className} `}>
            <div
                className={classNames(
                    'inline-flex  font-bold tracking-tight leading-none flex-shrink-0 flex-initial',
                    titlePadding,
                    size,
                    titleColor,
                    {
                        'text-transparent bg-clip-text bg-gradient-to-l from-blue-600 via-green-400 to-green-400':
                            !titleColor
                    }
                )}>
                {title}
            </div>
            {subTitle ? (
                <div className="mb-1 d-hdpi-2:text-vw-base">{subTitle}</div>
            ) : null}
        </div>
    );
};

export default SectionTitle;

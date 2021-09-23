import React from 'react';

const SectionTitle = ({
    section: { title = '', subTitle = '' },
    className = '',
    padding = 'px-4',
    size = 'text-3xl'
}) => {
    return (
        <div className={`${padding} ${className} `}>
            <div
                className={`inline-flex text-transparent bg-clip-text bg-gradient-to-l from-blue-600 via-green-400 to-green-400 font-bold ${size} tracking-tight  leading-none flex-shrink-0 flex-initial pb-3 mb-2`}>
                {title}
            </div>
            <div>{subTitle}</div>
        </div>
    );
};

export default SectionTitle;

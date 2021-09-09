import React from 'react';

const SectionTitle = ({
    section: { title = '', subTitle = '' },
    className = ''
}) => {
    return (
        <div className={`px-4 ${className} `}>
            <div className="inline-flex text-transparent bg-clip-text bg-gradient-to-l from-blue-600 via-green-400 to-green-400 font-bold text-3xl tracking-tight  leading-none flex-shrink-0 flex-initial mb-2">
                {title}
            </div>
            <div>{subTitle}</div>
        </div>
    );
};

export default SectionTitle;

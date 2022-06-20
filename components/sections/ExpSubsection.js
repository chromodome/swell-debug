import React from 'react';

const ExpSubsection = ({
    borders = 'border-b',
    children,
    className = 'border-green-600 border-opacity-20',
    padding = 'pb-12 d-hdpi-2:pb-vw-12',
    margins = 'mb-14 d-hdpi-2:mb-vw-14'
}) => {
    return (
        <div className={`${className} ${padding} ${margins} ${borders}`}>
            {children}
        </div>
    );
};

export default ExpSubsection;

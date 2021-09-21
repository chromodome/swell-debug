import React from 'react';

const ExpSubsection = ({
    children,
    className = 'border-b border-green-600 border-opacity-20 pb-12 mb-14'
}) => {
    return <div className={`${className}`}>{children}</div>;
};

export default ExpSubsection;

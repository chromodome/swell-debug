import React from 'react';

const ExpSubsection = ({
    children,
    className = 'border-b border-gray-300 pb-12 mb-12'
}) => {
    return <div className={`${className}`}>{children}</div>;
};

export default ExpSubsection;

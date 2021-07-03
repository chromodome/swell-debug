import React from 'react';

/**
 *
 * @param {{ children: JSX.Element[], classes: string }} param0
 * @returns
 */
const Row = ({ children, classes = '' }) => {
    return (
        <div
            className={`mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40 ${classes}`}>
            {children}
        </div>
    );
};

export default Row;

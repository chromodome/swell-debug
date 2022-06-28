import React from 'react';

/**
 *
 * @param {{ children: JSX.Element[], classes: string }} param0
 * @returns
 */
const Row = ({
    children,
    mainClasses = 'mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-44 d-hdpi-2:px-vw-44',
    classes = ''
}) => {
    return <div className={`${mainClasses} ${classes}`}>{children}</div>;
};

export default Row;

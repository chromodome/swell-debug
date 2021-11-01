import React from 'react';

/**
 *
 * @param {{ text: string, component: number , classes: string }} param0
 * @returns
 */

const BlockTitle = ({ text, classes, component = 1 }) => {
    const TitleComponent = `h${component}`;

    return (
        <TitleComponent
            className={`text-kn-primary font-semibold text-xl	${classes}`}>
            {text}
        </TitleComponent>
    );
};

export default BlockTitle;

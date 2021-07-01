import React from 'react';
import Exception from '../ButtonsRow/Exception';
import Selectable from '../ButtonsRow/Selectable';

/**
 * ButtonsRow
 * @param {{ items: string[], type: string, classes: string, handleClick: func }}
 * type: selectable, exception
 *
 * @returns
 */

const ButtonsRow = ({ items = [], type = '', classes, handleClick }) => {
    // Choose type
    const View = { exception: Exception, selectable: Selectable }[type];

    if (!type) return null;

    return (
        <>
            <div className={`flex flex-row mt-5 mb-5 ${classes}`}>
                <View items={items} handleClick={handleClick} />
            </div>
        </>
    );
};

export default ButtonsRow;

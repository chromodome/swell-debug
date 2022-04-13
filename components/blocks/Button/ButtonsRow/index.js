import React from 'react';
import Exception from './Exception';
import Selectable from './Selectable';

/**
 * ButtonsRow
 * @param {{ items: string[], type: string, classes: string, handleClick: func }}
 * type: selectable, exception
 *
 * @returns
 */

const ButtonsRow = ({
    items = [],
    type = 'exception',
    classes,
    handleClick,
    startItem
}) => {
    if (!type) return null;

    return (
        <>
            <div className={`flex flex-row flex-wrap mt-5 mb-5 ${classes}`}>
                {type === 'exception' ? (
                    <Exception items={items} handleClick={handleClick} />
                ) : (
                    <Selectable startItem={startItem} items={items} handleClick={handleClick} />
                )}
            </div>
        </>
    );
};

export default ButtonsRow;

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
            <div
                className={`px-4 d-hdpi-2:px-vw-4 flex flex-row flex-wrap mt-5 d-hdpi-2:mt-vw-4 mb-5 d-hdpi-2:mb-vw-4 ${classes}`}>
                {type === 'exception' ? (
                    <Exception items={items} handleClick={handleClick} />
                ) : (
                    <Selectable
                        startItem={startItem}
                        items={items}
                        handleClick={handleClick}
                    />
                )}
            </div>
        </>
    );
};

export default ButtonsRow;

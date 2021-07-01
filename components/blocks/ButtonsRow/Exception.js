import React from 'react';
import { Button } from '@/blocks/Buttons';
/**
 * ExceptionButtonsRow
 * @param {{ items: string[], handleClick: func }}
 *
 * @returns
 */
const Exception = ({ items = [], handleClick }) => {
    return (
        <>
            {items.map((value) => (
                <Button
                    key={value}
                    wrapperClasses="flex justify-center 
                    items-center cursor-default 
                    py-1 p-3 mb-2 mr-2 rounded-3xl text-xs
                    border-2 border-kn-primary-400 text-kn-primary-500
                    hover:text-kn-primary
                    hover:border-kn-primary"
                    icon="CLOSE"
                    iconClasses="ml-4"
                    onClick={() => handleClick(value)}>
                    {value}
                </Button>
            ))}
        </>
    );
};

export default Exception;

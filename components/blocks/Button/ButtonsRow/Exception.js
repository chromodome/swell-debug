import React from 'react';
import { Button } from '@/blocks/Button/Buttons';

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
                    key={value.id}
                    wrapperClasses="flex justify-center 
                    items-center cursor-pointer 
                    py-1 p-4 mb-2 mr-2 rounded-3xl text-xs
                    border-2 border-kn-primary-400 text-kn-primary-500
                    bg-transparent
                    hover:text-kn-primary
                    hover:border-kn-primary capitalize"
                    icon="CLOSE"
                    iconClasses="ml-4"
                    type="custom"
                    handleClick={() => handleClick(value)}>
                    {value.name}
                </Button>
            ))}
        </>
    );
};

export default Exception;

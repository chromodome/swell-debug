import React, { useState, useEffect } from 'react';
import { Button__Selectable } from '@/blocks/Button/Buttons';

/**
 * SelectableButtonsRow
 * @param {{ items: string[] }}
 *
 * @returns
 */
const Selectable = ({ items = [], handleClick, startItem }) => {
    const [selected, setSelected] = useState(startItem || items[0] || '');

    useEffect(() => {
        if(handleClick) {
            handleClick(selected)
        }
    }, [selected])
    
    return (
        <>
            {items.map((value) => (
                <Button__Selectable
                    key={value}
                    selected={selected === value}
                    icon="check"
                    handleClick={(value) => setSelected(value)}>
                    {value}
                </Button__Selectable>
            ))}
        </>
    );
};

export default Selectable;

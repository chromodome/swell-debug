import React, { useState } from 'react';
import { Button__Selectable } from '@/blocks/Button/Buttons';

/**
 * SelectableButtonsRow
 * @param {{ items: string[] }}
 *
 * @returns
 */
const Selectable = ({ items = [] }) => {
    const [selected, setSelected] = useState(items[0] || '');

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

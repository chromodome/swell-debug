import React from 'react';
import BlockTitle from '@/blocks/Title/BlockTitle';
import Icons from '@/blocks/Icon/Icons';

/**
 *
 * @param {{ title: string, items: any, cols: number }} param0
 * @returns
 */

const ListWithIcon = ({ title = '', items = [], cols = 2 }) => {
    const itemsLength = items.length;
    return (
        <div className="px-4">
            <BlockTitle text={title} component={3} classes="mb-4" />
            <div
                className={`grid grid-cols-${cols} grid-rows-${Math.round(
                    itemsLength / cols
                )} gap-2`}>
                {items.map((key, index) => (
                    <div key={index} className="flex items-center">
                        {key.icon && <Icons iName={key.icon} iClasses="mr-4" />}
                        {key.value}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListWithIcon;

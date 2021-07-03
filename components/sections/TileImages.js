import React from 'react';

/**
 *
 * @param {{url: string[]}} param0
 * @returns
 */

const tileSize = [['col-span-1 row-span-2'], ['col-span-2 ', 'row-span-2']];

export default function TileImages({ url = [] }) {
    return (
        <div className="pl-4 pr-4 relative">
            <div className="grid grid-cols-4 gap-3 mb-8 relative">
                {url.map((value, index) => {
                    return (
                        <div key={value} className={tileSize[index]?.join(' ')}>
                            <img
                                src={value}
                                className="object-cover h-full w-full"
                            />
                        </div>
                    );
                })}
            </div>
            <button
                className="text-green-800 bottom-4 absolute 
                inset-x-2/4 bg-kn-white px-5 py-1 bg-opacity-80 rounded-full">
                View all
            </button>
        </div>
    );
}

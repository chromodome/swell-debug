import React from 'react';

/**
 *
 * @param {{url: string[]}} param0
 * @returns
 */

const tileSize = [['col-span-1 row-span-2'], ['col-span-2 ', 'row-span-2']];

export default function TileImages({ url = [], withGallery = false }) {
    return (
        <div className="pl-4 pr-4 relative">
            <div className="grid grid-cols-4 grid-rows-2 mb-8 relative gap-4 max-h-96">
                {url.map((value, index) => {
                    return (
                        <img
                            key={value}
                            src={value}
                            className={`object-cover h-full w-full rounded-lg ${tileSize[
                                index
                            ]?.join(' ')}`}
                        />
                    );
                })}
            </div>
            {withGallery && (
                <button
                    className="text-green-800 bottom-4 absolute duration-300
                inset-x-2/4 bg-kn-white px-5 py-1 bg-opacity-80
                rounded-full hover:bg-gray-900 hover:text-kn-primary">
                    View all
                </button>
            )}
        </div>
    );
}

import React, { useState } from 'react';
import Spinner from 'components/blocks/Spinner';

const Image = ({
    disabled,
    size = '800',
    src,
    className,
    alt = '',
    children,
    fixEdge = false,
    groupScope = false
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const setLoaded = () => {
        setIsLoading(false);
    };

    return (
        <div
            className={` ${fixEdge ? 'relative' : ''} h-full w-full ${
                groupScope ? 'group-scope' : ''
            }`}
        >
            <img
                alt={alt}
                className={`${className}`}
                src={`${src}-/preview/${size}x${size}/`}
                // data-blink-src={src}
                style={{
                    display: isLoading ? 'none' : 'block'
                }}
                onLoad={setLoaded}
            />

            <div
                style={{
                    display: isLoading ? 'block' : 'none'
                }}
                className={`pointer-events-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            >
                <Spinner size='32' strokeWidth='20' color='text-gray-300' />
            </div>
            {disabled && (
                <div
                    className={`pointer-events-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center  border-white text-white rounded-full text-xl bg-black bg-opacity-50`}
                >
                    <i className='ri-wifi-off-line'></i>
                </div>
            )}
            {children}
        </div>
    );
};

export default Image;

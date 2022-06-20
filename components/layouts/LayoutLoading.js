import React, { useEffect, useRef } from 'react';
import PageSpinner from '@/components/blocks/PageSpinner';
import loadingMessages from '@/constants/loadingMessages';
import { randomItem } from '@/helpers/FEutils';

function LayoutLoading({
    height = 'h-screen-2/3',
    message,
    showMessage = true,
    children
}) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div
                className={`absolute inset-0 flex items-center justify-center d-hdpi-2:text-vw-base`}>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 d-hdpi-2:scale-65">
                    <span className="flex justify-center">
                        <PageSpinner size="64" strokeWidth="20" />
                    </span>
                    {children
                        ? children
                        : showMessage && (
                              <div className="mt-6 text-sm uppercase text-center tracking-wide text-gray-600">
                                  {message
                                      ? message
                                      : randomItem(loadingMessages)}
                              </div>
                          )}
                </div>
            </div>
        </>
    );
}

export default LayoutLoading;

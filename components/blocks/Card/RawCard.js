import React, { useState, useEffect } from 'react';
import translations from '@/constants/translations';

function RawCard({ label, children }) {
    const lang = 'en';

    return (
        <div className="mt-16 mb-8 bg-gray-50 shadow-cards rounded-2xl relative">
            {label && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-min italic whitespace-nowrap mb-3 sm:mb-0 font-bold tracking-tight flex flex-none justify-center items-center bg-green-100 rounded-full px-6 text-green-700 h-8">
                    {label}
                </div>
            )}

            {children}
        </div>
    );
}

export default RawCard;

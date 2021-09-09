import React, { useState, useContext, useEffect } from 'react';

import AuthContext from '@/context/AuthContext';
const tmpTopBar = {
    pill: {
        bgColor: 'bg-white',
        textColor: 'text-black',
        text: 'COVID 19'
    },
    bar: {
        bgColor: 'bg-green-400',
        textColor: 'text-green-900',
        text: 'Find out about our COVID 19 response'
    },
    link: 'https://kreator.viakonnect.com'
};

const TopBar = () => {
    // const { topBar } = useContext(AuthContext);

    const topBar = tmpTopBar;
    const bgColor = topBar.bar.bgColor
        ? topBar.bar.bgColor
        : 'bg-gradient-to-l from-green-400 via-green-400 to-green-500';

    return topBar ? (
        <div
            className={`w-full mt-20 h-16 ${bgColor} ${topBar.bar.textColor} text-sm font-bold flex items-center justify-center`}>
            <div className="flex items-center gap-4 max-w-6xl w-full justify-center ">
                <button
                    className={`shadow-xl-green focus:outline-none text-sm flex items-center justify-center px-4 h-8 rounded-full ${topBar.pill.bgColor} ${topBar.pill.textColor} `}>
                    {topBar.pill.text}
                </button>
                <span>{topBar.bar.text}</span>
            </div>
        </div>
    ) : (
        <div className="mt-20" />
    );
};

export default TopBar;

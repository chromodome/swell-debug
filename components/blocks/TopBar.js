import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const tmpTopBar = {
    pill: {
        bgColor: 'bg-white',
        textColor: 'text-green-700',
        text: 'COVID 19'
    },
    bar: {
        bgColor: 'bg-green-400',
        textColor: 'text-green-900',
        text: 'Find out about our COVID 19 response'
    },
    link: '/help/article/5001'
};

const TopBar = () => {
    // const { topBar } = useContext(AuthContext);

    const topBar = tmpTopBar;
    const bgColor = topBar.bar.bgColor
        ? topBar.bar.bgColor
        : 'bg-gradient-to-l from-green-400 via-green-400 to-green-500';

    return topBar ? (
        <div
            className={`w-full mt-20 ${bgColor} ${topBar.bar.textColor} text-sm flex items-center justify-center`}>
            <div className="flex items-center gap-4 px-4 max-w-6xl w-full justify-center h-12">
                <Link href={tmpTopBar.link}>
                    <a
                        className={`shadow-xl-green focus:outline-none text-sm font-semibold flex items-center justify-center px-4 h-8 rounded-full whitespace-nowrap ${topBar.pill.bgColor} ${topBar.pill.textColor} `}>
                        {topBar.pill.text}
                    </a>
                </Link>
                <span className="font-bold">{topBar.bar.text}</span>
            </div>
        </div>
    ) : (
        <div className="mt-20" />
    );
};

export default TopBar;

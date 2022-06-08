import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const tmpTopBar = {
    pill: {
        bgColor: 'bg-white',
        textColor: 'text-green-700',
        text: 'WELCOME10'
    },
    bar: {
        bgColor: 'bg-green-400',
        textColor: 'text-green-900',
        text: '$10 off your first purchase with this coupon'
    }
    // link: '/help/article/5001'
};

const tmpTopBar2 = {
    styling: {
        pill: {
            bgColor: 'bg-white',
            textColor: 'text-green-700'
        },
        text: {
            bgColor: 'bg-white',
            textColor: 'text-green-700'
        },
        bar: {
            bgColor: 'bg-green-400',
            textColor: 'text-green-900'
        }
    }
}[
    {
        type: 'pill'
    }
];

const TopBar = () => {
    const topBar = tmpTopBar;
    const bgColor = topBar.bar.bgColor
        ? topBar.bar.bgColor
        : 'bg-gradient-to-l from-green-400 via-green-400 to-green-500';

    return topBar ? (
        <div
            className={`w-full mt-16 md:mt-20 ${bgColor} ${topBar.bar.textColor} text-sm flex items-center justify-center`}>
            <div className="flex items-center gap-4 px-4 max-w-6xl w-full justify-center min-h-12 py-2">
                {topBar?.link ? (
                    <Link href={tmpTopBar.link}>
                        <a>
                            <BarPill topBar={topBar} />
                        </a>
                    </Link>
                ) : (
                    <BarPill topBar={topBar} />
                )}
                <span className="font-bold">{topBar.bar.text}</span>
            </div>
        </div>
    ) : (
        <div className="mt-16 md:mt-20" />
    );
};

export default TopBar;

const BarPill = ({ topBar }) => {
    return (
        <div
            className={`shadow-xl-green focus:outline-none text-sm font-semibold flex items-center justify-center px-4 h-8 rounded-full whitespace-nowrap ${topBar.pill.bgColor} ${topBar.pill.textColor} `}>
            {topBar.pill.text}
        </div>
    );
};

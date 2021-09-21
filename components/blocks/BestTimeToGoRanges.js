import React, { useState, useEffect } from 'react';
import { Range } from 'rc-slider';
import translations from '@/constants/translations';

function BestTimeToGoRanges({ timeRange }) {
    const lang = 'en';
    const fixTimeToGo = (theRange) => {
        if (Array.isArray(theRange[0])) {
            return [theRange[0][0], theRange[0][1]];
        } else return [theRange[0], theRange[1]];
    };

    const [localRange, setLocalRange] = useState(fixTimeToGo(timeRange));
    const [isReverse, setIsReverse] = useState(
        timeRange[2] ? timeRange[2] : false
    );

    const marks = {
        15: translations[lang].components.bestTimeToGo['UI_DATE_MONTH_SHORT_1'], // 31 31
        45: translations[lang].components.bestTimeToGo['UI_DATE_MONTH_SHORT_2'], // 59 28
        75: translations[lang].components.bestTimeToGo['UI_DATE_MONTH_SHORT_3'], // 90 31
        105: translations[lang].components.bestTimeToGo[
            'UI_DATE_MONTH_SHORT_4'
        ], // 120 30
        135: translations[lang].components.bestTimeToGo[
            'UI_DATE_MONTH_SHORT_5'
        ], // 151 31
        165: translations[lang].components.bestTimeToGo[
            'UI_DATE_MONTH_SHORT_6'
        ], // 181 30
        195: translations[lang].components.bestTimeToGo[
            'UI_DATE_MONTH_SHORT_7'
        ], // 212 31
        225: translations[lang].components.bestTimeToGo[
            'UI_DATE_MONTH_SHORT_8'
        ], // 243 31
        255: translations[lang].components.bestTimeToGo[
            'UI_DATE_MONTH_SHORT_9'
        ], // 273 30
        285: translations[lang].components.bestTimeToGo[
            'UI_DATE_MONTH_SHORT_10'
        ], // 304 31
        315: translations[lang].components.bestTimeToGo[
            'UI_DATE_MONTH_SHORT_11'
        ], // 334 30
        345: translations[lang].components.bestTimeToGo[
            'UI_DATE_MONTH_SHORT_12'
        ] // 365 31
    };

    return (
        <div className="mt-16 mb-8 bg-gray-50 shadow-cards rounded-2xl py-6 relative px-4">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-min italic whitespace-nowrap mb-3 sm:mb-0 font-bold tracking-tight flex flex-none justify-center items-center bg-green-100 rounded-full px-6 text-green-700 h-8">
                Best Time to go
            </div>

            <div className="px-24 py-12">
                <Range
                    trackStyle={[
                        { background: isReverse ? '#A7F3D0' : '#34D399' }
                    ]}
                    railStyle={{
                        background: !isReverse ? '#A7F3D0' : '#34D399'
                    }}
                    activeDotStyle={{
                        borderColor: isReverse ? '#A7F3D0' : '#34D399'
                    }}
                    dotStyle={{
                        borderColor: !isReverse ? '#A7F3D0' : '#34D399'
                    }}
                    handleStyle={[{}]}
                    disabled={true}
                    step={1}
                    min={1}
                    max={365}
                    defaultValue={localRange}
                    marks={marks}
                    allowCross={true}
                    onAfterChange={(data) => {
                        console.log('changed');
                    }}
                />
            </div>
        </div>
    );
}

export default BestTimeToGoRanges;

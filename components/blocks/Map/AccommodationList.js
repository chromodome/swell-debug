/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';

import Accommodation from './Accommodation';
import CircleListItem from './CircleListItem';
import GenericBtn from './GenericBtn';

// Amine
const defaultDataObj = {
    data: {
        zoom: 2,
        location: {
            lat: 0,
            lng: 0
        }
    },
    address: '',
    info: {
        type: 'ACC_HOTEL',
        rating: 'ACC_STAR1'
    }
};

function AccommodationList({ lang = 'en', locations, edit = false }) {
    const rtl = false;

    const [accommIndex, setAccommIndex] = useState(0);
    const [dayListMode, setDayListMode] = useState('initial');

    const buildPreviewDay = (dest, index = null, isEdit = false) => {
        const { type } = dest;

        return type !== 'circle' ? (
            <Accommodation
                index={index}
                byDay={dayListMode}
                edit={edit}
                accommInfo={dest}
                label={'text'}
                rtl={rtl}
                icon="CHECK"
                bullet="TRAIN"
            />
        ) : (
            <CircleListItem
                index={index}
                byDay={dayListMode}
                edit={isEdit}
                accommInfo={dest}
                label={'text'}
                rtl={rtl}
                icon="CHECK"
                bullet="TRAIN"
            />
        );
    };

    const buildTipSingle = () => {
        if (dayListMode === 'byDay' && !edit) {
            const daysUsed = {};
            let noDays = [];
            let jsxView = [];
            locations.forEach((destination) => {
                if (destination.days && destination.days.length) {
                    destination.days.forEach((dayNum) => {
                        if (!daysUsed[dayNum]) {
                            daysUsed[dayNum] = [];
                        }
                        daysUsed[dayNum] = [...daysUsed[dayNum], destination];
                    });
                } else {
                    noDays = [...noDays, destination];
                }
            });

            Object.keys(daysUsed)
                .sort((a, b) => a - b)
                .forEach((daykey, i) => {
                    jsxView = [
                        ...jsxView,
                        <div className="bg-gray-50 shadow-cards-blue rounded-2xl p-8 mb-16 relative">
                            <h2
                                key={`day_name${daykey}`}
                                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-blue-700 text-sm inline-flex items-center px-6 py-1 bg-blue-100 rounded-full gap-2 mb-2">
                                <i className=" text-green-400 text-lg ri-check-line"></i>
                                <span> Day {daykey}</span>
                            </h2>
                            {daysUsed[daykey].map((dest, index) => {
                                return (
                                    <div key={`day_${daykey}_${i}_${index}`}>
                                        {buildPreviewDay(dest)}
                                    </div>
                                );
                            })}
                        </div>
                    ];
                });

            if (noDays.length) {
                console.log('no days');
                jsxView = [
                    ...jsxView,

                    <div className="ring-2 ring-blue-100 rounded-3xl p-8 mb-16 relative">
                        <h2
                            key={`no_day_chosen`}
                            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-blue-700 text-sm inline-flex items-center px-6 py-1 bg-blue-50 rounded-full gap-2 mb-2">
                            <i className=" text-red-400 text-lg ri-close-line"></i>
                            <span> Unassigned</span>
                        </h2>
                        {noDays.map((dest, index) => {
                            return (
                                <div key={`no_day_${index}`}>
                                    {buildPreviewDay(dest)}
                                </div>
                            );
                        })}
                    </div>
                ];
            }

            return jsxView;
        }

        return locations.map((obj, index) => {
            const key = `dest${index}`;

            return <div key={key}>{buildPreviewDay(obj, index, edit)}</div>;
        });
    };

    const changeDayListPreviewMode = () => {
        if (dayListMode === 'initial') {
            setDayListMode('byDay');
        } else {
            setDayListMode('initial');
        }
    };
    return (
        <div className="mb-16">
            <div className="mb-8">
                <GenericBtn
                    params={[]}
                    handleActionBtn={changeDayListPreviewMode}>
                    {dayListMode === 'initial'
                        ? 'Order by day'
                        : 'Order by place'}
                </GenericBtn>
            </div>
            <div>{locations.length ? buildTipSingle() : null}</div>
        </div>
    );
}

export default AccommodationList;

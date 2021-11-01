/* eslint-disable react/jsx-pascal-case */

import translations from 'constants/translations';
import { handleRowReverse } from 'helpers/FEutils';

function CircleListItem({ byDay = 'initial', accommInfo, index }) {
    const rtl = false;

    const {
        label,
        circle: {
            location: { lat, lng }
        }
    } = accommInfo;

    const googleMapLink = `https://maps.google.com/?q=${lat},${lng}&ll=${lat},${lng}&z=16`;

    const makeDays = () => {
        if (byDay !== 'initial') {
            return null;
        }
        const { days } = accommInfo;

        if (days) {
            return (
                <div className="mt-6 flex gap-2 items-center flex-wrap">
                    {days.map((day) => {
                        const key = `Day${day}`;
                        return (
                            <div
                                key={key}
                                className={`text-gray-900 group text-xs bg-white flex flex-shrink-0 gap-2 flex-nowrap items-center hover:bg-blue-200 rounded-full px-3 py-0.5 ${
                                    handleRowReverse(rtl).flex
                                }`}>
                                <i className="group-hover:text-blue-700 text-blue-400 text-lg ri-check-line"></i>

                                <span
                                    className={`break-all ${
                                        handleRowReverse(rtl).text
                                    }`}>
                                    Day {day}
                                </span>
                            </div>
                        );
                    })}
                </div>
            );
        }
        return null;
    };

    const openLink = () => {
        if (edit) return null;
        else return window.open(googleMapLink, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
            className={`relative  transition-colors ease-in-out duration-500 rounded-2xl px-4 md:px-8 py-4 flex flex-col mb-4  hover:transparent mt-2 bg-blue-100 shadow-cards2-blue`}>
            <div className="flex flex-col md:flex-row md:items-center2 gap-4 md:gap-0">
                <div className="flex items-center ">
                    <span className="px-4 py-1 bg-blue-300 text-blue-900 text-sm rounded-full font-bold italic mr-4">
                        Region
                    </span>
                </div>
                <div className="px-2 flex items-center">
                    <span className="mr-4 text-sm">{label} </span>
                    <span>
                        <i className="ri-map-pin-line text-xl text-blue-600"></i>
                    </span>
                </div>
            </div>
            <div>{makeDays()}</div>
        </div>
    );
}

export default CircleListItem;

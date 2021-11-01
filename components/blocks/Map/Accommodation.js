/* eslint-disable react/jsx-pascal-case */

import translations from 'constants/translations';
import { handleRowReverse } from 'helpers/FEutils';

function Accommodation({ byDay = 'initial', lang = 'en', accommInfo, index }) {
    const rtl = false;

    const {
        info: { rating, type: hotelType },
        address,
        data: {
            zoom,
            location: { lat, lng }
        }
    } = accommInfo;
    const googleMapLink = (
        <a
            href={`https://maps.google.com/?q=${lat},${lng}&ll=${lat},${lng}&z=${zoom}`}
            rel="noreferrer"
            target="_blank"
            className={`${
                address
                    ? 'text-sm underline-none'
                    : 'text-sm italic text-gray-400'
            }`}>
            {address}
        </a>
    );

    const getStars = (str, prefix) => {
        const nb = Number(str.charAt(0));
        if (isNaN(nb)) return '';
        else {
            const stars = [];
            for (let i = 0; i < nb; i++) {
                const key = `star_${i}`;

                stars.push(
                    <span key={'sp_' + index + '_' + i}>
                        <i className="ri-star-s-fill text-sm text-blue-700"></i>
                    </span>
                );
            }

            return stars;
        }
    };

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
    return (
        <div
            className={`relative  transition-colors ease-in-out duration-500 rounded-2xl px-4 md:px-8 py-4 flex flex-col mb-4 mt-2 bg-blue-100 shadow-cards2-blue`}>
            <div className="flex flex-col md:flex-row md:items-center2 gap-4 md:gap-0">
                <div className="flex items-center ">
                    <span className="px-4 py-1 bg-blue-300 text-blue-900 text-sm whitespace-nowrap rounded-full font-bold italic mr-4">
                        {translations[lang].components.hotelInfo[hotelType]}
                    </span>
                    <span className="mr-4">
                        {getStars(
                            translations[lang].components.hotelInfo[rating],
                            index
                        )}
                    </span>
                </div>
                <div className="px-2 flex items-center">
                    <span className="mr-4">{googleMapLink} </span>
                    <span>
                        <i className="ri-map-pin-line text-xl text-blue-600"></i>
                    </span>
                </div>
            </div>

            <div>{makeDays()}</div>
        </div>
    );
}

export default Accommodation;

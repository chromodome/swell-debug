import { handleRowReverse } from 'helpers/FEutils';
import { makeDesinationLabel } from 'helpers/destinations';
import Icons from '../Icon/Icons';

function Destination({ destInf }) {
    const rtl = false;
    const lang = 'en';

    // const destObj = makeDesinationLabel(destInf, lang);

    return (
        <div
            className={`w-full justify-between bg-gray-50 shadow-cards hover:bg-white transition-colors ease-in-out duration-300 rounded-2xl px-4 md:px-8 py-2 flex flex-col md:${
                handleRowReverse(rtl).flex
            } flex-wrap md:flex-nowrap  mb-4`}>
            <div
                className={`flex flex-col md:${
                    handleRowReverse(rtl).flex
                } flex-wrap lg:flex-nowrap md:items-center`}>
                <div
                    className={`flex items-center flex-shrink-0 ${
                        handleRowReverse(rtl).flex
                    }`}>
                    <div className="">
                        <Icons
                            iName="MAP_MARKERALT"
                            size="2xl"
                            iClasses="bg-clip-text text-transparent bg-gradient-to-tr from-green-600 via-green-400 to-blue-500"
                        />
                    </div>
                    <div className="px-6 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-gray-900 to-green-400 mix-blend-multiply">
                        {makeDesinationLabel(destInf[0], lang).country}
                    </div>
                </div>
                {destInf.length > 1 && (
                    <div
                        className={`flex items-center ${
                            handleRowReverse(rtl).flex
                        }`}>
                        <div
                            className={`flex-shrink-0 ${
                                handleRowReverse(rtl).mr
                            }-4 text-kn-primary text-lg`}>
                            <Icons
                                size="xl"
                                iName={`${handleRowReverse(rtl).arrowLong}`}
                            />
                        </div>
                        <div
                            className={`flex flex-wrap text-sm gap-2 ${
                                handleRowReverse(rtl).flex
                            }`}>
                            {/* Buttons start here */}

                            {destInf.map((singleDest, destIndex) => {
                                return (
                                    (singleDest.place ||
                                        singleDest.administrative_area_level_1 ||
                                        singleDest.address) && (
                                        <button
                                            key={destIndex}
                                            className={`outline-none focus:outline-none text-gray-900 group flex flex-shrink-0 gap-2 flex-nowrap items-center hover:bg-green-100 duration-200 rounded-full px-4 py-0.5 ${
                                                handleRowReverse(rtl).flex
                                            }`}>
                                            <i className="group-hover:text-green-400 text-green-400 text-lg ri-check-line"></i>

                                            <span
                                                className={`break-all ${
                                                    handleRowReverse(rtl).text
                                                }`}>
                                                {
                                                    makeDesinationLabel(
                                                        singleDest,
                                                        lang
                                                    ).place
                                                }
                                            </span>
                                        </button>
                                    )
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Destination;

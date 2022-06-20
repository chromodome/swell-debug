import { handleRowReverse } from 'helpers/FEutils';
import { makeDesinationLabel } from 'helpers/destinations';
import Icons from '../Icon/Icons';

function Destination({ destInf }) {
    const rtl = false;
    const lang = 'en';

    // const destObj = makeDesinationLabel(destInf, lang);

    return (
        <div
            className={`w-full justify-between bg-white shadow-cards rounded-2xl d-hdpi-2:rounded-vw-2xl px-4 md:px-8 py-2 flex flex-col md:${
                handleRowReverse(rtl).flex
            } flex-wrap md:flex-nowrap  mb-4 d-hdpi-2:mb-vw-4 d-hdpi-2:px-vw-8 d-hdpi-2:py-vw-2`}>
            <div
                className={`flex flex-col md:${
                    handleRowReverse(rtl).flex
                } flex-wrap lg:flex-nowrap md:items-center`}>
                <div
                    className={`flex items-center flex-shrink-0 ${
                        handleRowReverse(rtl).flex
                    }`}>
                    <div className="">
                        <span className="text-green-400 mr-2 d-hdpi-2:mr-vw-2">
                            <i className="ri-map-pin-line text-xl d-hdpi-2:text-vw-xl"></i>
                        </span>
                    </div>
                    <div className="px-6 d-hdpi-2:px-vw-6 text-xl d-hdpi-2:text-vw-xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-gray-900 to-green-400 mix-blend-multiply">
                        {makeDesinationLabel(destInf[0], lang).country}
                    </div>
                </div>
                {destInf.length > 1 && (
                    <div
                        className={`flex items-center ${
                            handleRowReverse(rtl).flex
                        }`}>
                        <div
                            className={`flex-shrink-0 d-hdpi-2:mr-vw-4 text-kn-primary text-lg d-hdpi-2:text-vw-lg`}>
                            <Icons
                                size="xl"
                                iName={`${handleRowReverse(rtl).arrowLong}`}
                            />
                        </div>
                        <div
                            className={`flex flex-wrap text-sm d-hdpi-2:text-vw-sm gap-2 d-hdpi-2:gap-1 ${
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
                                            className={`outline-none focus:outline-none text-gray-900 group flex flex-shrink-0 gap-2 d-hdpi-2:gap-1 flex-nowrap items-center hover:bg-green-100 duration-200 rounded-full px-4 py-0.5 d-hdpi-2:px-vw-4 d-hdpi-2:py-vw-0.5 ${
                                                handleRowReverse(rtl).flex
                                            }`}>
                                            <i className="group-hover:text-green-400 text-green-400 text-lg d-hdpi-2:text-vw-lg ri-check-line"></i>

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

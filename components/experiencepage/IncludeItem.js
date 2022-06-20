/* eslint-disable react/jsx-pascal-case */

const IncludeItem = ({
    itemData,

    includeType
}) => {
    const { title, desc, objId } = itemData;

    const pillObj = {
        subClass: includeType === 'includes' ? 'kn-include' : 'kn-exclude',
        class:
            includeType === 'includes'
                ? 'bg-green-200 text-green-800'
                : 'bg-red-200 text-red-800'
    };

    return (
        <div
            className={`mb-4 sm:items-start relative flex group flex-col  sm:flex-row py-5 px-4 w-full  bg-gray-50 
             transition-colors ease-in-out duration-300 rounded-2xl d-hdpi-2:mb-vw-4 d-hdpi-2:py-vw-6 d-hdpi-2:px-vw-4`}>
            <div className={`w-full h-full `}>
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-0 whitespace-normal">
                    <div className="flex items-center">
                        <span
                            className={`px-4 d-hdpi-2:px-vw-4 d-hdpi-2:py-vw-1 py-1 ${pillObj.class} text-sm d-hdpi-2:text-vw-sm rounded-full whitespace-nowrap font-bold italic mr-4 d-hdpi-2:mr-vw-4`}>
                            {title}
                        </span>
                    </div>
                    <div className="px-2 flex w-full d-hdpi-2:px-vw-2">
                        <div
                            className={`mr-4 d-hdpi-2:mr-vw-4 text-sm d-hdpi-2:text-vw-sm underline-none block-html w-full mt-1 d-hdpi-2:mt-vw-1 d-hdpi-2:-mb-1 -mb-2 ${pillObj.subClass}`}
                            dangerouslySetInnerHTML={{
                                __html: desc
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncludeItem;

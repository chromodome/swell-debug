/* eslint-disable react/jsx-pascal-case */

import PanelMarketing from './PanelMarketing';

const PolicyItem = ({ itemData }) => {
    const { type, title, desc, objId } = itemData;

    const pillClass = `${
        type === 'cancellation' ? 'ri-calendar-line' : 'ri-refund-2-line'
    } text-xl `;

    return (
        <div className={``}>
            <PanelMarketing
                objId={objId}
                title={title}
                padding="pt-6 pb-2 d-hdpi-2:pt-vw-6 d-hdpi-2:pb-vw-2"
                paddingX="md:px-8 d-hdpi-2:px-vw-8"
                pillClass="text-white bg-gray-900 px-6 d-hdpi-2:px-vw-6"
                textStyle="text-sm d-hdpi-2:text-vw-sm"
                iconClass={pillClass}>
                <div className={`w-full h-full `}>
                    <div className="flex flex-col gap-4 d-hdpi-2:gap-2">
                        <div className="px-2 md:pl-12 md:pr-12 flex w-full d-hdpi-2:px-vw-12">
                            <div
                                className="mr-4 d-hdpi-2:mr-vw-4 d-hdpi-2:text-vw-sm text-sm underline-none block-html w-full"
                                dangerouslySetInnerHTML={{
                                    __html: desc
                                }}
                            />
                        </div>
                    </div>
                </div>
            </PanelMarketing>
        </div>
    );
};

export default PolicyItem;

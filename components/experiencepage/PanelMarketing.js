function PanelMarketing({
    title,
    children,
    padding = 'py-12 d-hdpi-2:py-vw-12',
    paddingX = 'px-4 lg:px-6 xl:px-16 d-hdpi-2:px-vw-16',
    pillClass = 'bg-green-100 rounded-full px-6 text-green-700 d-hdpi-2:px-vw-6',
    iconClass,
    rounded = 'rounded-full',
    textStyle = 'italic font-bold tracking-tight'
}) {
    return (
        <>
            <div className="mt-16 mb-8 bg-white shadow-cards rounded-2xl py-6 relative px-4 d-hdpi-2:mt-vw-16 d-hdpi-2:mb-vw-8 d-hdpi-2:rounded-vw-2xl d-hdpi-2:py-vw-6 d-hdpi-2:px-vw-4">
                <div
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-min flex items-center mb-3 sm:mb-0 h-8 d-hdpi-2:h-vw-8 ${rounded} ${pillClass}`}>
                    <div
                        className={`flex gap-2 d-hdpi-2:gap-1 justify-center items-center`}>
                        <span className={`whitespace-nowrap ${textStyle}`}>
                            {title}
                        </span>
                        {iconClass && <i className={`${iconClass}`}></i>}
                    </div>
                </div>

                <div className={` ${paddingX} ${padding}`}>{children}</div>
            </div>
        </>
    );
}

export default PanelMarketing;

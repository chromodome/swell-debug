function PanelMarketing({
    title,
    children,
    padding = 'py-12',
    paddingX = 'px-4 lg:px-6 xl:px-16',
    pillClass = 'bg-green-100 rounded-full px-6 text-green-700',
    iconClass,
    rounded = 'rounded-full',
    textStyle = 'italic font-bold tracking-tight'
}) {
    return (
        <>
            <div className='mt-16 mb-8 bg-white shadow-cards rounded-2xl py-6 relative px-4'>
                <div
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-min flex items-center mb-3 sm:mb-0 h-8 ${rounded} ${pillClass}`}
                >
                    <div className={`flex gap-2 justify-center items-center`}>
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

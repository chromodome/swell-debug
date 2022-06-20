function RawCard({
    label,
    children,
    margins = 'mt-16 mb-8 d-hdpi-2:mt-vw-16 d-hdpi-2:mb-vw-8',
    rounded = 'rounded-2xl d-hdpi-2:rounded-vw-2xl',
    shadow = 'shadow-cards',
    bgColor = 'bg-gray-50',
    padding = ''
}) {
    // const lang = 'en';

    return (
        <div
            className={`${margins} ${rounded} ${shadow} ${bgColor} ${padding} relative`}>
            {label && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-min italic whitespace-nowrap mb-3 sm:mb-0 font-bold tracking-tight flex flex-none justify-center items-center bg-green-100 rounded-full px-6 text-green-700 h-8 d-hdpi-2:px-vw-6 d-hdpi-2:h-vw-8">
                    {label}
                </div>
            )}

            {children}
        </div>
    );
}

export default RawCard;

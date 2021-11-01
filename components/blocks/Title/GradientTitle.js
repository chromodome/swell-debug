const GradientTitle = ({
    label,
    textSize = 'text-2xl',
    justify = '',
    containerClass = 'mb-4',
    textClass = 'font-bold tracking-tighter',
    flex = 'flex'
}) => {
    return (
        <div className={`${containerClass} ${justify} ${flex}`}>
            <div
                className={` ${textClass} flex-shrink-0 text-transparent bg-clip-text bg-gradient-to-tl from-gray-900 via-blue-500 to-green-400 ${textSize}`}>
                {label}
            </div>
        </div>
    );
};

export default GradientTitle;

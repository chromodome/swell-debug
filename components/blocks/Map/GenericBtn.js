const GenericBtn = ({
    handleActionBtn,
    className = '',
    padding = 'py-2 px-6',
    bgColor = 'bg-green-100 hover:bg-gray-900',
    textColor = 'text-green-900  hover:text-white',
    rounded = 'rounded-full',
    textSize = 'text-sm',
    children,
    params = [],
    style = {},
    disabled = false
}) => {
    const handleClick = () => {
        if (!disabled) handleActionBtn(...params);
    };

    return (
        <button
            className={`focus:outline-none outline-none ${padding} ${bgColor} ${textColor} ${rounded} ${textSize} ${className}`}
            onClick={handleClick}
            style={style}>
            {children}
        </button>
    );
};

export default GenericBtn;

const GenericBtn = ({
    handleActionBtn,
    className = 'focus:outline-none outline-none text-sm rounded-full bg-green-100 text-green-900 hover:bg-gray-900 hover:text-white py-2 px-6',
    children,
    params = [],
    style = {},
    disabled = false
}) => {
    const handleClick = () => {
        if (!disabled) handleActionBtn(...params);
    };

    return (
        <button className={className} onClick={handleClick} style={style}>
            {children}
        </button>
    );
};

export default GenericBtn;

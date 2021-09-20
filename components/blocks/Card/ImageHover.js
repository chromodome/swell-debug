const ImageHover = ({
    url,
    handleActionBtn,
    params = [],
    disabled = false,
    className = ''
}) => {
    const handleClick = () => {
        if (!disabled) handleActionBtn(...params);
    };

    return (
        <div
            className={`${
                !disabled ? 'cursor-pointer' : ''
            } relative h-full ${className}`}
            onClick={handleClick}>
            <img
                alt="Placeholder"
                className="object-cover object-center w-full h-full"
                data-blink-src={url}
            />
            <div className="absolute inset-0 bg-transparent hover:bg-green-400 opacity-20 duration-200"></div>
        </div>
    );
};

export default ImageHover;

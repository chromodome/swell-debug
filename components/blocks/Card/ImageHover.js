import Icons from '../Icon/Icons';

const ImageHover = ({
    url,
    handleActionBtn,
    params = [],
    disabled = false,
    className = '',
    nohover,
    bg = 'bg-white'
}) => {
    const handleClick = () => {
        if (!disabled) handleActionBtn(...params);
    };

    return url ? (
        <div
            className={`${
                !disabled ? 'cursor-pointer' : ''
            } relative h-full ${className}`}
            onClick={handleClick}>
            <img
                alt="Placeholder"
                className="transform object-cover object-center w-full h-full"
                src={url}
            />
            {!nohover && (
                <div className="absolute inset-0 bg-transparent hover:bg-green-400 opacity-20 duration-200"></div>
            )}
        </div>
    ) : (
        <div className={`relative min-h-60 h-full ${className} ${bg}`}>
            <div className=" absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Icons iName="IMAGEALT2" />
            </div>
        </div>
    );
};

export default ImageHover;

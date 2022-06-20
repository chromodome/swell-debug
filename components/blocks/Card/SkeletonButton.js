import Spinner from '@/blocks/Spinner';

const SkeletonButton = ({
    label,
    color,
    width = 'w-72 d-hdpi-2:w-vw-72',
    height,
    animation = true,
    fontSize = 'text-base',
    className
}) => {
    const defaultStyle = `overflow-hidden rounded-lg bg-gradient-to-r from-green-300 via-green-400 to-green-500 shadow-2xl-green-500 font-bold text-green-800`;

    return (
        <div className={`${width}`}>
            <div
                className={`overflow-hidden rounded-lg d-hdpi-2:rounded-vw-lg relative  h-12 d-hdpi-2:h-vw-12 ${width} ${height} flex items-center justify-center 
                    ${className ?? defaultStyle}
              `}>
                <span className="absolute left-1/2 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 d-hdpi-2:scale-75">
                    <span
                        className={`whitespace-nowrap ${fontSize} text-green-800`}>
                        {label ?? <Spinner strokeColor="#000000" />}
                    </span>
                </span>
            </div>
        </div>
    );
};

export default SkeletonButton;

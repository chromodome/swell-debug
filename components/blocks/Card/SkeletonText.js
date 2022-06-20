import classNames from 'classnames';

const SkeletonText = ({
    color = 'bg-gray-200',
    rounded = 'rounded-full',
    height = 'h-3 d-hdpi-2:h-vw-3',
    width = 'w-48 d-hdpi-2:w-vw-48',
    pulse = false,
    circle
}) => {
    return (
        <span
            className={classNames('flex-none', color, width, rounded, {
                'aspect-w-1 aspect-h-1': circle,

                [height]: !circle,
                'animate-pulse': pulse
            })}
        />
    );
};

export default SkeletonText;

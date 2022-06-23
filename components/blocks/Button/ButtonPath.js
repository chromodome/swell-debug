import classNames from 'classnames';
import Link from 'next/link';

const ButtonPath = ({
    label,
    color,
    width = 'w-80 d-hdpi-2:w-vw-80',
    height = 'h-12 d-hdpi-2:h-vw-12',
    isLink,
    url,
    margins = 'mt-8 d-hdpi-2:mt-vw-8',
    animate = true,
    shadow = 'shadow-2xl-green-500',
    dark,
    textSize = 'd-hdpi-2:text-vw-base',
    rounded = 'rounded-lg d-hdpi-2:rounded-vw-lg'
}) => {
    const btnJSX = (
        <div
            className={classNames(
                'relative overflow-hidden  flex items-center justify-center ',
                rounded,
                textSize,
                height,
                width,
                shadow,
                dark
                    ? 'hover:bg-white hover:text-gray-900 hover:shadow-none'
                    : 'hover:text-white hover:bg-gray-900 hover:shadow-none',
                animate
                    ? 'transform-gpu duration-300 hover:-translate-y-2 ease-in-out'
                    : '',
                'bg-gradient-to-r from-green-300 via-green-400 to-green-500   font-bold text-green-800  transition-all'
            )}>
            <span className="absolute left-1/2 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 ">
                <span className="whitespace-nowrap">{label}</span>
            </span>

            <span
                className={classNames(
                    dark ? 'bg-white' : 'bg-gray-900 font-normal',
                    'absolute  inset-0  transition-opacity duration-200 hover:opacity-100 opacity-0'
                )}>
                <span className="absolute left-1/2 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 ">
                    <span className="whitespace-nowrap">{label}</span>
                </span>
            </span>
        </div>
    );

    return isLink ? (
        <Link href={url}>
            <a>{btnJSX}</a>
        </Link>
    ) : (
        <a href={url} target="_blank">
            {btnJSX}
        </a>
    );
};

export default ButtonPath;

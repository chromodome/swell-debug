import classNames from 'classnames';
import Link from 'next/link';

const ButtonPath = ({
    label,
    color,
    width = 'w-80',
    height,
    isLink,
    url,
    margins = 'mt-8',
    animate = true
}) => {
    const btnJSX = (
        <div
            className={classNames(
                'relative overflow-hidden h-12 rounded-lg flex items-center justify-center ',
                width,
                animate
                    ? 'transform-gpu duration-300 hover:-translate-y-2 ease-in-out'
                    : '',
                'bg-gradient-to-r from-green-300 via-green-400 to-green-500 shadow-2xl-green-500 hover:shadow-none font-bold text-green-800 hover:bg-gray-900 transition-all hover:text-white'
            )}>
            <span className="absolute left-1/2 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 ">
                <span className="whitespace-nowrap">{label}</span>
            </span>

            <span className="absolute font-normal inset-0 bg-gray-900 transition-opacity duration-200 hover:opacity-100 opacity-0">
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

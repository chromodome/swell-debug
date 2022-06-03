import Spinner from '@/blocks/Spinner';
import classNames from 'classnames';

const ButtonLoad = ({
    label,
    color,
    width,
    height,
    isLoading = false,
    handleClick,
    nowrap,
    margins = 'mt-8',
    animate = true
}) => {
    const btnJSX = (
        <button
            onClick={handleClick}
            className={classNames(
                'relative overflow-hidden h-12 w-80 rounded-lg flex items-center justify-center ',
                animate
                    ? 'transform-gpu duration-300 hover:-translate-y-2 ease-in-out'
                    : '',
                isLoading
                    ? 'bg-gray-900 text-white'
                    : 'bg-gradient-to-r from-green-300 via-green-400 to-green-500 shadow-2xl-green-500 hover:shadow-none font-bold text-green-800 hover:bg-gray-900 transition-all hover:text-white'
            )}>
            <span className="absolute left-1/2 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 ">
                {isLoading ? (
                    <Spinner strokeColor="#000000" />
                ) : (
                    <span className="whitespace-nowrap">{label}</span>
                )}
            </span>

            <span className="absolute font-normal inset-0 bg-gray-900 transition-opacity duration-200 hover:opacity-100 opacity-0">
                <span className="absolute left-1/2 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 ">
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <span className="whitespace-nowrap">{label}</span>
                    )}
                </span>
            </span>
        </button>
    );

    return nowrap ? (
        btnJSX
    ) : (
        <div
            className={classNames('flex items-center justify-center', margins)}>
            {btnJSX}
        </div>
    );
};

export default ButtonLoad;

import Spinner from '@/components/blocks/Spinner';
import classNames from 'classnames';

const ButtonLoad = ({
    label,
    color,
    width = 'w-80 d-hdpi-2:w-vw-80',
    height = 'h-12 d-hdpi-2:h-vw-12',
    isLoading = false,
    handleClick,
    nowrap,
    type = 'button',
    form,
    disabled = false,
    margins = 'mt-8 d-hdpi-2:mt-vw-8',
    animation = true
}) => {
    const btnJSX = (
        <button
            disabled={disabled}
            type={type}
            form={form}
            onClick={handleClick}
            className={classNames(
                'focus:outline-none relative overflow-hidden rounded-lg d-hdpi-2:rounded-vw-lg flex items-center justify-center d-hdpi-2:text-vw-base',
                animation &&
                    'transform-gpu duration-300 hover:-translate-y-2 d-hdpi-2:-translate-y-1 ease-in-out',
                width,
                height,
                isLoading
                    ? 'bg-gray-900 text-white'
                    : 'bg-gradient-to-r from-green-400 via-green-400 to-green-500 shadow-2xl-green-500 hover:shadow-none font-bold text-green-800 hover:bg-gray-900 transition-all hover:text-white hover:font-semibold'
            )}>
            <span
                className={classNames(
                    'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'
                )}>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <span className="whitespace-nowrap">{label}</span>
                )}
            </span>

            <span className="absolute inset-0 bg-gray-900 text-white font-medium duration-200 hover:opacity-100 opacity-0">
                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
        <div className={`${width} flex items-center justify-center ${margins}`}>
            {btnJSX}
        </div>
    );
};

export default ButtonLoad;

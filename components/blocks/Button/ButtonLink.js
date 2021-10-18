import Spinner from '@/blocks/Spinner';
import Link from 'next/link';
const ButtonLink = ({
    label,
    color,
    width = 'w-72',
    height,
    isLoading = false,
    handleClick,
    nowrap,
    expId
}) => {
    const btnJSX = (
        <a
            href={`${process.env.NEXT_PUBLIC_KREATOR_BASE_URL}/experience/${expId}/0`}
            target="_blank"
            className={`relative overflow-hidden h-12 ${width} rounded-lg flex items-center justify-center ${
                isLoading
                    ? 'bg-gray-900 text-white'
                    : 'bg-gradient-to-r from-green-300 via-green-400 to-green-500 shadow-2xl-green-500 hover:shadow-none font-bold text-green-800 hover:bg-gray-900 transition-all hover:text-white'
            } transform-gpu duration-300 hover:-translate-y-2 ease-in-out `}>
            <span className="absolute left-1/2 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 ">
                {isLoading ? (
                    <Spinner />
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
        </a>
    );

    return nowrap ? (
        btnJSX
    ) : (
        <div className="flex items-center justify-center mt-8">{btnJSX}</div>
    );
};

export default ButtonLink;

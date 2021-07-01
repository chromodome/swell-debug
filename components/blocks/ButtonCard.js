import Link from 'next/link';
const ButtonCard = ({
    pagelink,
    url,
    handleClick,
    icon,
    label,
    className = 'text-sm',
    iconSize = 'text-2xl',
    darkMode = 'true',
}) => {
    const classes = `${className} rounded-full bg-white px-6 py-3 hover:bg-gray-900  hover:text-white ${
        darkMode ? 'hover:bg-opacity-50' : ''
    } transition-all duration-200 ring-transparent hover:ring-green-400 ring-2 shadow-2xl-green-500 inline-flex items-center justify-center`;
    const labelJSX = (
        <>
            {icon && <i className={`${icon} ${iconSize} mr-4`}></i>}
            {label}
        </>
    );

    return pagelink ? (
        <Link href='/experience'>
            <a className={classes}>{labelJSX}</a>
        </Link>
    ) : url ? (
        <a href={url} className={classes}>
            {labelJSX}
        </a>
    ) : (
        <button onClick={handleClick} className={classes}>
            {labelJSX}
        </button>
    );
};

export default ButtonCard;

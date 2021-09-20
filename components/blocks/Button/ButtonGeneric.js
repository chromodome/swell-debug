import Link from 'next/link';
const ButtonGeneric = ({
    type = 'action',
    link = '/',
    url = '#',
    handleAction,
    icon,
    label,
    bgColor = 'bg-white',
    bgHoverColor = 'hover:bg-gray-900',
    textColor,
    textHoverColor = 'hover:text-white',
    shadow = 'shadow-2xl-green-500',
    animation = 'transition-all duration-200',
    padding = 'px-6 py-2',
    rounded = 'rounded-full',
    ring = 'ring-2',
    ringColor = 'ring-transparent',
    ringHoverColor = 'hover:ring-green-400',
    fontSize = 'text-sm',
    iconSize = 'text-xl',
    gap = 'gap-4',
    reverse = false,
    className,
    params,
    disabled
}) => {
    const handleClick = () => {
        if (!disabled) handleAction(...params);
    };

    const classes = `${bgColor} ${bgHoverColor} ${textColor} ${textHoverColor} ${shadow} ${animation} ${padding} ${rounded} ${ring} ${ringColor} ${ringHoverColor} ${fontSize} ${className} ${
        icon ? gap : ''
    } ${
        reverse ? 'flex-row-reverse' : ''
    } inline-flex items-center justify-center`;
    const labelJSX = (
        <>
            {icon && <i className={`${icon}`}></i>}
            {label}
        </>
    );

    return type == 'link' ? (
        <Link href={link}>
            <a className={classes}>{labelJSX}</a>
        </Link>
    ) : type == 'url' ? (
        <a href={url} className={classes}>
            {labelJSX}
        </a>
    ) : (
        <button onClick={handleClick} className={classes}>
            {labelJSX}
        </button>
    );
};

export default ButtonGeneric;

import Link from 'next/link';
const Button = ({
    label,
    color,
    width = 'w-72',
    height,
    handleClick,
    link = '/',
    url,
    as = 'button',
    type = 'button',
    form,
    animation = true,
    fontSize = 'text-base'
}) => {
    const btnJSX = (
        <div
            target="_blank"
            className={`relative overflow-hidden h-12 ${width} ${height} rounded-lg flex items-center justify-center 
                   bg-gradient-to-r from-green-300 via-green-400 to-green-500 shadow-2xl-green-500 hover:shadow-none font-bold text-green-800 hover:bg-gray-900 transition-all hover:text-white'
             transform-gpu duration-300 ${
                 animation ? 'hover:-translate-y-2' : ''
             } ease-in-out `}>
            <span className="absolute left-1/2 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 ">
                <span className={`whitespace-nowrap ${fontSize}`}>{label}</span>
            </span>

            <span className="absolute inset-0 font-semibold text-white bg-gray-900 transition-opacity duration-200 hover:opacity-100 opacity-0">
                <span className="absolute left-1/2 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 ">
                    <span className={`whitespace-nowrap ${fontSize}`}>
                        {label}
                    </span>
                </span>
            </span>
        </div>
    );

    return as == 'link' ? (
        <Link href={link}>
            <a className={`${width}`}>{btnJSX}</a>
        </Link>
    ) : as == 'url' ? (
        <a href={url} target="_blank">
            {btnJSX}
        </a>
    ) : (
        <button
            form={form}
            type={type}
            className={`focus:outline-none outline-none ${width}`}
            onClick={handleClick}>
            {btnJSX}
        </button>
    );
};

export default Button;

import Spinner from 'components/blocks/Spinner';
const CollapseButton = ({
    handleClick,
    labelHover,
    icon = 'ri-check-line text-sm',
    size = '8',
    textSize = 'text-sm',
    noicon,
    children,
    sizeHover = 'w-full',
    offsetCenter = '0',
    nolink,
    padding = 'px-2.5',
    hoverText = 'hover:text-white',
    warning = false,
    btnColor = `${
        !warning
            ? `bg-green-100 ${
                  nolink ? 'text-green-800' : 'hover:bg-gray-900 text-green-800'
              }`
            : `bg-yellow-300 text-yellow-800 hover:text-yellow-800`
    }`
}) => {
    return (
        <button
            className={`group-scope ring-2 hover:${sizeHover} transition-all ${
                handleClick ? hoverText : ''
            } duration-300 out-expo ring-transparent outline-none focus:outline-none w-${size}
            } h-${size} rounded-full flex items-center overflow-hidden ${btnColor} `}
            onClick={handleClick}
        >
            <span
                className={`flex items-center gap-3 ${padding} transform transition-transform duration-300 out-expo group-scope-hover:translate-x-${offsetCenter}`}
            >
                {noicon ? children : <i className={`${icon} `}></i>}

                <span
                    className={`${textSize} whitespace-nowrap block opacity-0  group-scope-hover:opacity-100 transition-opacity duration-300 out-expo`}
                >
                    {labelHover}
                </span>
            </span>
        </button>
    );
};

export default CollapseButton;

import Spinner from 'components/blocks/Spinner';
const CollapseButton = ({
    handleClick,
    labelHover,
    icon = 'ri-check-line text-sm d-hdpi-2:text-vw-sm',
    size = '8',
    height = 'h-8 d-hdpi-2:h-vw-8',
    width = 'w-8 d-hdpi-2:w-vw-8',
    textSize = 'text-sm d-hdpi-2:text-vw-sm',
    noicon,
    children,
    sizeHover = 'w-full',
    offsetCenter = '0',
    nolink,
    padding = 'px-2.5 d-hdpi-2:px-vw-2.5',
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
            className={`group-scope ring-2 ${sizeHover} transition-all ${
                handleClick ? hoverText : ''
            } duration-300 out-expo ring-transparent outline-none focus:outline-none ${width}
            } ${height} rounded-full flex items-center overflow-hidden ${btnColor} `}
            onClick={handleClick}>
            <span
                className={`flex items-center gap-3  d-hdpi-2:gap-1.5 ${padding} transform transition-transform duration-300 out-expo ${offsetCenter}`}>
                {noicon ? children : <i className={`${icon} `}></i>}

                <span
                    className={`${textSize} whitespace-nowrap block opacity-0  group-scope-hover:opacity-100 transition-opacity duration-300 out-expo`}>
                    {labelHover}
                </span>
            </span>
        </button>
    );
};

export default CollapseButton;

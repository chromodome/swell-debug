import React, { useState } from 'react';
import Icons from '@/components/blocks/Icon/Icons';
import { handleRowReverse, urlArrLength } from 'helpers/FEutils';
import GenericBtn from './Map/GenericBtn';

const Block__HTML = ({ html, className }) => {
    return (
        <div className={`sm:p-4 ${className || ''}`}>
            <div
                dangerouslySetInnerHTML={{
                    __html: html
                }}
            />
        </div>
    );
};

const Block__InputSingle = ({
    whiteBg = false,
    locked = null,
    isDisabled = false,
    color = 'bg-green-50',
    height = 'h-14',
    width = 'w-full',
    margins = '',
    className = '',
    rounded = 'rounded-xl',
    icon = '',
    iconText = '',
    iconPadding,
    padding = `py-3 ${
        iconPadding ? iconPadding : icon || iconText ? 'pl-16 pr-4' : 'px-4'
    }`,
    type = 'text',
    id,
    name,
    value,
    handleChange,
    placeholder,
    error = false,
    rtl = false,
    fontSize = 'text-normal',
    labelPos = 'top',
    label,
    labelWidth = 'w-48',
    labelJustify = 'text-left',
    labelClass = 'text-xs px-2 text-gray-600 whitespace-nowrap',
    labelMargin = 'mb-2',
    responsive,
    disabledColor = 'bg-gray-200',
    iconClass,
    autoComplete=""
}) => {
    const [hidden, setHidden] = useState(true);
    const classIcon = hidden ? 'text-gray-400' : 'text-green-500';
    let newType = type;
    if (type === 'password') {
        if (locked && locked.isDisabled) {
        } else {
            newType = hidden ? 'password' : 'text';
        }
    }
    const errorClass = error
        ? 'border-red-300 focus:ring-red-200 focus:border-red-400 hover:ring-red-200'
        : 'focus:ring-green-200 focus:border-green-400 hover:ring-green-200 border-transparent';
    const passwordJSX =
        type === 'password' ? (
            <span
                className={`absolute right-24 top-1/2 transform -translate-y-1/2 cursor-pointer ${classIcon} `}
                onMouseUp={() => setHidden(true)}
                onMouseDown={() => setHidden(false)}
            >
                <Icons iName={hidden ? 'EYE_SLASH' : 'EYE'} size='xl' />
            </span>
        ) : null;

    const iconJSX =
        type !== 'password' && icon ? (
            <span className='absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400'>
                <Icons iName={icon} />
            </span>
        ) : null;

    return (
        <div className={`${margins} flex-1 `}>
            <div
                className={`${
                    labelPos === 'left'
                        ? responsive
                            ? 'flex flex-col'
                            : 'flex items-center '
                        : ''
                }`}
            >
                {label && (
                    <div
                        className={`${
                            responsive
                                ? 'mb-2 ml-2 text-xs text-gray-600 whitespace-nowrap'
                                : `${labelClass} ${labelWidth} ${labelJustify} ${labelMargin}`
                        } `}
                    >
                        {label}
                    </div>
                )}
                <div className={`relative ${width} flex items-center`}>
                    <input
                        // style={{
                        //     border:
                        //         locked && locked.isDisabled && locked.visible
                        //             ? '2px dashed red'
                        //             : ''
                        // }}
                        className={`${className} ${errorClass} ${width} ${height} ${rounded} ${padding} ${
                            handleRowReverse(rtl).rtl
                        } ${fontSize} block appearance-none placeholder-gray-400 placeholder-opacity-100 border leading-5 text-gray-700 focus:outline-none 
                        ring-4 ring-transparent 
                        ${
                            isDisabled ||
                            (locked && locked.isDisabled && locked.visible)
                                ? disabledColor
                                : `hover:bg-white focus:bg-white ${
                                      whiteBg ? 'bg-white' : 'bg-kn-gray-100'
                                  }`
                        }  transition duration-200 `}
                        onChange={handleChange}
                        type={newType}
                        id={id}
                        name={name || id}
                        value={value}
                        placeholder={placeholder}
                        disabled={(locked && locked.isDisabled) || isDisabled}
                        autoComplete={autoComplete}
                    />

                    {passwordJSX}
                    {/* {iconJSX} */}
                    {locked && locked.visible ? (
                        <GenericBtn
                            params={[...locked.param]}
                            handleActionBtn={locked.handleClick}
                            className={`transition-all ml-2
                            hover:bg-gray-900 hover:text-white
                            duration-300 out-expo outline-none focus:outline-none w-24
                            h-10 rounded-xl flex items-center justify-center `}
                        >
                            <i
                                className={`${
                                    locked.isDisabled
                                        ? 'ri-lock-line text-red-400'
                                        : 'ri-lock-unlock-line text-green-400'
                                } text-xl`}
                            ></i>
                        </GenericBtn>
                    ) : null}
                    {(icon || iconText) && (
                        <div
                            className={`absolute left-4 top-1/2 text-xl text-gray-600 transform -translate-y-1/2 flex items-center `}
                        >
                            {icon && <i className={icon}></i>}
                            <span className={`${iconClass}`}>{iconText}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Block__InputSingle2 = ({
    color = 'bg-green-50',
    height = 'h-14',
    width = 'w-full',
    margins = '',
    className = '',
    rounded = 'rounded-xl',
    padding = 'py-3 px-4',
    type = 'text',
    id,
    name,
    value,
    handleChange,
    placeholder,
    error = false,
    rtl = false
}) => {
    const errorClass = error
        ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
        : 'border-green-300 focus:border-green-400 focus:ring-green-200';
    return (
        <input
            className={`${className} ${errorClass} ${width} ${height} ${margins} ${rounded} ${padding} ${
                handleRowReverse(rtl).rtl
            } block appearance-none placeholder-gray-400 placeholder-opacity-100 border  text-gray-700 leading-5 focus:outline-none focus:ring-2 `}
            onChange={handleChange}
            type={type || 'text'}
            id={id}
            name={name || id}
            value={value}
            placeholder={placeholder}
        />
    );
};

export { Block__HTML, Block__InputSingle };

// ${
//     normal ? 'w-full ring-2 ring-transparent h-14 mb-4' : ''
// } ${
//     className || ''
// } py-2 px-4 focus:outline-none focus-within:ring-${
//     error
//         ? `kn-red ring-red-300 bg-red-50 placeholder-red-200`
//         : 'green-400 placeholder-kn-primary-400 bg-green-50'
// }  focus-within:ring-2 rounded-xl

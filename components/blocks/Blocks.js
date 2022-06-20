import React, { useState } from 'react';
import Icons from '@/components/blocks/Icon/Icons';
import { handleRowReverse, urlArrLength } from 'helpers/FEutils';
import GenericBtn from './Map/GenericBtn';
import classNames from 'classnames';

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
    height = 'h-14 d-hdpi-2:h-vw-14',
    width = 'w-full',
    margins = '',
    className = '',
    rounded = 'rounded-xl d-hdpi-2:rounded-vw-xl',
    icon = '',
    iconText = '',
    iconPadding,
    padding = `py-3 d-hdpi-2:py-vw-3 ${
        iconPadding
            ? iconPadding
            : icon || iconText
            ? 'pl-16 pr-4 d-hdpi-2:pl-vw-16 d-hdpi-2:pr-vw-4'
            : 'px-4 d-hdpi-2:px-vw-4'
    }`,
    type = 'text',
    id,
    name,
    value,
    handleChange,
    placeholder,
    error = false,
    rtl = false,
    fontSize = 'text-base d-hdpi-2:text-vw-base',
    labelPos = 'top',
    label,
    labelWidth = 'w-48 d-hdpi-2:w-vw-48',
    labelJustify = 'text-left',
    labelClass = 'text-xs d-hdpi-2:text-vw-xs px-2 d-hdpi-2:px-vw-2 text-gray-600 whitespace-nowrap',
    labelMargin = 'mb-2 d-hdpi-2:mb-vw-2',
    responsive,
    disabledColor = 'bg-gray-200',
    iconClass,
    autoComplete = '',
    flex = 'flex-1 d-hdpi-2:flex-initial',
    focused,
    ...inputProps
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
                className={`absolute right-24 d-hdpi-2:right-vw-24 top-1/2 transform -translate-y-1/2 cursor-pointer ${classIcon} `}
                onMouseUp={() => setHidden(true)}
                onMouseDown={() => setHidden(false)}>
                <Icons iName={hidden ? 'EYE_SLASH' : 'EYE'} size="xl" />
            </span>
        ) : null;

    const iconJSX =
        type !== 'password' && icon ? (
            <span className="absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400">
                <Icons iName={icon} />
            </span>
        ) : null;

    return (
        <div className={`${margins} ${flex} `}>
            <div
                className={`${
                    labelPos === 'left'
                        ? responsive
                            ? 'flex flex-col'
                            : 'flex items-center '
                        : ''
                }`}>
                {label && (
                    <div
                        className={`${
                            responsive
                                ? 'mb-2 ml-2 d-hdpi-2:mb-vw-2 d-hdpi-2:,l-vw-2 text-xs d-hdpi-2:text-vw-xs text-gray-600 whitespace-nowrap'
                                : `${labelClass} ${labelWidth} ${labelJustify} ${labelMargin}`
                        } `}>
                        {label}
                    </div>
                )}
                <div className={`relative ${width} flex items-center`}>
                    <input
                        {...inputProps}
                        // style={{
                        //     border:
                        //         locked && locked.isDisabled && locked.visible
                        //             ? '2px dashed red'
                        //             : ''
                        // }}

                        className={classNames(
                            className,
                            errorClass,
                            width,
                            height,
                            rounded,
                            padding,
                            handleRowReverse(rtl).rtl,
                            fontSize,
                            focused ? ' input-focused' : 'input',
                            isDisabled ||
                                (locked && locked.isDisabled && locked.visible)
                                ? disabledColor
                                : `hover:bg-white focus:bg-white ${
                                      whiteBg ? 'bg-white' : 'bg-kn-gray-100'
                                  }`,
                            'block appearance-none placeholder-gray-400 placeholder-opacity-100 border leading-5 d-hdpi-2:leading-tight text-gray-700 focus:outline-none   ring-4 d-hdpi-2:ring-2 ring-transparent transition duration-200'
                        )}
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
                            // className={`transition-all ml-2
                            // hover:bg-gray-900 hover:text-white
                            // duration-300 out-expo outline-none focus:outline-none w-24
                            // h-10 rounded-xl flex items-center justify-center `}
                            bgColor={classNames(
                                locked.isDisabled
                                    ? 'bg-red-100 hover:bg-gray-900'
                                    : 'bg-green-100 hover:bg-gray-900'
                            )}
                            textColor={classNames(
                                locked.isDisabled
                                    ? 'text-red-600  hover:text-white'
                                    : 'text-green-900  hover:text-white'
                            )}
                            rounded="rounded-xl d-hdpi-2:rounded-vw-xl"
                            textSize="text-sm"
                            className={`transition-all ml-2 duration-300 out-expo w-16 d-hdpi-2:w-vw-16 d-hdpi-2:h-vw-10 d-hdpi-2:ml-vw-2
                            h-10  flex items-center justify-center `}>
                            <i
                                className={`${
                                    locked.isDisabled
                                        ? 'ri-lock-line text-red-400a'
                                        : 'ri-lock-unlock-line text-green-400a'
                                } text-xl d-hdpi-2:text-vw-xl`}></i>
                        </GenericBtn>
                    ) : null}
                    {(icon || iconText) && (
                        <div
                            className={`absolute left-4 d-hdpi-2:left-vw-4 top-1/2 text-xl d-hdpi-2:text-vw-xl text-gray-600 transform -translate-y-1/2 flex items-center `}>
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
    height = 'h-14 ',
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

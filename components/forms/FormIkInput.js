import React, { useEffect, useState } from 'react';

import Icons from '@/components/blocks/Icon/Icons';
import { handleRowReverse } from '@/helpers/FEutils';
import { useField } from 'formik';
import PopoverBlock from '@/components/forms/PopoverBlock';

const cssError = {
    touchedError:
        'border-red-300 focus:ring-red-200 focus:border-red-400 hover:ring-red-200',
    noTouchedError:
        'border-transparent hover:ring-green-200 focus:ring-red-200 focus:border-red-400',
    noError:
        'focus:ring-green-200 focus:border-green-400 hover:ring-green-200 border-transparent'
};

const FormIkInput = ({
    className = '',
    rounded = 'rounded-xl',
    padding = 'py-3 px-4',
    height = 'h-14',
    width = 'w-full',
    text = 'text-sm',
    icon,
    type = 'text',
    placeholder,
    error = false,
    rtl = false,
    ...props
}) => {
    const [field, meta] = useField(props);
    const [hidden, setHidden] = useState(true);
    const [classError, setClassError] = useState();

    useEffect(() => {
        if (meta.touched) {
            if (meta.error) setClassError(cssError.touchedError);
            if (!meta.error) setClassError(cssError.noError);
        } else {
            if (meta.error) setClassError(cssError.noTouchedError);
            if (!meta.error) setClassError(cssError.noError);
        }
        // console.log('meta field', meta);
    }, [meta, field.value]);

    const classIcon = hidden ? 'text-gray-400' : 'text-green-500';

    let newType = type;
    if (type == 'password') {
        newType = hidden ? 'password' : 'text';
    }

    const passwordJSX =
        type === 'password' ? (
            <span
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer ${classIcon} `}
                onMouseUp={() => setHidden(true)}
                onMouseDown={() => setHidden(false)}>
                <Icons iName={hidden ? 'EYE_SLASH' : 'EYE'} size="xl" />
            </span>
        ) : null;

    const iconJSX =
        type !== 'password' && icon ? (
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400">
                <Icons iName={icon} />
            </span>
        ) : null;

    return (
        <div className={`relative w-full ${className}`}>
            {type === 'hidden' ? (
                <input {...field} {...props} className="" />
            ) : (
                <>
                    <input
                        className={`${text} ${width} ${height} ${rounded} ${padding}  ${classError} ${
                            handleRowReverse(rtl).rtl
                        } block appearance-none placeholder-gray-400 placeholder-opacity-100 border leading-5 text-gray-700 focus:outline-none 
                        ring-4 ring-transparent 
                        bg-kn-gray-100 hover:bg-white focus:bg-white transition duration-200`}
                        type={newType}
                        placeholder={placeholder}
                        {...field}
                        {...props}
                    />
                    {passwordJSX}
                    {iconJSX}
                    {meta.touched && meta.error && (
                        <div className="absolute z-100 -right-8 top-1/2 transform -translate-y-1/2 cursor-pointer ">
                            <PopoverBlock
                                element={
                                    <i className="ri-error-warning-line text-xl text-red-400"></i>
                                }>
                                <div className="w-48 text-xs p-4 bg-white select-none">
                                    {meta.error}
                                </div>
                            </PopoverBlock>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FormIkInput;

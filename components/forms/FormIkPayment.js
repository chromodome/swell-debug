import React, { useEffect, useState } from 'react';

import Icons from '@/components/blocks/Icon/Icons';
import { handleRowReverse } from '@/helpers/FEutils';
import { useField } from 'formik';
import PopoverBlock from '@/components/forms/PopoverBlock';
import Cleave from 'cleave.js/react';
import { CardAmex, CardMastercard, CardVisa } from '@/components/svg/BankCards';

const cssError = {
    touchedError:
        'border-red-300 focus:ring-red-200 focus:border-red-400 hover:ring-red-200',
    noTouchedError:
        'border-transparent hover:ring-green-200 focus:ring-red-200 focus:border-red-400',
    noError:
        'focus:ring-green-200 focus:border-green-400 hover:ring-green-200 border-transparent'
};

const commonClasses = {
    zIndex: {
        active: 'z-100',
        inactive: ''
    },
    label: {
        active: '-translate-y-6 scale-75',
        inactive: '-translate-y-1/2 scale-100'
    }
};

// const validationIcons = {
//     visa: 'ri-visa-line',
//     mastercard: 'ri-mastercard-line',
//     amex: 'lab la-cc-amex',
//     default: 'ri-check-line'
// };

const validationIcons = {
    visa: <CardVisa />,
    mastercard: <CardMastercard />,
    amex: <CardAmex />,
    default: <i className="ri-check-line" />
};

const FormIkPayment = ({
    className = '',
    padding = 'py-3 px-4',
    height = 'h-32',
    width = 'w-full',
    text = 'text-sm',
    icon,
    type = 'text',
    error = false,
    rtl = false,
    label,
    radius,
    radiusActive,
    placeholder,
    name,
    filterMode,
    cardMode,
    options,
    ...props
}) => {
    const [field, meta, helpers] = useField({ name });
    const [hidden, setHidden] = useState(true);
    const [classError, setClassError] = useState();
    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);
    const [validIcon, setValidIcon] = useState(null);
    useEffect(() => {
        if (touched) {
            if (meta.error) setClassError(cssError.touchedError);
            if (!meta.error) setClassError(cssError.noError);
        } else {
            if (meta.error) setClassError(cssError.noTouchedError);
            if (!meta.error) setClassError(cssError.noError);
        }
        // console.log('meta field', meta);
    }, [meta, field.value]);

    const [classes, setClasses] = useState({
        label: commonClasses.label.inactive,
        zIndex: commonClasses.zIndex.inactive,
        placeholder: ''
    });

    const options2 = {
        ...options,
        onCreditCardTypeChanged: function (type) {
            setValidIcon(validationIcons[type]);
        }
    };

    const handleChange = (event) => {
        helpers.setValue(
            filterMode ? event.target.rawValue : event.target.value
        );
        // setInputValue(event.target.rawValue);
        // console.log('input value', inputValue);
    };

    const handleInputFocus = (event) => {
        setClasses({
            ...classes,

            label: commonClasses.label.active,
            zIndex: commonClasses.zIndex.active,
            placeholder
        });
        setTouched(true);
    };

    const handleInputBlur = (event) => {
        if (event.target.value) {
            setClasses({
                ...classes,

                label: commonClasses.label.active,
                zIndex: commonClasses.zIndex.inactive,
                placeholder
            });
        } else {
            setClasses({
                ...classes,

                label: commonClasses.label.inactive,
                zIndex: commonClasses.zIndex.inactive,
                placeholder: ''
            });
        }
    };

    const handleInputHover = (event) => {
        setClasses({
            ...classes,
            zIndex: commonClasses.zIndex.active
        });
    };

    const handleInputLeave = (event) => {
        setClasses({
            ...classes,
            zIndex: commonClasses.zIndex.inactive
        });
    };

    return (
        <>
            <label className={`flex-1 relative ${classes.zIndex}`}>
                <input
                    type="hidden"
                    name={name}
                    className=""
                    // value={inputValue}
                    {...field}
                />
                <div
                    className={`pointer-events-none origin-left absolute top-1/2 left-6 transform ${classes.label} transition-transform `}>
                    <div className="flex items-center gap-2 text-gray-600">
                        {icon && <i className={`text-md ${icon}`}></i>}
                        <span className="text-sm text-gray-800">{label}</span>
                    </div>
                </div>
                {cardMode && validIcon && (
                    <div
                        className={`pointer-events-none origin-right absolute top-1/2 -translate-y-1/2 transform right-12`}>
                        {validIcon}
                    </div>
                )}
                <div className={`w-full flex`}>
                    {React.createElement(filterMode ? Cleave : 'input', {
                        ...props,
                        options: options2,
                        onFocus: (event) => handleInputFocus(event),
                        onBlur: (event) => handleInputBlur(event),
                        onMouseOver: (event) => handleInputHover(event),
                        onMouseLeave: (event) => handleInputLeave(event),
                        onChange: (e) => handleChange(e),
                        placeholder: classes.placeholder,
                        type: type,
                        name: `${name}_masked`,
                        className: `text-sm pt-6 px-6 pb-2 w-full bg-white ${radius} zborder-transparent border border-gray-3001 ring-4 ring-transparent transiton duration-200 hover:${radiusActive} zhover:border-transparent hover:bg-white zhover:ring-green-200 focus:outline-none focus:${radiusActive} zfocus:border-green-400 zfocus:ring-green-200 ${classError}
                        `
                    })}
                    {/* <Cleave
                        onFocus={(event) => handleInputFocus(event)}
                        onBlur={(event) => handleInputBlur(event)}
                        onMouseOver={(event) => handleInputHover(event)}
                        onMouseLeave={(event) => handleInputLeave(event)}
                        onChange={(e) => handleChange(e)}
                        placeholder={classes.placeholder}
                        type={type}
                        name={`${name}_masked2`}
                        {...props}
                        className={`text-sm pt-6 px-6 pb-2 w-full bg-white ${radius} zborder-transparent border border-gray-3001 ring-4 ring-transparent transiton duration-200 hover:${radiusActive} zhover:border-transparent hover:bg-white zhover:ring-green-200 focus:outline-none focus:${radiusActive} zfocus:border-green-400 zfocus:ring-green-200 ${classError}
                             `}
                    /> */}
                </div>
                {touched && meta.error && (
                    <div className="absolute z-100 right-4 top-1/2 transform -translate-y-1/2 cursor-pointer ">
                        <PopoverBlock
                            element={
                                <i className="ri-error-warning-line text-xl text-red-400"></i>
                            }>
                            <div className="max-w-xs w-max text-xs p-4 bg-gray-800 text-white select-none">
                                {meta.error}
                            </div>
                        </PopoverBlock>
                    </div>
                )}
            </label>
        </>
    );
};

export default FormIkPayment;

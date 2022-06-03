import classNames from 'classnames';
import { handleRowReverse } from 'helpers/FEutils';

const InputDate = ({
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
    autoComplete = '',
    focused,
    ...inputProps
}) => {
    const errorClass = error
        ? 'border-red-300 focus:ring-red-200 focus:border-red-400 hover:ring-red-200'
        : 'focus:ring-green-200 focus:border-green-400 hover:ring-green-200 border-transparent';
    return (
        <div className={`${margins} flex-1 `}>
            <div
                className={classNames(
                    labelPos === 'left'
                        ? responsive
                            ? 'flex flex-col'
                            : 'flex items-center '
                        : ''
                )}>
                {label && (
                    <div
                        className={classNames(
                            responsive
                                ? 'mb-2 ml-2 text-xs text-gray-600 whitespace-nowrap'
                                : `${labelClass} ${labelWidth} ${labelJustify} ${labelMargin}`
                        )}>
                        {label}
                    </div>
                )}
                <div
                    className={classNames('relative flex items-center', width)}>
                    <input
                        {...inputProps}
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
                            'block appearance-none placeholder-gray-400 placeholder-opacity-100 border leading-5 text-gray-700 focus:outline-none       ring-4 ring-transparent transition duration-200'
                        )}
                        type={type}
                        id={id}
                        name={name || id}
                        value={value}
                        placeholder={placeholder}
                    />
                </div>
            </div>
        </div>
    );
};

export default InputDate;

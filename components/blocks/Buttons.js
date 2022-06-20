import Icons from 'components/blocks/Icons';
import { handleRowReverse } from 'helpers/FEutils';

const ButtonsHelp = ({ handleClick }) => {
    return (
        <button
            onClick={handleClick}
            className="focus:outline-none hover:bg-gray-200 hover:text-gray-600 text-gray-400 rounded-full transition-colors duration-300">
            <div className="">
                <Icons iName="HELP" size="6xl" />
            </div>
        </button>
    );
};

const ButtonsAdd = ({
    handleClick,
    className,
    label,
    color = 'bg-kn-primary',
    text = 'text-gray-800',
    textClass,
    rtl,
    btnClass,
    iconOnly
}) => {
    return (
        <button
            onClick={handleClick}
            className={`${
                className || ''
            } absolute -bottom-2.5 transform translate-y-1/2  rounded-full focus:outline-none ${btnClass}`}>
            <div
                className={`${
                    rtl ? handleRowReverse(rtl).flex : ''
                }  hover:bg-gray-800 hover:text-white ${color} px-6 rounded-full h-12  flex justify-center items-center uppercase font-medium ${
                    rtl ? 'text-lg ' : 'tracking-wider text-sm'
                } ${text}`}>
                {iconOnly ? (
                    <span className="flex items-center justify-center ">
                        <i className={`${iconOnly} text-2xl -mr-1`}></i>
                    </span>
                ) : (
                    <>
                        <Icons
                            iName="PLUS"
                            size="xl"
                            iClasses={`mt-0.5 ${rtl ? 'ml-2' : 'mr-2'}`}
                        />
                        <div className={`${textClass} ${rtl ? '-mt-1' : ''}`}>
                            {label}
                        </div>
                    </>
                )}
            </div>
        </button>
    );
};

const ButtonsAddMain = ({ handleClick, label, rtl, full, disabled }) => {
    return (
        <button
            disabled={disabled}
            onClick={handleClick}
            className={`${disabled ? 'cursor-default' : ''} ${
                full ? 'h-full' : ''
            } ${
                rtl ? handleRowReverse(rtl).flex : ''
            } transition-colors duration-200 ease-in-out flex justify-center items-center rounded-2xl py-4 px-6 uppercase  focus:outline-none text-gray-800 hover:bg-gray-200  ${
                rtl
                    ? 'text-xl font-medium'
                    : 'tracking-widest text-md font-base'
            }`}>
            <Icons
                iName="PLUS"
                size="2xl"
                iClasses={`mt-0.5 ${rtl ? 'ml-2' : 'mr-2'}`}
            />
            <div className={`${rtl ? '-mt-1' : ''}`}>{label}</div>
        </button>
    );
};

const ButtonsNextPrev = ({
    next = false,
    prev = false,
    icon = 'CHEVRON',
    handleClick,
    disabled = false,
    rtl = false
}) => {
    const pointing = next
        ? !rtl
            ? 'RIGHT'
            : 'LEFT'
        : prev
        ? !rtl
            ? 'LEFT'
            : 'RIGHT'
        : 'RIGHT';
    const disabledClass = disabled
        ? 'border-gray-300 text-gray-300 pointer-events-none'
        : 'text-black border-kn-primary hover:bg-gray-800 hover:border-gray-800 hover:text-white';
    return (
        <button
            disabled={disabled}
            onClick={handleClick}
            className={`${disabledClass} focus:outline-none h-9 w-9 border-2  rounded-full flex items-center justify-center`}>
            <Icons
                iName={`ARROW_${pointing}_${icon}`.toUpperCase()}
                size="2xl"
            />
        </button>
    );
};

const ButtonsGroupNextPrev = ({
    disabled,
    nextAction,
    prevAction,
    isNext = false,
    isPrev = false,
    className = '',
    rtl,
    alwaysOn = true
}) => {
    return (
        <div className={`flex ${rtl ? 'flex-row' : 'flex-row-reverse'}`}>
            <div
                className={`flex gap-2 ${className} ${
                    rtl ? 'flex-row-reverse' : 'flex-row'
                } ${isPrev && isNext ? (alwaysOn ? '' : 'hidden') : ''}`}>
                <ButtonsNextPrev
                    disabled={isPrev || disabled}
                    handleClick={prevAction}
                    prev
                    rtl={rtl}
                />

                <ButtonsNextPrev
                    disabled={isNext || disabled}
                    handleClick={nextAction}
                    next
                    rtl={rtl}
                />
            </div>
        </div>
    );
};

const ButtonsClose = ({
    rtl = false,
    handleClose,
    type = 'normal',
    closeButton = false
}) => {
    const posClass = {
        thumb: {
            pos: `-top-3 d-hdpi-2:-top-1.5 -right-1 d-hdpi-2:-right-0.5`,
            btn: 'w-6 h-6 text-white bg-kn-red hover:bg-gray-900 d-hdpi-2:w-vw-6 h-vw-6'
        },
        normal: {
            pos: `top-3 d-hdpi-2:top-vw-3 right-4 d-hdpi-2:right-vw-4`,
            btn: 'p-1 text-gray-900 opacity-30 hover:opacity-100 d-hdpi-2:p-vw-1'
        },
        image: {
            pos: `top-4 d-hdpi-2:top-vw-4 right-4 d-hdpi-2:right-vw-4`,
            btn: 'w-6 h-6 text-white bg-black bg-opacity-30 hover:bg-opacity-100 d-hdpi-2:w-vw-6 d-hdpi-2:h-vw-6'
        },
        imageRound: {
            pos: `top-0 right-0 `,
            btn: 'w-6 h-6 text-white bg-black bg-opacity-30 hover:bg-opacity-100 d-hdpi-2:w-vw-6 d-hdpi-2:h-vw-6'
        }
    };
    return (
        <div
            className={`absolute transform ${posClass[type].pos}  rounded-full flex z-50  `}>
            <button
                onClick={handleClose}
                className={`${
                    closeButton
                        ? 'bg-gray-100 text-gray-800 px-4 d-hdpi-2:px-vw-4 hover:bg-gray-900 hover:text-white'
                        : posClass[type].btn
                } border-2  border-transparent rounded-xl d-hdpi-2:rounded-vw-xl  focus:outline-none gap-2 d-hdpi-2:gap-1 flex items-center justify-center`}>
                {closeButton && <span>Close Window</span>}
                <i className="ri-close-line text-xl d-hdpi-2:text-vw-xl"></i>
                {/* <Icons iName="CLOSEALT" size="xl" iClasses="" /> */}
            </button>
        </div>
    );
};

export {
    ButtonsAdd,
    ButtonsAddMain,
    ButtonsHelp,
    ButtonsNextPrev,
    ButtonsGroupNextPrev,
    ButtonsClose
};

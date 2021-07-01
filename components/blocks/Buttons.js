import Icons from '@/blocks/Icons';
import { handleRowReverse, urlArrLength } from '@/helpers/FEutils';

const Buttons__Help = ({ handleClick, className, label, color, text }) => {
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

const Buttons__Add = ({ handleClick, className, label, color, text, rtl }) => {
    return (
        <button
            onClick={handleClick}
            className={`${rtl ? handleRowReverse(rtl).flex : ''} ${
                className || ''
            } absolute -bottom-2.5 transform-gpu translate-y-1/2 text-gray-800 flex justify-center items-center rounded-full focus:outline-none hover:bg-gray-800 hover:text-white bg-${
                color || 'kn-primary'
            } text-${text || 'white'}  h-12 px-6 uppercase font-medium  ${
                rtl ? 'text-lg ' : 'tracking-wider text-sm'
            }`}>
            <Icons
                iName="PLUS"
                size="xl"
                iClasses={`mt-0.5 ${rtl ? 'ml-2' : 'mr-2'}`}
            />
            <div className={`${rtl ? '-mt-1' : ''}`}>{label}</div>
        </button>
    );
};

const Buttons__AddMain = ({ handleClick, label, rtl, full }) => {
    return (
        <button
            onClick={handleClick}
            className={`${full ? 'h-full' : ''} ${
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
            <i className="las la-ban"></i>
            <div className={`${rtl ? '-mt-1' : ''}`}>{label}</div>
        </button>
    );
};

const Buttons__NextPrev = ({
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
                // iName={`CLOSE`}
                size="2xl"
            />
        </button>
    );
};

const Buttons__GroupNextPrev = ({
    nextEnabled,
    nextAction,
    prevEnabled,
    prevAction,
    isNext,
    isPrev,
    className = '',
    rtl = false
}) => {
    return (
        <div className={`flex ${rtl ? 'flex-row' : 'flex-row-reverse'}`}>
            <div
                className={`flex gap-2 ${className} ${
                    rtl ? 'flex-row-reverse' : 'flex-row'
                } ${!prevEnabled && !nextEnabled ? 'hidden' : ''}`}>
                <Buttons__NextPrev
                    disabled={!prevEnabled}
                    handleClick={prevAction}
                    prev
                    rtl={rtl}
                />

                <Buttons__NextPrev
                    disabled={!nextEnabled}
                    handleClick={nextAction}
                    next
                    rtl={rtl}
                />
            </div>
        </div>
    );
};

const Buttons__Close = ({ rtl = false, handleClose, type = 'normal' }) => {
    const posClass = {
        thumb: {
            pos: `-top-3 -${handleRowReverse(rtl).right}-1 `,
            btn: 'w-6 h-6 text-white bg-kn-red hover:bg-gray-900'
        },
        normal: {
            pos: `top-3 ${handleRowReverse(rtl).right}-4 `,
            btn: 'p-1 text-gray-900 opacity-30 hover:opacity-100'
        },
        image: {
            pos: `top-4 ${handleRowReverse(rtl).right}-4 `,
            btn: 'w-6 h-6 text-white bg-black bg-opacity-30 hover:bg-opacity-100'
        }
    };
    return (
        <div
            className={`absolute transform-gpu ${posClass[type].pos}  rounded-full flex z-50  `}>
            <button
                onClick={handleClose}
                className={`border-2  border-transparent rounded-full ${posClass[type].btn}  focus:outline-none  flex items-center justify-center`}>
                <Icons iName="CLOSEALT" size="xl" iClasses="" />
            </button>
        </div>
    );
};

const Button__Selectable = ({
    selected = false,
    icon,
    children,
    handleClick
}) => {
    return (
        <button
            className={`flex justify-center items-center
                py-1 p-3 mb-2 mr-2 rounded text-xs ${
                    selected
                        ? 'bg-gray-900 text-kn-white'
                        : 'border-2 border-kn-primary text-kn-primary hover:bg-kn-primary hover:text-kn-white'
                }`}
            onClick={() => handleClick(children)}>
            {selected && (
                <Icons iName={icon} iClasses="text-kn-white mr-2" size="sm" />
            )}
            {children}
        </button>
    );
};

const Button = ({ icon, children, iconClasses, wrapperClasses }) => {
    return (
        <button className={wrapperClasses}>
            {children}
            {icon ? (
                <Icons
                    iName={icon}
                    iClasses={iconClasses ? iconClasses : 'text-kn-white ml-2'}
                    size="sm"
                />
            ) : null}
        </button>
    );
};

export {
    Buttons__Add,
    Buttons__AddMain,
    Buttons__Help,
    Buttons__NextPrev,
    Buttons__GroupNextPrev,
    Buttons__Close,
    Button,
    Button__Selectable
};

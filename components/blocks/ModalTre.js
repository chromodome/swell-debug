/* This example requires Tailwind CSS v2.0+ */

import { connect } from 'react-redux';
import translations from 'constants/translations';
import Icons from 'components/blocks/Icons';

import { handleRowReverse } from 'helpers/FEutils';

const ModalButtonNS = ({
    globalState: { lang },
    label,
    color = 'green',
    icon,
    handleClick,
    isDisabled = false
}) => {
    const rtl = !!translations[lang].rtl;
    // const colorObj = uiStruct.ui.styles.buttons;
    const colorClass = isDisabled
        ? 'bg-gray-200 text-gray-400 md:w-32a px-8'
        : 'bg-green-400 text-green-900 px-8';
    // ? colorObj[color] ?? colorObj.green
    // : colorObj.default;

    const gapClass = icon && label ? 'gap-2' : '';

    return (
        <button
            disabled={isDisabled}
            onClick={handleClick}
            className={`flex-none flex ${
                handleRowReverse(rtl).flex
            } items-center  justify-center ${gapClass} h-12 rounded-xl ${
                !isDisabled ? 'hover:bg-gray-900 hover:text-white' : ''
            }  min-w-40 focus:outline-none ${colorClass}`}>
            {icon && (
                <Icons
                    iName={icon.name}
                    size={icon.size}
                    iClasses="font-normal"
                />
            )}
            <div className="font-medium">
                {icon ? label || '' : label || 'undefined name'}
            </div>
        </button>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState
});

const ModalButton = connect(mapStateToProps)(ModalButtonNS);

export { ModalButton };

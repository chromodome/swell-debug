import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
    CheckIcon,
    SelectorIcon,
    ChevronDownIcon
} from '@heroicons/react/solid';

import { connect } from 'react-redux';
import { handleRowReverse } from 'helpers/FEutils';
import translations from 'constants/translations';
import uiStruct from 'constants/uiStruct';

function ListBoxGeneric({
    responsive,
    color = 'bg-kn-gray-100',
    listData,
    prefix,
    val,
    handleChange,
    globalState: { lang },
    textClass = '',
    noPrefixSE = false,
    className = '',
    direction = 'bottom',
    width = 'w-full',
    fontSize = 'sm:text-base d-hdpi-2:text-vw-base',

    listHeight = 'max-h-64 d-hdpi-2:max-h-vw-64',
    height = 'h-14 d-hdpi-2:h-vw-14',
    labelPos = 'top',
    label,
    labelWidth = 'w-48 d-hdpi-2:w-vw-48',
    labelJustify = 'text-left',
    labelClass = 'text-xs d-hdpi-2:text-vw-xs px-2 d-hdpi-2:px-vw-2 text-gray-600 whitespace-nowrap',
    labelMargin = 'mb-2 d-hdpi-2:mb-vw-2'
}) {
    const rtl = !!translations[lang].rtl;

    const handleData = (data) => {
        return data.name;
    };

    return (
        <>
            <div className={`flex-1 d-hdpi-2:flex-initial`}>
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
                                    ? 'mb-2 ml-2 text-xs d-hdpi-2:mb-vw-2 d-hdpi-2:ml-vw-2 d-hdpi-2:text-vw-xs text-gray-600 whitespace-nowrap'
                                    : `${labelClass} ${labelWidth} ${labelJustify} ${labelMargin}`
                            } `}>
                            {label}
                        </div>
                    )}
                    <div className={`${className} ${width} `}>
                        <Listbox value={val} onChange={handleChange}>
                            <div
                                className={`z-50 relative rounded-xl d-hdpi-2:rounded-vw-xl 
                                border border-transparent focus-within:border-green-400
                                ${color} hover:bg-white focus-within:bg-white
                                ring-4 d-hdpi-2:ring-2  ring-transparent hover:ring-green-200 focus-within:ring-green-200
                                transition duration-200
                                    
                                `}>
                                <Listbox.Button
                                    className={`align-right ${
                                        handleRowReverse(rtl).rtl
                                    } relative w-full ${height} pl-6 pr-10 d-hdpi-2:pl-vw-6 d-hdpi-2:pr-vw-10 text-left rounded-xl d-hdpi-2:rounded-vw-xl shadow-2xl-green-4005 cursor-default outline-none focus:outline-none focus-visible:ring-opacity-75a  ${fontSize}`}>
                                    <span className="block truncate">
                                        {val.name}
                                    </span>
                                    <span
                                        className={`absolute inset-y-0 ${
                                            handleRowReverse(rtl).right
                                        }-0 flex items-center pr-3 d-hdpi-2:pr-vw-3 pointer-events-none`}>
                                        <ChevronDownIcon
                                            className="w-5 h-5 d-hdpi-2:w-vw-6 d-hdpi-2:h-vw-6 text-gray-700"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0">
                                    <div
                                        className={`mt-1 d-hdpi-2:mt-vw-1 bg-white w-full absolute transform ${
                                            direction == 'top'
                                                ? '-translate-y-full -top-2 d-hdpi-2:-top-1'
                                                : ''
                                        } py-4 d-hdpi-2:py-vw-4 overflow-hidden rounded-xl d-hdpi-2:rounded-vw-xl block shadow-2xl-green-400 ring-1 ring-black ring-opacity-5`}>
                                        <Listbox.Options
                                            className={`overflow-auto text-base d-hdpi-2:text-vw-base ${listHeight}  focus:outline-none sm:text-base`}>
                                            {listData.map((lData) => (
                                                <Listbox.Option
                                                    key={lData.id}
                                                    value={lData}
                                                    className={({ active }) =>
                                                        `${
                                                            active
                                                                ? 'text-green-900 bg-green-100'
                                                                : 'text-gray-900'
                                                        } cursor-default select-none relative py-2 d-hdpi-2:py-vw-2 pl-10 pr-4 d-hdpi-2:pl-vw-10 d-hdpi-2:pr-vw-4`
                                                    }>
                                                    {({ selected, active }) => (
                                                        <>
                                                            <span
                                                                className={`${
                                                                    lData.name ==
                                                                    val.name
                                                                        ? 'font-medium'
                                                                        : 'font-normal'
                                                                } block truncate ${textClass}`}>
                                                                {handleData(
                                                                    lData
                                                                )}
                                                            </span>
                                                            {lData.name ===
                                                            val.name ? (
                                                                <span
                                                                    className={`${
                                                                        active
                                                                            ? 'text-green-400'
                                                                            : 'text-green-400'
                                                                    }
        absolute inset-y-0 ${
            handleRowReverse(rtl).left
        }-0 flex items-center pl-3 d-hdpi-2:pl-vw-3`}>
                                                                    <CheckIcon
                                                                        className="w-5 h-5 d-hdpi-2:w-vw-6 d-hdpi-2:h-vw-6"
                                                                        aria-hidden="true"
                                                                    />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </div>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    globalState: state.globalState
});

export default connect(mapStateToProps, null)(ListBoxGeneric);

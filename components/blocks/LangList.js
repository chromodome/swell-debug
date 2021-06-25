import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';

import { connect } from 'react-redux';

import { handleRowReverse } from 'helpers/FEutils';
import translations from 'constants/translations';

function LangList({
    listData,

    val,
    handleChange,
    globalState: { lang },
    textClass = '',
}) {
    const rtl = !!translations[lang].rtl;

    const handleData = (data) => {
        return data.name;
    };

    return (
        <>
            <div
                className={`flex items-center ${
                    handleRowReverse(rtl).mr
                }-4 w-32 justify-end`}
            >
                <span className='block truncate uppercase'>{val.short}</span>
                <Listbox value={val} onChange={handleChange}>
                    <div className={`z-50 relative `}>
                        <Listbox.Button
                            className={`focus:outline-none w-12 h-12 rounded-full mx-3
                            flex items-center justify-center text-xl hover:bg-green-100 hover:text-green-600`}
                        >
                            <i className='ri-global-line'></i>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <div
                                className={` bg-white w-32 absolute ${
                                    handleRowReverse(rtl).right
                                }-0 py-4 overflow-hidden rounded-xl block shadow-2xl-green-400 ring-1 ring-black ring-opacity-5`}
                            >
                                <Listbox.Options className='overflow-auto text-base max-h-80  focus:outline-none sm:text-base'>
                                    {listData.map((lData) => (
                                        <Listbox.Option
                                            key={lData.id}
                                            value={lData}
                                            className={({ active }) =>
                                                `${
                                                    active
                                                        ? 'text-green-900 bg-green-100'
                                                        : 'text-gray-900'
                                                }
cursor-default select-none relative py-2 ${handleRowReverse(rtl).pl}-10 ${
                                                    handleRowReverse(rtl).pr
                                                }-4`
                                            }
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={`${
                                                            lData.name ==
                                                            val.name
                                                                ? 'font-medium'
                                                                : 'font-normal'
                                                        } block truncate ${textClass}`}
                                                    >
                                                        {handleData(lData)}
                                                    </span>
                                                    {lData.name == val.name ? (
                                                        <span
                                                            className={`${
                                                                active
                                                                    ? 'text-green-400'
                                                                    : 'text-green-400'
                                                            }
absolute inset-y-0 ${handleRowReverse(rtl).left}-0 flex items-center ${
                                                                handleRowReverse(
                                                                    rtl
                                                                ).pl
                                                            }-3`}
                                                        >
                                                            <CheckIcon
                                                                className='w-5 h-5'
                                                                aria-hidden='true'
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
        </>
    );
}

const mapStateToProps = (state) => ({
    globalState: state.globalState,
});

export default connect(mapStateToProps, null)(LangList);
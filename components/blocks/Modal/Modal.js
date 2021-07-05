import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Icons from '@/blocks/Icon/Icons';

export default function Modal({
    isOpen = true,
    setIsClose = () => {},
    title = 'Delete interest',
    iconType = 'default',
    iconName = 'EDIT',
    children
}) {
    const iconStyles = {
        primary: 'bg-kn-primary text-kn-white',
        secondary: 'bg-green-600 text-kn-white',
        default: 'bg-kn-yellow'
    };
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-40  overflow-auto"
                    onClose={() => {}}>
                    <div className="px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <Dialog.Overlay className="fixed z-10 inset-0 overflow-y-auto " />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95 ">
                            <div
                                className="z-100 px-10 py-8 mt-36
                                w-96 h-64 text-left align-middle 
                                transition-all transform bg-white 
                                shadow-xl rounded-2xl shadow-md overflow-visible">
                                <button
                                    className="z-40 overflow-visible absolute right-7 top-3 cursor-pointer "
                                    onClick={setIsClose}>
                                    <Icons
                                        iName="close"
                                        size="lg text-kn-primary"
                                    />
                                </button>
                                {iconName && (
                                    <div
                                        className={`absolute -top-6 z-50 rounded-full h-12 w-12 flex align-center justify-center ${iconStyles[iconType]}`}>
                                        <Icons iName={iconName} size="3xl" />
                                    </div>
                                )}

                                <Dialog.Title className="mb-4">
                                    {title}
                                </Dialog.Title>
                                {children}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

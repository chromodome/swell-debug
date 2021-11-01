import { Popover, Transition } from '@headlessui/react';

import { Fragment } from 'react';

export default function PopoverBlock({ element, children }) {
    return (
        <div className="">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1">
                            <Popover.Panel className="absolute transform -translate-x-8 right-1/2 top-1/2 -translate-y-1/2">
                                <div className="overflow-hidden rounded-lg  shadow-lg ring-1 ring-black ring-opacity-5">
                                    {children}
                                </div>
                            </Popover.Panel>
                        </Transition>
                        <Popover.Button
                            className={`
                
                text-black group outline-none focus:outline-none `}>
                            <span>{element}</span>
                        </Popover.Button>
                    </>
                )}
            </Popover>
        </div>
    );
}

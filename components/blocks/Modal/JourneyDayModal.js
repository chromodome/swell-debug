import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import TileImages from '@/sections/TileImages';
import JourneyDayContent from '@/blocks/JourneyDayContent';
import Icons from '@/blocks/Icon/Icons';
import BlockTitle from '@/blocks/Title/BlockTitle';
import SliderList from '@/blocks/SliderList';

const breakPoints = {
    default: { width: 320, slides: 1 },
    sm: { width: 640, slides: 1 },
    md: { width: 768, slides: 1 },
    lg: { width: 1024, slides: 1 },
    xl: { width: 1280, slides: 1 }
};

export default function TellMeMore({ data, isOpen, setIsClose, day = '' }) {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-40 overflow-y-hidden"
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
                            <Dialog.Overlay className="fixed z-10 inset-0 overflow-y-auto" />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <div
                                className="z-100 mb-12 mt-24 mx-auto px-5 
                                md:px-9 lg:px-12 xl:px-24 2xl:px-40 z-30 
                                p-6 my-8 overflow-hidden text-left align-middle 
                                transition-all transform bg-white 
                                shadow-xl rounded-2xl relative shadow-md">
                                <button
                                    className="z-40 absolute right-7 top-3 cursor-pointer "
                                    onClick={setIsClose}>
                                    <Icons
                                        iName="close"
                                        size="lg text-kn-primary"
                                    />
                                </button>
                                <Dialog.Title className="mb-4">
                                    <BlockTitle
                                        text={`Day ${day}`}
                                        component={5}
                                    />
                                </Dialog.Title>
                                <SliderList
                                    boxed
                                    breakPoints={breakPoints}
                                    section={{
                                        title: '',
                                        subTitle: ''
                                    }}>
                                    {data.map((value, index) => (
                                        <div
                                            key={value.title}
                                            className="embla__slide my-4 mx-6 xl:x1">
                                            <div
                                                className="bg-kn-white shadow-none w-full 
                                                rounded-lg shadow-lg flex flex-col">
                                                <div className="flex flex-1">
                                                    <TileImages
                                                        url={[
                                                            data[0].img,
                                                            data[0].img,
                                                            data[0].img,
                                                            data[0].img
                                                        ]}
                                                    />
                                                </div>
                                                <div className="flex flex-2 h-full flex-col justify-between p-6 relative">
                                                    <div className="w-3/4 mb-4">
                                                        <JourneyDayContent
                                                            title={value.title}
                                                            subtitle={
                                                                value.time
                                                            }
                                                            desc={value.desc}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </SliderList>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

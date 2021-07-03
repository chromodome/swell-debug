import React from 'react';
import Title from '@/blocks/Title';
import SliderList from '@/blocks/SliderList';
import Link from 'next/link';

const breakPoints = {
    default: { width: 320, slides: 1 },
    sm: { width: 640, slides: 1 },
    md: { width: 768, slides: 1 },
    lg: { width: 1024, slides: 1 },
    xl: { width: 1280, slides: 1 }
};

function JourneyDaySlider({ slides = [] }) {
    return (
        <div>
            <Title text="Your journey" component={3} classes="mb-0" />
            <SliderList
                breakPoints={breakPoints}
                classes="mt-2"
                section={{ title: '', subTitle: 'Day 1' }}>
                {slides.map((value, index) => (
                    <div
                        key={value.title}
                        className="embla__slide my-4 mx-6 xl:x1">
                        <div className="bg-kn-white shadow-md w-full rounded-lg shadow-lg flex items-stretch h-full  max-h-96">
                            <div className="flex flex-1">
                                <img
                                    src={value.img}
                                    alt="day picture"
                                    className="h-full w-full
                                    rounded-xl object-cover"
                                />
                            </div>
                            <div className="flex flex-2 h-full flex-col justify-between p-6 relative">
                                <div className="w-3/4">
                                    <Title
                                        text={value.title}
                                        component={5}
                                        classes="mb-4"
                                    />
                                    <p>{value.time}</p>
                                    <hr className="w-12 mt-2 mb-4" />
                                    <p className="">{value.desc}</p>
                                </div>
                                <Link href="#">
                                    <a
                                        className="w-full max-w-max px-6  focus:outline-none h-9 w-9 border-2
                                     rounded-full flex items-center justify-center transition-colors duration-300
                                text-black border-kn-primary hover:bg-gray-800 hover:border-gray-800 hover:text-white">
                                        Tell me more
                                    </a>
                                </Link>
                                <span className="absolute text-kn-primary right-6 bottom-6">
                                    {index + 1}/{slides.length}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </SliderList>
        </div>
    );
}

export default JourneyDaySlider;

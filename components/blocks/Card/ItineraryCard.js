import { handleRowReverse } from '@/helpers/FEutils';
import RawCard from './RawCard';

const ItineraryCard = ({ data, index = 1 }) => {
    const rtl = false;
    const { day_featured_image, description_html, title } = data;
    // console.log(data);
    return (
        <RawCard label={`Day ${index + 1}`}>
            <div
                className={`overflow-hidden2 rounded-3xl px-6 py-6 flex flex-col md:flex-row gap-4 w-full cursor-pointer  ${
                    handleRowReverse(rtl).rtl
                }`}>
                <div className="">
                    {day_featured_image &&
                        day_featured_image.type !== 'vid' && (
                            <img
                                className="rounded-2xl object-cover w-full md:w-80 h-96"
                                data-blink-src={day_featured_image.data}
                                alt=""
                            />
                        )}
                    {day_featured_image &&
                        day_featured_image.type === 'vid' && (
                            <img
                                className="rounded-2xl object-cover w-full md:w-80 h-96"
                                src={day_featured_image.data}
                                alt=""
                            />
                        )}
                </div>

                <div className="flex-1 flex flex-col px-4 pr-8 lg:px-8 py-8 ">
                    <div className={`z-10`}>
                        <h2 className="text-xl lg:text-2xl text-green-400 font-bold">
                            Day {index + 1}
                        </h2>
                    </div>
                    <div className="">
                        <div
                            className={`${handleRowReverse(rtl).rtl} ${
                                title ? '' : 'italic text-sm text-gray-400'
                            } text-transparent bg-clip-text bg-gradient-to-tr from-gray-900 via-blue-500 to-green-400 text-xl lg:text-2xl leading-tight
                                            font-bold mt-2 line-clamp-3`}>
                            {title}
                        </div>
                    </div>

                    <div
                        className="text-gray-800 mt-4 mb-6 line-clamp-5 lg:line-clamp-4 xl:line-clamp-5 text-sm lg:text-base break-words"
                        dangerouslySetInnerHTML={{
                            __html: description_html
                        }}
                    />

                    <div className="flex">
                        {/* <Link
                                    className='flex-shrink-0 rounded-full border-2 border-green-400 px-4 py-2'
                                    to={`${
                                        !publicView ? '/c' : ''
                                    }/experience/${experienceId}/${index + 1}/`}
                                >
                                    <span>Detailed Schedule</span>
                                </Link> */}
                    </div>
                </div>
            </div>
        </RawCard>
    );
};

export default ItineraryCard;

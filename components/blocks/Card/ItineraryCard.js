import { handleRowReverse, randomItem } from 'helpers/FEutils';
import ImageHover from './ImageHover';
import RawCard from './RawCard';
import SkeletonParagraph from './SkeletonParagraph';
import SkeletonText from './SkeletonText';

const ItineraryCard = ({ data, index = 1 }) => {
    const rtl = false;
    const { day_featured_image, description_html, title } = data;

    const featuredImageUrl = day_featured_image
        ? day_featured_image.type !== 'vid'
            ? `${day_featured_image.data}-/format/webp/-/quality/lighter/-/progressive/yes/-/max_icc_size/10/-/scale_crop/320x320/smart_faces_objects_points/`
            : `https://img.youtube.com/vi/${day_featured_image.data}/sddefault.jpg`
        : '';

    const imgProp =
        day_featured_image.type !== 'vid'
            ? { src: featuredImageUrl }
            : day_featured_image.type === 'vid'
            ? { src: featuredImageUrl }
            : {};

    return (
        <RawCard label={`Day ${index + 1}`}>
            <div
                className={`overflow-hidden2 rounded-3xl px-6 py-6 flex flex-col md:flex-row gap-4 md:gap-8 w-full cursor-pointer  ${
                    handleRowReverse(rtl).rtl
                }`}>
                <div>
                    <div className="rounded-2xl object-cover w-full xl:w-52 lg:w-44 md:w-40 overflow-hidden h-full xl:min-h-60 lg:min-h-52 md:min-h-48">
                        <ImageHover
                            bg="bg-gray-50"
                            disabled
                            nohover
                            url={imgProp.src}
                            className={`${
                                day_featured_image.type === 'vid'
                                    ? 'scale-135'
                                    : ''
                            }`}
                        />
                        {/* <img
                                className='object-cover w-full h-full transform scale-135'
                                {...imgProp}
                                alt=''
                            /> */}
                    </div>
                </div>

                <div className="flex-1 flex flex-col md:pt-4 pb-4 md:pr-2 ">
                    {/* <div className={`z-10`}>
                        <h2 className='text-xl lg:text-2xl text-green-400 font-bold'>
                            Day {index + 1}
                        </h2>
                    </div> */}
                    <div className="">
                        <div
                            className={`${handleRowReverse(rtl).rtl} ${
                                title ? '' : 'italic text-sm text-gray-400'
                            } text-transparent bg-clip-text bg-gradient-to-tr from-gray-900 via-blue-500 to-green-400 text-xl lg:text-2xl leading-tight
                                            font-bold mt-2 line-clamp-3`}>
                            {title}
                        </div>
                    </div>

                    {description_html ? (
                        <div
                            className="text-gray-800 mt-4 block-html line-clamp-7 md:line-clamp-7 lg:line-clamp-7 xl:line-clamp-none text-sm lg:text-sm break-words"
                            dangerouslySetInnerHTML={{
                                __html: description_html
                            }}
                        />
                    ) : (
                        <SkeletonParagraph words={24} />
                    )}

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

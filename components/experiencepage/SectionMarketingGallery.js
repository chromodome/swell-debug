import { connect } from 'react-redux';

import { Pill__Logo } from '@/components/blocks/Pills';
import { useLightbox } from 'simple-react-lightbox';
import { SRLWrapper } from 'simple-react-lightbox';
import { lightBoxOptions } from '@/constants/lightboxOptions';
import ImageHover from '@/components/blocks/Card/ImageHover';
import ButtonGeneric from '@/components/blocks/Button/ButtonGeneric';
import classNames from 'classnames';
import PillType from '../blocks/Card/PillType';

function SectionMarketingGallery({
    type = '',
    images = [],
    globalState: { lang, edit, siteData }
}) {
    const { openLightbox, closeLightbox } = useLightbox();
    const expImages = images.map((singleImage) => {
        return {
            type: singleImage.type,
            src: singleImage.url + '-/preview/-/quality/lightest/',
            thumbnail: singleImage.url + '-/preview/80x80/',
            caption: singleImage.caption
        };
    });

    const lightBoxHandler = (imageIndex) => {
        openLightbox(imageIndex);
    };

    return (
        <>
            <SRLWrapper elements={expImages} options={lightBoxOptions} />

            <div
                className={`z-100 mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40 relative mt-12 md:mt-0 d-hdpi-2:px-vw-40 `}>
                <div className="hidden md:grid md:h-72 lg:h-96 xl:h-128 d-hdpi-2:h-vw-128 mt-vw-1.5 overflow-hidden rounded-xl d-hdpi-2:rounded-vw-xl w-full gap-2 grid-rows-4 grid-cols-8 grid-flow-col relative d-hdpi-2:gap-1">
                    <ImageHover
                        url={`${expImages[1]?.src}-/scale_crop/480x640/smart_objects_faces_points/`}
                        handleActionBtn={lightBoxHandler}
                        params={[1]}
                        className="row-span-4 col-span-2"
                    />

                    <ImageHover
                        url={`${expImages[0]?.src}`}
                        handleActionBtn={lightBoxHandler}
                        params={[0]}
                        className="row-span-4 col-span-4"
                    />
                    <ImageHover
                        url={`${expImages[2]?.src}-/scale_crop/240x320/smart_objects_faces_points/`}
                        handleActionBtn={lightBoxHandler}
                        params={[2]}
                        className="row-span-2 col-span-1"
                    />
                    <ImageHover
                        url={`${expImages[3]?.src}-/scale_crop/480x320/smart_objects_faces_points/`}
                        handleActionBtn={lightBoxHandler}
                        params={[3]}
                        className="row-span-2 col-span-2"
                    />
                    <ImageHover
                        url={`${expImages[4]?.src}-/scale_crop/240x320/smart_objects_faces_points/`}
                        handleActionBtn={lightBoxHandler}
                        params={[4]}
                        className="row-span-2 col-span-1"
                    />

                    <div className="absolute bottom-4 right-4 d-hdpi-2:bottom-vw-4 d-hdpi-2:right-vw-4">
                        <ButtonGeneric
                            handleAction={lightBoxHandler}
                            shadow="shadow-double"
                            params={[0]}
                            label="View All"
                            icon="ri-image-line text-lg d-hdpi-2:text-vw-lg"
                            fontSize="text-xs d-hdpi-2:text-vw-xs"
                            ring=""
                        />
                    </div>
                </div>
                <div className="md:hidden h-96 overflow-hidden rounded-xl w-full grid gap-1 d-hdpi-2:gap-0.5 grid-rows-4 grid-cols-6 grid-flow-col relative">
                    <ImageHover
                        url={`${expImages[0]?.src}-/scale_crop/480x480/smart_objects_faces_points/`}
                        handleActionBtn={lightBoxHandler}
                        params={[0]}
                        className="row-span-3 col-span-6"
                    />

                    <ImageHover
                        url={`${expImages[1]?.src}-/scale_crop/320x320/smart_objects_faces_points/`}
                        handleActionBtn={lightBoxHandler}
                        params={[1]}
                        className="row-span-1 col-span-2"
                    />
                    <ImageHover
                        url={`${expImages[2]?.src}-/scale_crop/320x320/smart_objects_faces_points/`}
                        handleActionBtn={lightBoxHandler}
                        params={[2]}
                        className="row-span-1 col-span-2"
                    />
                    <ImageHover
                        url={`${expImages[3]?.src}-/scale_crop/320x320/smart_objects_faces_points/`}
                        handleActionBtn={lightBoxHandler}
                        params={[3]}
                        className="row-span-1 col-span-2"
                    />

                    <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2">
                        <ButtonGeneric
                            handleAction={lightBoxHandler}
                            shadow="shadow-double"
                            params={[0]}
                            label="View All"
                            icon="ri-image-line text-lg"
                            fontSize="text-xs"
                            ring=""
                            padding="px-4 py-0.5"
                        />
                    </div>
                </div>

                <div
                    className={`absolute z-100 top-0 -translate-y-1/2 left-1/2 transform -translate-x-1/2`}>
                    {/* <div
                        className={classNames(
                            type.toLowerCase() === 'digital'
                                ? 'bg-gray-900 text-kn-primary'
                                : 'bg-gradient-to-tr from-green-300 via-green-400 to-green-500 shadow-2xl-green-500 font-semibold text-green-900 mix-blend-multiply',
                            'uppercase rounded-full h-8 flex justify-center items-center text-xxs tracking-widest px-6'
                        )}>
                        {type}
                    </div> */}
                    <PillType type={type} />
                </div>
                <div
                    className={`absolute z-100 bottom-0 translate-y-1/2 left-1/2 transform -translate-x-1/2`}>
                    <Pill__Logo />
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    globalState: state.globalState
});

export default connect(mapStateToProps, null)(SectionMarketingGallery);

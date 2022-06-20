import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useLightbox } from 'simple-react-lightbox';
import { SRLWrapper } from 'simple-react-lightbox';
import { lightBoxOptions } from '@/constants/lightboxOptions';
import ExpSubsection from '@/components/sections/ExpSubsection';
import DestinationMap from '@/components/blocks/Map/DestinationMap';
import DestinationList from '@/components/blocks/Map/DestinationList';

// import DestinationList from 'components/blocks/marketing/DestinationList';
// import DestinationMap from 'components/map/DestinationMap';

// import TipList from 'components/blocks/TipList.js';

import CarouselWithLightbox from './CarouselWithLightbox';

function SectionWhatToDo(props) {
    const {
        whatToDo: { desc, gallery: images },
        destination = {},
        globalState: { lang, edit }
    } = props;

    // const expImages = images.map((singleImage) => {
    //     return {
    //         type: singleImage.type,
    //         src: singleImage.url + '-/preview/-/quality/lightest/',
    //         thumbnail: singleImage.url + '-/preview/80x80/',
    //         caption: singleImage.caption
    //     };
    // });

    return (
        <>
            <ExpSubsection>
                <div className="marketing-title mb-8 d-hdpi-2:mb-vw-8">
                    The Destination
                </div>

                {desc && (
                    <div
                        className="block-html text-gray-800 leading-7 text-sm1 md:text-base d-hdpi-2:text-vw-base d-hdpi-2:leading-normal"
                        dangerouslySetInnerHTML={{
                            __html: desc || ''
                        }}
                    />
                )}
                {/* <div className="w-full ">
                    <div className="relative">
                        {images && images.length > 0 && (
                            <CarouselWithLightbox slides={images} />
                        )}
                    </div>
                </div> */}
                {Object.keys(destination).length ? (
                    <>
                        <DestinationList destinations={destination.locations} />

                        <div className="-mx-5 md:mx-0">
                            <DestinationMap
                                destinations={destination.locations}
                            />
                        </div>
                    </>
                ) : null}

                {/* <TipList
                    actionType={actionType}
                    tips={tips}
                    dayIndex={null}
                    index={null}
                    offset={20}
                /> */}
            </ExpSubsection>
        </>
    );
}

const mapStateToProps = (state) => ({
    globalState: state.globalState
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionWhatToDo);

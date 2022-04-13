import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useLightbox } from 'simple-react-lightbox';
import { SRLWrapper } from 'simple-react-lightbox';
import { lightBoxOptions } from '@/constants/lightboxOptions';
import CarouselWithLightbox from './CarouselWithLightbox';
import ExpSubsection from '@/components/sections/ExpSubsection';

// import TipList from 'components/blocks/TipList.js';

import AccommodationMap from '@/components/blocks/Map/AccommodationMap';
import AccommodationList from '@/components/blocks/Map/AccommodationList';

function SectionWhereToStay(props) {
    const {

        accommodation={},
        whereToStay: { title, subtitle, desc, gallery: images, tips },
        globalState: { lang }
    } = props;

    return (
        <>
            <ExpSubsection>
                <div className="marketing-title mb-8">Where you'll stay</div>

                <div
                    className="block-html text-gray-800 leading-7 text-sm1 md:text-base"
                    dangerouslySetInnerHTML={{
                        __html: desc || 'No content available'
                    }}
                />
                <div className="w-full ">
                    <div className="relative">
                        {images && images.length > 0 && (
                            <CarouselWithLightbox slides={images} />
                        )}
                    </div>
                </div>
                {
                    Object.keys(accommodation).length
                    ? <>
                        <AccommodationList locations={accommodation.locations} />
                        <div className="-mx-5 md:mx-0">
                            <AccommodationMap
                                destinations={accommodation}
                                showCountryLayer={false}
                                showCircleLayer={false}
                            />
                        </div>
                    </>
                    : null
                }
                

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

export default connect(mapStateToProps, mapDispatchToProps)(SectionWhereToStay);

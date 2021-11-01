import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import translations from 'constants/translations';
import BuyingCard from './BuyingCard';

function SectionPricingBooking({
    experienceDetails: { experience_price, type },
    globalState: { lang, edit }
}) {
    const rtl = !!translations[lang].rtl;

    return (
        <div className="">
            {type === 'GUIDED' ? (
                <span>Hello</span>
            ) : (
                <span>Pricing Card here</span>
                // <BookingCard
                //     setOpenBookingModal={openBookingModal}
                // />
                // <BuyingCard
                //     price={experience_price?.price?.price}
                //     desc="For a limited time only, you can try our experiences for free!"
                // />
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    globalState: state.globalState
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SectionPricingBooking);

import  { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCartAction,
    postCartAction,
    updateCartAction,
    removeFromCartAction,
    updateItemCartAction
} from '@/store/actions/swell/cart';
import translations from 'constants/translations';
import BuyingCardDigital from './BuyingCardDigital';
import BuyingCardGuide from './BuyingCardGuide';

function SectionPricingBooking({
    type,
    expId,
    globalState: { lang, edit },
    fetchCartAction,
    postCartAction,
    updateCartAction,
    removeFromCartAction,
    updateItemCartAction
}) {
    const rtl = !!translations[lang].rtl;
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);

    // const getCart = async (type) => {
    //     const response = await fetch(`/api/cart/`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     const data = await response.json();
    //     console.log('cart', data)
    // }
    const getPrice = async (type) => {
        const response = await fetch(`/api/price/${expId}?type=${type}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        setProductData(data.results[0]);
        setLoading(false);
    }
    
    const buy = () => {
        console.log('buy')
        // postCartAction([])
        postCartAction({
            product_id: '623af66b8fa1f37a3fe78436',
            variant_id: "623af6cabbe8a77a6033fb24",
            quantity: 1,

        })
    }

    const get = () => {
        console.log('get')
        fetchCartAction().then((dd) => {
            console.log('dddd', dd)
        })
    }
    const reset = () => {
        console.log('get')
        updateCartAction([]).then((dd) => {
            console.log('dddd', dd)
        })
    }

    const removeProdFromCart = (cartId) => {
        setLoading(true);
        removeFromCartAction(cartId).then(() => {
            setLoading(false);
        });
    }

    const addDigitalProdToCart = (prodId) => {
        setLoading(true);
        postCartAction({product_id: prodId, quantity: 1 }).then(() => {
            setLoading(false);
        });
    }

    const addGuidedProdToCart = (prodId, variantId, quantity) => {
        setLoading(true);
        postCartAction({
            product_id: prodId,
            variant_id: variantId,
            quantity
        }).then(() => {
            setLoading(false);
        });
    }

    const updateGuidedProdToCart = (cartId, quantity) => {
        setLoading(true);
        updateItemCartAction(cartId, quantity).then(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        getPrice(type);
      //  getCart()
    }, []);

    // useEffect(() => {

    //   //  getCart()
    // }, []);

    return (
        <div className="">
            {type === 'GUIDED' ? (
                <BuyingCardGuide
                    loading={loading}
                    productData={productData}
                    price={productData?.price}
                    addToCart={addGuidedProdToCart}
                    expId={expId}
                    removeFromCart={removeProdFromCart}
                    updateCart={updateGuidedProdToCart}
                    // desc="For a limited time only, you can try our experiences for free!"
                    desc=""
                />
            ) : (
                <>
                    <span>Pricing Card here</span>
                    <BuyingCardDigital
                        type={type.toLowerCase()}
                        loading={loading}
                        productData={productData}
                        price={productData?.price}
                        expId={expId}
                        addToCart={addDigitalProdToCart}
                        removeFromCart={removeProdFromCart}
                       // desc="For a limited time only, you can try our experiences for free!"
                        desc=""
                    />
                </>
                // <BookingCard
                //     setOpenBookingModal={openBookingModal}
                // />
            )}
            {/* <button onClick={buy}>Buy</button>
            <button onClick={get}>Get</button>
            <button onClick={reset}>Reset</button> */}
        </div>
    );
}

const mapStateToProps = (state) => ({
    globalState: state.globalState,
    cart: state.cart
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchCartAction,
        postCartAction,
        updateCartAction,
        removeFromCartAction,
        updateItemCartAction
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SectionPricingBooking);

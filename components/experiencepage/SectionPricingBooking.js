import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouter } from 'next/router';
import {
    // toggleLang,
    // toggleNav,
    // toggleCart,
    toggleAuthModal,
    setAuthPage
} from '@/store/actions/globalState';
import {
    fetchCartAction,
    postCartAction,
    updateCartAction,
    removeFromCartAction,
    updateItemCartAction,
    removeVoucherAction
} from '@/store/actions/swell/cart';
import translations from 'constants/translations';
import BuyingCardDigital from './BuyingCardDigital';
import BuyingCardGuide from './BuyingCardGuide';

function SectionPricingBooking({
    mobile,
    type,
    expId,
    swellExpId,
    globalState: { lang, edit },
    auth,
    fetchCartAction,
    postCartAction,
    updateCartAction,
    removeFromCartAction,
    updateItemCartAction,
    removeVoucherAction,
    setAuthPage,
    toggleAuthModal
}) {
    const rtl = !!translations[lang].rtl;
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { isReady } = useRouter();

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
        const isguided = type.toLowerCase() === 'guided';
        const response = await fetch(
            `/api/price/${isguided ? swellExpId : expId}?type=${type}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await response.json();

        setProductData(isguided ? data.results : data.results[0]);
        setLoading(false);
    };

    const buy = () => {
        console.log('buy');
        // postCartAction([])
        postCartAction({
            product_id: '623af66b8fa1f37a3fe78436',
            variant_id: '623af6cabbe8a77a6033fb24',
            quantity: 1
        });
    };

    const get = () => {
        console.log('get');
        fetchCartAction().then((dd) => {
            console.log('dddd', dd);
        });
    };
    const reset = () => {
        console.log('get');
        updateCartAction([]).then((dd) => {
            console.log('dddd', dd);
        });
    };

    const removeProdFromCart = (cartId) => {
        setLoading(true);
        updateCartAction([]).then((dd) => {
            console.log('dddd', dd);
            setLoading(false);
        });
        // removeFromCartAction(cartId).then(() => {
        //     setLoading(false);
        // });
    };

    const addDigitalProdToCart = (prodId) => {
        if (!auth.isAuthenticated || !auth.isProfile) {
            if (auth.isAuthenticated) {
                setAuthPage('profile');
            } else {
                setAuthPage('login');
            }
            toggleAuthModal(true);
        } else {
            setLoading(true);
            updateCartAction([]).then((dd) => {
                postCartAction({
                    product_id: prodId,
                    quantity: 1

                    // cust_id: "1234"
                }).then(() => {
                    setLoading(false);
                    router.push('/checkout');
                });
            });
        }
        // setLoading(true);
        // postCartAction({product_id: prodId, quantity: 1 }).then(() => {
        //     setLoading(false);
        // });
    };

    const addGuidedProdToCart = (prodId, variantId, quantity) => {
        if (!auth.isAuthenticated) {
            setAuthPage('login');
            toggleAuthModal(true);
        } else {
            setLoading(true);
            updateCartAction([]).then((dd) => {
                postCartAction({
                    product_id: prodId,
                    variant_id: variantId,
                    quantity
                }).then(() => {
                    setLoading(false);
                    router.push('/checkout');
                });
            });
        }
    };

    const updateGuidedProdToCart = (cartId, quantity) => {
        setLoading(true);
        updateItemCartAction(cartId, quantity).then(() => {
            setLoading(false);
        });
    };

    const resetCart = () => {
        updateCartAction([]);
        removeVoucherAction();
        // swell.cart.removeCoupon()
    }

    useEffect(() => {
        if(isReady) {
            resetCart();
            getPrice(type);
        }
        
        //  getCart()
    }, []);

    // useEffect(() => {

    //   //  getCart()
    // }, []);

    return (
        <div className="">
            {type === 'GUIDED' ? (
                <BuyingCardGuide
                    mobile={mobile}
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
                    <BuyingCardDigital
                        mobile={mobile}
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
    auth: state.auth,
    globalState: state.globalState,
    cart: state.cart
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchCartAction,
            postCartAction,
            updateCartAction,
            removeFromCartAction,
            updateItemCartAction,
            removeVoucherAction,
            setAuthPage,
            toggleAuthModal
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SectionPricingBooking);

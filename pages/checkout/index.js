import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import ToastMessage from '@/components/blocks/ToastMessage';
import Layout from '@/components/layouts/Layout';
import {
    fetchCartAction,
    updateCartAction,
    addVoucherAction,
    removeVoucherAction
} from '@/store/actions/swell/cart';
import { addOrderData } from '@/store/actions/order';
import { convertVariantNameDateToIso } from '@/helpers/calander';
import ExpSubsection from '@/components/sections/ExpSubsection';
import moment from 'moment';
import { capitalize, kreatorName, pluralize } from '@/helpers/FEutils';
import { User, Clock, MapPin, Users, Layers } from 'lucide-react';
import { submitPayment, clearPaymentErrors } from '@/store/actions/payment';
import { Block__InputSingle } from 'components/blocks/Blocks';
import PageSpinner from '@/components/blocks/PageSpinner';
import { postPurchase } from '@/helpers/apiServices/purchases';
import swell from '@/swell/swelljs.js';

import Row from '@/components/sections/Row';
import LayoutLoading from '@/components/layouts/LayoutLoading';
import ButtonLoad from '@/components/blocks/ButtonLoad';
import classNames from 'classnames';


const Checkout = ({
    auth,
    fetchCartAction,
    cart,
    addVoucherAction,
    removeVoucherAction,
    siteLoading,
    postPurchase,
    addOrderData
}) => {
    const [loadingCart, setLoadingCart] = useState(true);
    const [loadingCoupon, setLoadingCoupon] = useState(false);
    const [voucher, setVoucher] = useState('');
    const router = useRouter();
    const { query, isReady } = useRouter();
    const cardElement = useRef(null);
    const cardExpiryId = useRef(null);
    let preferredCurrency = auth?.user?.profile?.currency || 'USD';

    const [processing, setProcessing] = useState(false);
    const {
        coupon,
        sub_total,
        grand_total,
        discount_total
    } = cart;
    const parseCart = () => {
        const {
            digital,
            guided
        } = cart;
        const type = Object.keys(digital).length
            ? 'DIGITAL'
            : Object.keys(guided).length
            ? 'GUIDED'
            : null;
        const product = {
            type,
            title: '',
            description: '',
            featured_image: '',
            destinations: [],
            days: 0,
            username: '',
            first: '',
            price: 0,
            people: 0,
            travel_date: '',
            publish_id: '',
            experience_id: ''
        };
console.log(coupon)
        if (!type) {
            return { type };
        }

        if (type === 'GUIDED') {
            const guidedItems = guided[Object.keys(guided)[0]];
            const item = guidedItems[Object.keys(guidedItems)[0]];

            const {
                price = 0,
                quantity = 0,
                variant: { name },
                product: {
                    name: title = '',
                    description = '',
                    content: {
                        featured_image = '',
                        destinations = [],
                        days = 0,
                        username = '',
                        first = '',
                        publish_id,
                        experience_id
                    }
                }
            } = item;

            product['featured_image'] = featured_image;
            product['destinations'] = destinations;
            product['days'] = days;
            product['title'] = title;
            product['username'] = username;
            product['first'] = first;
            product['description'] = description;
            product['price'] = price;
            product['people'] = quantity;
            product['publish_id'] = publish_id;
            product['experience_id'] = experience_id;
            product['travel_date'] = convertVariantNameDateToIso(name);
        }

        if (type === 'DIGITAL') {
            const {
                price = 0,
                people = 0,
                product: {
                    name: title = '',
                    description = '',
                    content: {
                        featured_image = '',
                        destinations = [],
                        days = 0,
                        username = '',
                        first = '',
                        publish_id,
                        experience_id
                    }
                }
            } = digital[Object.keys(digital)[0]];

            product['featured_image'] = featured_image;
            product['destinations'] = destinations;
            product['days'] = days;
            product['title'] = title;
            product['username'] = username;
            product['first'] = first;
            product['description'] = description;
            product['price'] = price;
            product['publish_id'] = publish_id;
            product['experience_id'] = experience_id;
            product['people'] = people;
        }

        return product;
    };
    const product = useRef(parseCart());
    const {
        type,
        featured_image,
        destinations,
        days,
        title,
        username,
        first,
        description,
        price,
        people,
        travel_date,
        publish_id,
        experience_id
    } = product.current;
    const reloadCartTimeoutId = useRef(null);
    const reloadCart = () => {
        // When local storage changes, dump the list to
        // It means cart updated reload cart
        clearTimeout(reloadCartTimeoutId.current);
        if (window.localStorage.getItem('xx') !== JSON.stringify(cart) && !loadingCart) {
            reloadCartTimeoutId.current = setTimeout(() => {
                setLoadingCart(true);
                fetchCartAction().then(() => {
                    setLoadingCart(false);
                });
            }, 1000);
        }
    };

    

    const tokenize = async () => {
        setProcessing(true);
        await swell.payment.tokenize({
            card: {
                onSuccess: () => {
                    console.log('tokenize success');
                    placeOrder();
                },
                onError: (err) => {
                    setProcessing(false);
                    pushMessage(err);
                }
            }
        });
    };

    const placeOrder = async () => {
        try {
            await swell.cart.update({
                account: {
                    email: auth?.user?.email || 'subscription@viakonnect.com'
                }
            });

            const order = await swell.cart.submitOrder();
            const guidedData = {};

            if (type == 'GUIDED') {
                guidedData.people = people;
                guidedData.travel_date = travel_date;
            }

            postPurchase({
                user: auth.user.id,
                swell_orderId: order.id,
                experience_id,
                experience: publish_id,
                title,
                type,
                featured_image,
                ...guidedData
            }).then((res) => {
                addOrderData({ order, product });
                router.push('/thanks');
            });
        } catch (err) {
            setProcessing(false);
            pushMessage(err);
        }
    };

    const removeCoupon = () => {
        setLoadingCoupon(true);
        removeVoucherAction().then(() => {
            setLoadingCoupon(false);
            pushMessage("Coupon successfully removed");
        });
    }

    const pushMessage = (msg) => {
        let message = '';
        let icon = "😕";

        if(typeof msg === 'object') {
            message = msg?.message || 'Error'
        } else {
            icon = "😊";
            message = msg;
        }
        toast.success(
            <ToastMessage
                icon={icon}
                msg={message}
                alignTop={false}
            />,
            {
                hideProgressBar: true,
                autoClose: 2500
            }
        );
    };

    const addVoucher = () => {
        setLoadingCoupon(true);
        addVoucherAction(voucher).then((res) => {
            setLoadingCoupon(false);
            if(res instanceof Error) {
                removeVoucherAction();
                pushMessage(res);
            } else {
                pushMessage("Coupon successfully applied");
            }
        });
    }
    useEffect(() => {
        if (isReady && !loadingCart) {
            swell.payment.createElements({
                card: {
                    elementId: cardElement.current, // default: #card-element
                    separateElements: false, // required for separate elements

                    cardExpiry: {
                        elementId: cardExpiryId.current, // default: #cardExpiry-element
                        options: {
                            // options are passed as a direct argument to stripe.js
                            style: {
                                base: {
                                    fontWeight: 500,
                                    fontSize: '32px',
                                    color: 'blue'
                                }
                            }
                        }
                    },
                    // cardCvc: {
                    // elementId: '#card-expiry-id' // default: #cardCvc-element
                    // },
                    options: {
                        // options are passed as a direct argument to stripe.js
                        style: {
                            base: {
                                fontWeight: 500,
                                fontSize: '16px'
                            }
                        }
                    },
                    onChange: (event) => {
                        // optional, called when the Element value changes
                    },
                    onReady: (event) => {
                        // optional, called when the Element is fully rendered
                    },
                    onFocus: (event) => {
                        // optional, called when the Element gains focus
                    },
                    onBlur: (event) => {
                        // optional, called when the Element loses focus
                    },
                    onEscape: (event) => {
                        // optional, called when the escape key is pressed within an Element
                    },
                    onClick: (event) => {
                        // optional, called when the Element is clicked
                    },
                    onSuccess: (result) => {
                        // optional, called on card payment success
                    },
                    onError: (error) => {
                        // optional, called on card payment error
                    }
                }
            });
        }
    }, [loadingCart]);

    useEffect(() => {
        let cartListener = null;
        fetchCartAction().then(() => {
            setLoadingCart(false);
            cartListener = window.addEventListener('storage', reloadCart);
        });

        return () => window.removeEventListener('storage', cartListener);
    }, []);

    useEffect(() => {
        if (!siteLoading) {
            if (!auth.isAuthenticated) {
                updateCartAction([]); // reset cart and leave page
                router.replace('/');
            }
        }
    }, [siteLoading]);
    
    return (
        <>
            <Layout>
                {!loadingCart && type ? (
                    <div
                        style={{ display: processing ? 'none' : 'block' }}
                        className={` mb-12a mt-12 lg:mt-24 mx-auto px-5 md:px-9 lg:px-12 xl:px-241 2xl:px-401 xl:max-w-7xl `}>
                        <div className={``}>
                            <div className="inline-block text-transparent bg-clip-text bg-gradient-to-l from-blue-600 via-green-400 to-green-400 font-bold text-3xl tracking-tight leading-none pb-8">
                                Checkout
                            </div>
                        </div>
                        <main
                            className={classNames(
                                processing ? 'hidden' : 'flex',
                                'items-start lg:gap-16 xl:gap-24 flex-col lg:flex-row'
                            )}>
                            <section
                                className={classNames(
                                    'w-full lg:w-3/5 lg:mb-24'
                                )}>
                                {type == 'GUIDED' && (
                                    <>
                                        <ExpSubsection
                                            padding="pb-8"
                                            margins="mb-8">
                                            <div className="text-green-400 text-2xl font-bold mb-4">
                                                Your booking
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col gap-1">
                                                    <div className="font-bold">
                                                        Date
                                                    </div>
                                                    <div>
                                                        {moment(
                                                            travel_date
                                                        ).format(
                                                            'MMMM Do YYYY'
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </ExpSubsection>

                                        <ExpSubsection
                                            padding="pb-8"
                                            margins="mb-8">
                                            <div className="text-green-400 text-2xl font-bold mb-4">
                                                Guest info
                                            </div>
                                            <div>
                                                Lorem ipsum, dolor sit amet
                                                consectetur adipisicing elit.
                                                Cumque culpa ipsam ducimus ullam
                                                consequatur exercitationem,
                                                atque ratione officia autem
                                                temporibus.
                                            </div>
                                        </ExpSubsection>
                                    </>
                                )}
                                <ExpSubsection padding="pb-8" margins="mb-8">
                                    <div className="text-green-400 text-2xl font-bold mb-4">
                                        Summary
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: description
                                        }}
                                    />
                                </ExpSubsection>

                                <ExpSubsection padding="pb-8" margins="mb-8">
                                    <div className="text-green-400 text-2xl font-bold mb-4">
                                        Payment info
                                    </div>
                                    <div>
                                        <div
                                            id="card-element-id"
                                            ref={cardElement}></div>
                                        <div
                                            id="card-expiry-id"
                                            ref={cardExpiryId}></div>
                                        {/* <div  id="card-number-id"></div> */}
                                    </div>
                                </ExpSubsection>
                            </section>

                            <aside
                                className={classNames(
                                    'w-full lg:w-2/5 lg:stickya lg:top-12a py-4 lg:pb-24'
                                )}>
                                <div className="flex flex-col gap-6 mb-4 ">
                                    <Block__InputSingle
                                        responsive={true}
                                        whiteBg={true}
                                        normal
                                        error={false}
                                        handleChange={(e) =>
                                            setVoucher(
                                                e.target.value
                                            )
                                        }
                                        id="first"
                                        margins=""
                                        value={voucher}
                                        placeholder={'first'}
                                        // rtl={rtl}
                                        height="h-10"
                                        fontSize="text-sm"
                                        label=""
                                        labelPos="left"
                                        labelJustify="text-right mr-2"
                                        labelMargin=""
                                        labelWidth="w-32"
                                    />
                                    <ButtonLoad
                                        handleClick={addVoucher}
                                        isLoading={loadingCoupon}
                                        label="Add Voucher"
                                        width="w-full"
                                        
                                    />
                                </div>
                                <div
                                    className={`flex flex-col px-4 xl:px-8 pt-4 pb-4  xl:pb-8 xl:pt-8 bg-kn-white rounded-2xl shadow-cards`}>
                                    <div className="flex flex-col md:flex-row gap-4 border-b border-green-600 border-opacity-20 pb-6">
                                        <div className="md:w-32 overflow-hidden rounded-lg">
                                            <img
                                                alt=""
                                                className="object-cover object-center w-full h-full"
                                                data-blink-src={featured_image}
                                            />
                                        </div>
                                        <div>
                                            <div className="border-b border-green-600 border-opacity-20 pb-2">
                                                <div className="text-sm">
                                                    {title}
                                                </div>
                                                <div className="mt-2 flex flex-wrap items-center font-sans text-xs text-gray-900">
                                                    <div className="flex  mr-8 py-1">
                                                        <span className="text-green-400 mr-2">
                                                            <MapPin size={18} />
                                                        </span>

                                                        <span className="flex flex-wrap items-center">
                                                            {destinations?.length >
                                                            0 ? (
                                                                destinations.map(
                                                                    (
                                                                        item,
                                                                        index,
                                                                        itemArray
                                                                    ) => {
                                                                        return (
                                                                            <span
                                                                                key={`${item}_${index}`}>
                                                                                <span className="whitespace-nowrap">
                                                                                    {
                                                                                        item
                                                                                        /* {country(
                                                                                    'en',
                                                                                    item.code
                                                                                )} */
                                                                                    }
                                                                                </span>
                                                                                {index <
                                                                                    itemArray.length -
                                                                                        1 && (
                                                                                    <span className="px-1">
                                                                                        .
                                                                                    </span>
                                                                                )}
                                                                            </span>
                                                                        );
                                                                    }
                                                                )
                                                            ) : (
                                                                <span className="w-20 bg-gray-300 rounded-full h-2" />
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mr-8 py-1">
                                                        <span className="text-green-400 mr-2">
                                                            <Clock size={18} />
                                                        </span>
                                                        {pluralize(days, 'Day')}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-xs mt-4 flex flex-wrap gap-x-1">
                                                <span>
                                                    {`A ${capitalize(
                                                        type
                                                    )} Experience by`}
                                                </span>
                                                <span className="underline font-semibold text-green-700">
                                                    {`${kreatorName({
                                                        username,
                                                        first
                                                    })}`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        coupon && !loadingCoupon
                                        ? <div className="border-b border-green-600 border-opacity-20  py-6 pb-4">
                                            <div>
                                                <span>{coupon.name}</span>
                                                <button style={{float: 'right'}} onClick={removeCoupon}>X</button>
                                            </div>
                                            
                                    </div>
                                    : null

                                    }
                                    
                                    <div className="border-b border-green-600 border-opacity-20  py-6 pb-4">
                                        <div className="flex flex-col rounded-xl bg-kn-gray-100 px-4 lg:px-8 py-4">
                                            <div className=" mb-4 font-semibold">
                                                Price details
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex text-xs items-center justify-between  pb-2 border-b-2 border-gray-300 border-dotted">
                                                    <span className="relative">
                                                        Price
                                                    </span>
                                                    <span className="relative">
                                                        {price}
                                                    </span>
                                                </div>

                                                {type.toLowerCase() ===
                                                    'guided' && (
                                                    <div className="flex flex-col gap-2 border-b-2 pb-2 border-gray-300 border-dotted">
                                                        <div className="flex text-xs items-center justify-between ">
                                                            <span className="relative">
                                                                people
                                                            </span>
                                                            <span className="relative">
                                                                {people}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                                { coupon && !loadingCoupon
                                                    ? <div>
                                                        <div className="flex text-sm font-semibold items-center justify-between pt-2 ">
                                                            <span className="flex">
                                                                <span className="relative">
                                                                    Subtotal
                                                                </span>
                                                            </span>
                                                            <span className="flex">
                                                                <span className="relative">
                                                                    {sub_total}
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div className="flex text-sm font-semibold items-center justify-between pt-2 ">
                                                            <span className="flex">
                                                                <span className="relative">
                                                                    Discount
                                                                </span>
                                                            </span>
                                                            <span className="flex">
                                                                <span className="relative">
                                                                    {discount_total}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    : null
                                                }
                                                <div className="flex text-sm font-semibold items-center justify-between pt-2 ">
                                                    <span className="flex">
                                                        <span className="relative">
                                                            Total
                                                        </span>
                                                        {/* {preferredCurrency !=
                                                        'USD' && (
                                                        <span className="text-xs">
                                                            *
                                                        </span>
                                                    )} */}
                                                    </span>
                                                    <span className="flex">
                                                        <span className="relative">
                                                            {grand_total}
                                                        </span>
                                                        {/* {preferredCurrency !=
                                                        'USD' && (
                                                        <span className="text-xs">
                                                            **
                                                        </span>
                                                    )}*/}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {preferredCurrency !== 'USD' && (
                                            <div className="px-2 mt-4">
                                                <div className="flex items-center gap-1 text-xs">
                                                    <div className="">
                                                        * 1 USD ~{' '}
                                                    </div>
                                                    <span>
                                                        {/* {formatPrice(
                                                        rate,
                                                        'USD',
                                                        getBrowserLocale(),
                                                        currencyOptions
                                                    )} */}
                                                    </span>
                                                    <div className="">
                                                        {/* {preferredCurrency} */}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs">
                                                    <div className="">
                                                        ** You will be charged
                                                    </div>
                                                    <div className="">$US</div>
                                                    <span>
                                                        {/* {formatPrice(
                                                        total / 100,
                                                        'USD',
                                                        getBrowserLocale(),
                                                        currencyOptions
                                                    )} */}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        <div className="px-2 mt-4 text-xs">
                                            Charges will appear as Stripe
                                            Payment Services
                                        </div>
                                    </div>
                                    <div className="border-b border-green-600 border-opacity-20  py-4">
                                        <div className="px-2 text-xs">
                                            To learn about our cancellation and
                                            refund policy{' '}
                                            <a
                                                className="underline font-semibold text-green-700"
                                                target="_blank"
                                                href={`${process.env.NEXT_PUBLIC_URL}/help/article/4002`}>
                                                click here
                                            </a>
                                        </div>
                                    </div>

                                    <div className="h-full flex items-center flex-col justify-between">
                                        <ButtonLoad
                                            handleClick={tokenize}
                                            isLoading={false}
                                            label="Confirm and Pay"
                                            width="w-full"
                                            // handleClick={handleSubmit}
                                            // form="paymentForm"
                                            // type="submit"
                                        />
                                        {/* <button onClick={tokenize}>
                                            Submit
                                        </button> */}
                                    </div>
                                </div>
                            </aside>
                        </main>
                    </div>
                ) : (
                    <LayoutLoading message="Preparing checkout" />
                )}
                {processing ? (
                    <LayoutLoading>
                        <div className="flex flex-col items-center max-w-2xl text-center mt-6 text-sm uppercase tracking-wide text-gray-600">
                            <div>Processing order...</div>
                            <div>
                                Don't close this page. You will be redirected to
                                your purchases page once the processing
                                completes.
                            </div>
                        </div>
                    </LayoutLoading>
                ) : null}
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    siteLoading: state.globalState.siteData.loading,
    globalState: state.globalState,
    payment: state.payment,
    auth: state.auth,
    cart: state.cart,
    user: state.user
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            submitPayment,
            clearPaymentErrors,
            fetchCartAction,
            addVoucherAction,
            removeVoucherAction,
            postPurchase,
            addOrderData
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

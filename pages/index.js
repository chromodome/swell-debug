/*

In this file the connection is refused when the component mounts and tries to connect to swell to create the cart



*/

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import ToastMessage from '../components/ToastMessage';
import ExpSubsection from '../components/ExpSubsection';
import {
    capitalize,
    kreatorName,
    pluralize,
    formatPrice,
    parseCart,
    reduxMimic
} from '../helpers/FEutils';
import swell from '../swell/swelljs.js';
import classNames from 'classnames';

const currencyOptions = {
    rounding: 0.001
};

const Checkout = () => {
    const [loadingCart, setLoadingCart] = useState(true);
    const router = useRouter();
    const { isReady } = useRouter();
    const cardElement = useRef(null);
    const cardExpiryId = useRef(null);
    const [processing, setProcessing] = useState(false);
    const [theProduct, setTheProduct] = useState({});
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
        grand_total
    } = theProduct;

    // Toast Message to show error
    const pushMessage = (msg) => {
        let message = '';
        let icon = '😕';

        if (typeof msg === 'object') {
            message = msg?.message || 'Error';
        } else {
            icon = '😊';
            message = msg;
        }
        toast.success(
            <ToastMessage icon={icon} msg={message} alignTop={false} />,
            {
                hideProgressBar: true,
                autoClose: 2500
            }
        );
    };

    // on mount create the cart
    useEffect(() => {
        if (isReady) {
            createCart();
        }
    }, []);

    // When loading cart state changes create the stripe elements
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
                    options: {
                        // options are passed as a direct argument to stripe.js
                        style: {
                            base: {
                                fontWeight: 500,
                                fontSize: '16px'
                            }
                        }
                    }
                }
            });
        }
    }, [loadingCart]);

    // Create Cart FN
    const createCart = async () => {
        await swell.cart.setItems([]); // reset cart
        const cart = await swell.cart.addItem({
            // Create carts
            product_id: '625b9bbddaaf7d596d9544d8',
            quantity: 1
        });

        setTheProduct(parseCart(reduxMimic(cart))); // Parse Cart
        setLoadingCart(false);
    };

    // Tokenization
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

    // When Confirm and Pay button is pressed
    const placeOrder = async () => {
        try {
            await swell.cart.update({
                account: {
                    email: 'subscription@viakonnect.com'
                }
            });

            await swell.cart.submitOrder();

            router.push('/thanks');
        } catch (err) {
            setProcessing(false);
            pushMessage(err);
        }
    };

    // JSX below
    return (
        <>
            <div>
                {!loadingCart && Object.keys(theProduct).length ? (
                    <div
                        style={{ display: processing ? 'none' : 'block' }}
                        className={` mb-12a mt-12 lg:mt-12 mx-auto px-5 md:px-9 lg:px-12 xl:px-241 2xl:px-401 xl:max-w-7xl d-hdpi-2:max-w-screen-2/3 d-hdpi-2:px-vw-9 d-hdpi-2:mt-vw-12 d-hdpi-2:text-vw-base`}>
                        <div className={``}>
                            <div className="inline-block text-green-400 font-bold text-3xl tracking-tight leading-none pb-8 d-hdpi-2:text-vw-3xl d-hdpi-2:pb-vw-8">
                                Checkout
                            </div>
                        </div>
                        <main
                            className={classNames(
                                processing ? 'hidden' : 'flex',
                                'items-start lg:gap-16 xl:gap-24 flex-col lg:flex-row d-hdpi-2:gap-12'
                            )}>
                            <section
                                className={classNames(
                                    'w-full lg:w-3/5 lg:mb-24'
                                )}>
                                <ExpSubsection
                                    padding="pb-8 d-hdpi-2:pb-vw-8"
                                    margins="mb-8 d-hdpi-2:mb-vw-8">
                                    <div className="text-green-400 text-2xl font-bold mb-4 d-hdpi-2:text-vw-2xl d-hdpi-2:mb-vw-4">
                                        Summary
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: description
                                        }}
                                    />
                                </ExpSubsection>

                                <ExpSubsection
                                    padding="pb-8 d-hdpi-2:pb-vw-8"
                                    margins="mb-8 d-hdpi-2:mb-vw-8">
                                    <div className="text-green-400 text-2xl font-bold mb-4 d-hdpi-2:text-vw-2xl d-hdpi-2:mb-vw-4">
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
                                    'w-full lg:w-2/5 lg:stickya lg:top-12a py-4 lg:pb-24 d-hdpi-2:pb-vw-24'
                                )}>
                                <div
                                    className={`flex flex-col px-4 xl:px-8 pt-4 pb-4  xl:pb-8 xl:pt-8 bg-kn-white rounded-2xl shadow-cards d-hdpi-2:px-vw-8 d-hdpi-2:py-vw-8 d-hdpi-2:rounded-vw-2xl`}>
                                    <div className="flex flex-col md:flex-row gap-4 border-b border-green-600 border-opacity-20 pb-6 d-hdpi-2:pb-vw-6">
                                        <div className="md:w-32 overflow-hidden rounded-lg d-hdpi-2:w-vw-32 d-hdpi-2:rounded-vw-lg">
                                            <img
                                                alt=""
                                                className="object-cover object-center w-full h-full"
                                                src={featured_image}
                                            />
                                        </div>
                                        <div>
                                            <div className="border-b border-green-600 border-opacity-20 pb-2 d-hdpi-2:pb-vw-2">
                                                <div className="text-sm d-hdpi-2:text-vw-sm">
                                                    {title}
                                                </div>
                                                <div className="mt-2 flex flex-wrap items-center font-sans text-xs text-gray-900 d-hdpi-2:mt-vw-2 d-hdpi-2:text-vw-xs">
                                                    <div className="flex  mr-8 py-1 d-hdpi-2:mr-vw-8 d-hdpi-2:py-vw-1">
                                                        <span className="text-green-400 mr-2 d-hdpi-2:mr-vw-2">
                                                            <i className="ri-map-pin-line text-xl d-hdpi-2:text-vw-xl"></i>
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
                                                                                    <span className="px-1 d-hdpi-2:px-vw-1">
                                                                                        .
                                                                                    </span>
                                                                                )}
                                                                            </span>
                                                                        );
                                                                    }
                                                                )
                                                            ) : (
                                                                <span className="w-20 bg-gray-300 rounded-full h-2 d-hdpi-2:w-vw-20 d-hdpi-2:h-vw-2" />
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mr-8 py-1 d-hdpi-2:mr-vw-8 d-hdpi-2:py-vw-1">
                                                        <span className="text-green-400 mr-2 d-hdpi-2:mr-vw-2">
                                                            <i className="ri-time-line text-xl d-hdpi-2:text-vw-xl"></i>
                                                        </span>
                                                        {pluralize(days, 'Day')}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-xs mt-4 flex flex-wrap gap-x-1 d-hdpi-2:text-vw-xs d-hdpi-2:mt-vw-4 d-hdpi-2:gap-x-0.5">
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
                                    <div className="border-b border-green-600 border-opacity-20  py-6 pb-4 d-hdpi-2:py-vw-6 d-hdpi-2:pb-vw-4">
                                        <div className="flex flex-col rounded-xl bg-kn-gray-100 px-4 lg:px-8 py-4 d-hdpi-2:px-vw-8 d-hdpi-2:py-vw-4 d-hdpi-2:rounded-vw-xl ">
                                            <div className=" mb-4 font-semibold d-hdpi-2:mb-vw-4">
                                                Price details
                                            </div>
                                            <div className="flex flex-col gap-2 d-hdpi-2:gap-1">
                                                <div className="flex text-xs items-center justify-between  pb-2 border-b-2 border-gray-300 border-dotted d-hdpi-2:text-vw-xs d-hdpi-2:pb-vw-2 d-hdpi-2:border-b">
                                                    <span className="relative">
                                                        Price
                                                    </span>
                                                    <span className="relative">
                                                        {formatPrice(
                                                            price,
                                                            'USD',
                                                            window.navigator
                                                                .language,
                                                            currencyOptions,
                                                            undefined,
                                                            '$US '
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex text-sm font-semibold items-center justify-between pt-2 d-hdpi-2:text-vw-sm d-hdpi-2:pt-vw-2">
                                                    <span className="flex">
                                                        <span className="relative">
                                                            Total
                                                        </span>
                                                    </span>
                                                    <span className="flex">
                                                        <span className="relative">
                                                            {formatPrice(
                                                                grand_total,
                                                                'USD',
                                                                window.navigator
                                                                    .language,
                                                                currencyOptions,
                                                                undefined,
                                                                '$US '
                                                            )}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-2 mt-4 text-xs d-hdpi-2:px-vw-2 d-hdpi-2:mt-vw-4 d-hdpi-2:text-vw-xs">
                                            Charges will appear as Stripe
                                            Payment Services
                                        </div>
                                    </div>
                                    <div className="h-full flex items-center flex-col justify-between">
                                        <button
                                            className="focus:outline-none rounded-lg w-full bg-green-400 flex items-center h-12 justify-center hover:bg-gray-900 hover:text-white"
                                            onClick={tokenize}>
                                            Confirm and Pay
                                        </button>
                                    </div>
                                </div>
                            </aside>
                        </main>
                    </div>
                ) : (
                    <div message="Preparing checkout" />
                )}
                {processing ? (
                    <div>
                        <div className="flex flex-col items-center max-w-2xl text-center mt-6 text-sm d-hdpi-2:text-vw-sm d-hdpi-2:mt-vw-6 d-hdpi-2:max-w-screen-1/3 uppercase tracking-wide text-gray-600">
                            <div>Processing order...</div>
                            <div>
                                Don't close this page. You will be redirected to
                                your purchases page once the processing
                                completes.
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
};

export default Checkout;

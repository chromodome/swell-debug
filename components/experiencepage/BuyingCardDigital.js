import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Button from 'components/blocks/Button/Button';
import Spinner from '@/components/blocks/Spinner';

import useXchangeRate from 'helpers/useXchangeRate2';
import { formatPrice } from 'helpers/LocaleHelper';
import { currenciesObject } from 'constants/currenciesObject';
import ListBoxGeneric from '@/components/blocks/ListBoxGeneric';

const currencyOptions = {
    rounding: 0.001
};

const BuyingCardDigital = ({
    // auth: {
    //     user: {
    //         profile: { currency: preferredCurrency }
    //     }
    // },
    productData,
    type='digital',
    loading=true,
    preferredCurrency="USD",
    classes,
    price = 50,
    desc = '',
    children,
    cart,
    expId,
    addToCart,
    removeFromCart
}) => {
    const { values, currency, rate } = useXchangeRate(
        [price],
        'USD',
        preferredCurrency
    );
    const [digitalBtnInfo, setdigitalBtnInfo] = useState({ showBuyBtn: true, showRmCartBtn: false });
    const productCartId = useRef(null);
    const productId = useRef(null);
    const { showBuyBtn, showRmCartBtn } = digitalBtnInfo;
    const removeExpFromCart = () => {
        removeFromCart(productCartId.current);
    }
    const addExpToCart = () => {
        addToCart(productId.current);
    }

    useEffect(() => {
        if(!loading) {
            const { id } = productData;
            productId.current = id;
            // this will check if in cart but if already bought 
            // do that check first
            
            if(cart !== null) {
                const { digital } = cart;
                productCartId.current = digital[expId] ? digital[expId].id : null;
                if(productCartId.current) {
                    setdigitalBtnInfo({
                        showBuyBtn: false, 
                        showRmCartBtn: true
                    })
                } else {
                    setdigitalBtnInfo({
                        showBuyBtn: true, 
                        showRmCartBtn: false
                    })
                }
            }
        }

    }, [productData, cart, loading]);

    return (
        <div
            className={`flex flex-col px-4 xl:px-8 pt-4 pb-4  xl:pb-8 xl:pt-8 bg-kn-white rounded-2xl shadow-cards ${classes} `}>
            { !loading
            ? <>
                <div className="flex flex-col pb-2  rounded-xl bg-kn-gray-100 px-4 lg:px-8 py-4">
                    <div className="flex items-center gap-2 ">
                        <i className="ri-download-cloud-2-line text-xl text-green-500"></i>
                        <div className="text-xs uppercase">
                            Digital Access Price
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-2xl font-semibold uppercase  ">
                        <span className="relative">
                            {formatPrice(
                                values[0],
                                preferredCurrency,
                                window.navigator.language,
                                currencyOptions
                            )}
                            {/* <span className="absolute top-1/2 transform -translate-y-1/2 inset-x-0 h-1 bg-red-500"></span> */}
                        </span>

                        <div className="text-sm">{currency.symbol}*</div>
                        <i className="las la-long-arrow-alt-right text-green-500"></i>
                        {/* <div className="">FREE</div> */}
                    </div>
                </div>
                <div className="border-b border-green-600 border-opacity-20 pb-4 mt-4 px-2">
                    <p className="">{desc}</p>
                </div>
                <div className="mt-4 pb-4 px-2">
                    <div className="flex items-center gap-1 text-xs">
                        <div className="">* Charged as</div>
                        <div className="">$US</div>
                        <span>
                            {formatPrice(
                                price,
                                'USD',
                                window.navigator.language,
                                currencyOptions
                            )}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                        <div className="">** 1 $US ~ </div>

                        <span>
                            {formatPrice(
                                rate,
                                'USD',
                                window.navigator.language,
                                currencyOptions
                            )}
                        </span>
                        <div className="">
                            {currenciesObject[preferredCurrency].symbol}
                        </div>
                    </div>
                </div>

                <div className="h-full flex items-center flex-col justify-between">
                    { showBuyBtn
                        && <Button
                                label="add to basket"
                                as="button"
                                handleClick={addExpToCart}
                                width="w-full"
                            />
                    }
                    { showRmCartBtn
                        && <Button
                                label="remove from basket"
                                as="button"
                                handleClick={removeExpFromCart}
                                width="w-full"
                            />
                    }
                    { (!showBuyBtn && !showRmCartBtn && <div>Already bought</div>)}

                    {children}
                </div>
            </>
                : <Spinner />
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    experienceDetails: state.experienceDetails,
    globalState: state.globalState,
    auth: state.auth,
    cart: state.cart // check what already in yhe cart
    // also once logged in check if they already booked this product
});

export default connect(mapStateToProps)(BuyingCardDigital);
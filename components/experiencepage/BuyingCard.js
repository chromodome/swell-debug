import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'components/blocks/Button/Button';

import useXchangeRate from 'helpers/useXchangeRate2';
import { formatPrice } from 'helpers/LocaleHelper';
import { currenciesObject } from 'constants/currenciesObject';

const currencyOptions = {
    rounding: 0.001
};

const BuyingCard = ({
    auth: {
        user: {
            profile: { currency: preferredCurrency }
        }
    },
    classes,
    price = 50,
    desc = '',
    children
}) => {
    const { values, currency, rate } = useXchangeRate(
        [price],
        'USD',
        preferredCurrency
    );

    return (
        <div
            className={`flex flex-col px-4 xl:px-8 pt-4 pb-4  xl:pb-8 xl:pt-8 bg-kn-white rounded-2xl shadow-cards ${classes} `}>
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
                        <span className="absolute top-1/2 transform -translate-y-1/2 inset-x-0 h-1 bg-red-500"></span>
                    </span>

                    <div className="text-sm">{currency.symbol}*</div>
                    <i className="las la-long-arrow-alt-right text-green-500"></i>
                    <div className="">FREE</div>
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
                <Button
                    label="Try it Now"
                    as="button"
                    handleClick={null}
                    width="w-full"
                />

                {children}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    experienceDetails: state.experienceDetails,
    globalState: state.globalState,
    auth: state.auth
});

export default connect(mapStateToProps)(BuyingCard);

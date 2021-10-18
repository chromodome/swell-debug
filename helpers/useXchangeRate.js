import { currenciesObject } from '@/constants/currenciesObject';
import React, { useState, useEffect } from 'react';
import store from 'store/index';

const defaultObj = {
    currency_from: {
        code: 'USD',
        name: currenciesObject['USD'].name_plural,
        symbol: currenciesObject['USD'].symbol
    },
    currency_to: {
        code: 'USD',
        name: currenciesObject['USD'].name_plural,
        symbol: currenciesObject['USD'].symbol
    },
    rate: 1
};

const useXchangeRate = ({ from = 'USD', to = 'USD' }) => {
    // get xchange rates from store

    const {
        globalState: {
            siteData: {
                loading,
                settings: { xchangeRates }
            }
        }
    } = store.getState();

    // xchange rate function

    const exchange = (fromCur, toCur, decPoint = 4) => {
        const fromRate =
            fromCur == 'USD' || Object.keys(xchangeRates).length === 0
                ? 1.0
                : xchangeRates.quotes[`USD${fromCur}`];
        const toRate =
            toCur == 'USD' || Object.keys(xchangeRates).length === 0
                ? 1.0
                : xchangeRates.quotes[`USD${toCur}`];

        return (toRate / fromRate).toFixed(decPoint);
    };

    // useEffect

    const [currencyObj, setCurrencyObj] = useState(defaultObj);

    useEffect(() => {
        setCurrencyObj({
            currency_from: {
                code: from,
                name: currenciesObject[from].name_plural,
                symbol: currenciesObject[from].symbol
            },
            currency_to: {
                code: to,
                name: currenciesObject[to].name_plural,
                symbol: currenciesObject[to].symbol
            },
            rate: exchange(from, to)
        });
    }, [from, to, loading]);

    // useEffect(() => {
    //     setCurrencyObj({
    //         values: exchange(
    //             beforeXchangeArr,
    //             from,
    //             to,
    //             currenciesObject[to].decimal_digits
    //         ),
    //         currency: {
    //             code: to,
    //             name: currenciesObject[to].name_plural,
    //             symbol: currenciesObject[to].symbol
    //         },
    //         rate: exchange([1], from, to)[0]
    //     });
    // }, [
    //     from,
    //     to,
    //     beforeXchangeArr[0],
    //     Object.keys(xchangeRates).length,
    //     loading
    // ]);

    return currencyObj;
};

export default useXchangeRate;

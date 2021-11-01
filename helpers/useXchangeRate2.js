import React, { useState, useEffect } from 'react';
import { currenciesObject } from '@/constants/currenciesObject';
import store from 'store/index';

const defaultObj = {
    values: [0],
    currency: {
        code: 'USD',
        name: currenciesObject['USD'].name_plural
    },
    rate: 1
};

const useXchangeRate = (beforeXchangeArr, from = 'USD', to = 'USD') => {
    // get xchange rates from store
    const {
        globalState: {
            siteData: {
                settings: { xchangeRates }
            }
        }
    } = store.getState();

    // xchange rate function

    const exchange = (values, fromCur, toCur, decPoint = 4) => {
        const fromRate =
            xchangeRates.quotes[`USD${fromCur === '000' ? 'USD' : fromCur}`];
        const toRate =
            xchangeRates.quotes[`USD${toCur === '000' ? 'USD' : toCur}`];

        return values.map((value) => {
            return ((value / fromRate) * toRate).toFixed(decPoint);
        });
    };

    // useEffect

    const [currencyObj, setCurrencyObj] = useState(defaultObj);
    useEffect(() => {
        setCurrencyObj({
            values: exchange(
                beforeXchangeArr,
                from,
                to,
                currenciesObject[to].decimal_digits
            ),
            currency: {
                code: to,
                name: currenciesObject[to].name_plural,
                symbol: currenciesObject[to].symbol
            },
            rate: exchange([1], from, to)[0]
        });
    }, [from, to, beforeXchangeArr[0]]);

    return currencyObj;
};

export default useXchangeRate;

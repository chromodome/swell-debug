import { countries } from '@/constants/countries';
import { countriesTranslations } from '@/constants/countriesTranslations';
import { currenciesObject } from '@/constants/currenciesObject';

// import { LOGIN_SUCCESS } from '../store/actions/types';

export const country = (lang, iso2country) => {
    return countriesTranslations[lang][iso2country].name;
};

export const currency = (lang, iso2country) => {
    return {
        code: countries[iso2country].currencyCode,
        symbol: countries[iso2country].currencySymbol,
        name: countriesTranslations[lang][iso2country].currencyName
    };
};

// country logic
// get destination object
// if length > 1 then return just the countries as array
// if length === 1 then switch
// if locality exists then just show locality and country
// if not show admin leve1 and country
// if not show just country

export const destinationObj = (lang, obj) => {
    if (obj.length === 0) {
        return [''];
    }
    if (obj.length === 1) {
        const { place, administrative_area_level_1, countryCode } = obj[0][0];
        const countryFull = country(lang, countryCode);
        if (place) return [place, countryFull];
        if (administrative_area_level_1)
            return [administrative_area_level_1, countryFull];
        return [countryFull];
    }

    if (obj.length > 1) {
        return [
            ...new Set(obj.map((item) => country(lang, item[0].countryCode)))
        ];
    }
};

export const buildCountryData = (lang) => {
    let countryArray = [];
    for (const [key, value] of Object.entries(countries)) {
        countryArray.push({ id: key, name: country(lang, key) });
    }
    return countryArray;
};

export const findLowestPrice = (experience_price, type) => {
    const emptyString = '-';
    if (experience_price) {
        if (experience_price.price) {
            const { price } = experience_price;
            if (type === 'DIGITAL') {
                if (price.price != '') {
                    return price.price;
                } else return emptyString;
            } else {
                if (price.length > 0) {
                    const allPrices = price.map((item) => item.price);
                    const min = Math.min(...allPrices);
                    return min;
                } else return emptyString;
            }
        } else return emptyString;
    } else return emptyString;
};

export const xrate = (arrayNb, fromCur, toCur) => {
    const rate = 1.5;
    return {
        values: arrayNb.map((nb) => {
            return nb * rate;
        }),
        currency: {
            name: currenciesObject[toCur].name_plural,
            code: toCur,
            symbol: currenciesObject[toCur].symbol
        }
    };
};

// Create our number formatter.
export const formatPrice = (
    value,
    currency,
    locale = 'en-US',
    options,
    style = 'decimal',
    prefix = '',
    suffix = ''
) => {
    let rounding;
    if (!options) rounding = currenciesObject[currency].budget_rounding;
    else {
        if (options.rounding) rounding = options.rounding;
        else rounding = 1;
    }

    const formatter = new Intl.NumberFormat(locale, {
        style,
        currency: currency
    });
    return `${prefix}${formatter.format(
        Math.round(value / rounding) * rounding
    )}${suffix}`;
};

export const getBrowserLocale = () => {
    return typeof window !== 'undefined' ? window.navigator.language : 'en-US';
};

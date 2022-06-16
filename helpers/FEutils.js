// Returns true if text is longer than count or if it has any of the words in findWords
export const pageCount = (count, itemsPerPage) => {
    return Math.ceil(count / itemsPerPage);
};

export const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomItem = (array) => {
    return array[randomNumber(0, array.length - 1)];
};

export const checkMultiLine = (str, count) => {
    const findWords = [, '<br>', '<br/>', '\r', '\n'];
    let result = false;
    if (str.length > count) {
        result = true;
    } else {
        for (let i = 0; i < findWords.length; i++) {
            if (str.indexOf(findWords[i]) > 0) {
                result = true;
                break;
            }
        }
    }

    return result;
};

export const handleRowReverse = (rtl) => {
    return {
        flex: rtl ? 'flex-row-reverse ' : 'flex-row ',
        flexreverse: rtl ? 'flex-row' : 'flex-row-reverse',
        text: rtl ? 'text-right ' : '',
        arrowLong: rtl ? 'ARROW_LEFT_LONG' : 'ARROW_RIGHT_LONG',
        arrowShort: rtl ? 'ARROW_LEFT_SHORT' : 'ARROW_RIGHT_SHORT',
        editor: rtl ? 'ql-rtl' : '',
        mr: rtl ? 'ml' : 'mr',
        ml: rtl ? 'mr' : 'ml',
        right: rtl ? 'left' : 'right',
        left: rtl ? 'right' : 'left',
        RIGHT: rtl ? 'LEFT' : 'RIGHT',
        LEFT: rtl ? 'RIGHT' : 'LEFT',
        rtl: rtl ? 'kn-rtl' : '',
        ltr: rtl ? '' : 'kn-ltr',
        pr: rtl ? 'pl' : 'pr',
        pl: rtl ? 'pr' : 'pl',
        menuTranslate: rtl ? 'translate-x-full' : '-translate-x-full',
        menuTranslateReverse: rtl ? '-translate-x-full' : 'translate-x-full',
        pageTranslate: rtl ? '-translate-x-48' : 'translate-x-48',
        justify: rtl ? 'justify-end' : 'justify-start',
        justifyreverse: rtl ? 'justify-start' : 'justify-end',
        smText: rtl ? '' : '',
        neg: rtl ? '-' : '',
        negReverse: rtl ? '' : '-'
    };
};

export const objLength = (arrObj) => {
    const newObj = arrObj.map((item) => {
        return item.text;
    });
    return newObj;
};

export const urlArrLength = (arrObj) => {
    const newObj = arrObj.map((item) => {
        return item.label || item.url;
    });
    return newObj;
};

export const testValidUrl = (str) => {
    var regexp =
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    return regexp.test(str);
};

export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const kreatorName = (profile) => {
    return profile?.displayname || profile?.first || profile?.username;
};

export const getDays = (days) => {
    return `${days}  ${days > 1 ? 'Days' : 'Day'}`;
};

export const pluralize = (nb, str) => {
    return nb > 1 ? `${nb} ${str}s` : `${nb} ${str}`;
};

export const calculateCheckout = (data, query) => {
    const { coupons } = data;
    const qty = Number(query?.guests) || 1;
    const unitPrice = Number(data.price);
    const subTotal = unitPrice * qty;
    const discountArr = coupons
        .map((coupon) => {
            return validateCoupon(coupon, subTotal);
        })
        .filter((elm) => elm);
    const reducer = (previous, current) => {
        const newVal = previous.discount + current.discount;

        return newVal;
    };
    const discountTotal = discountArr.length
        ? discountArr.length > 1
            ? discountArr.reduce(reducer)
            : discountArr[0].discount
        : 0;

    const taxRate = 0;
    const tax = taxRate * (subTotal + discountTotal);
    const total = subTotal + discountTotal + tax;

    return {
        unitPrice,
        qty,
        subTotal,
        discountTotal,
        discountArr,
        taxRate,
        tax,
        total
    };
};

export const validateCoupon = (coupon, price) => {
    const {
        code,
        description,
        type,
        value,
        start_date,
        end_date,
        is_active,
        timeless,
        site_wide
    } = coupon;
    let discount = 0;

    if (type == 'percent') discount = (value * price) / 100;
    // value is in %
    else if (type == 'fixed') discount = value;
    // in cents
    else discount = 0;
    if (
        is_active &&
        (timeless || isDateBetween(new Date(Date.now()), start_date, end_date))
    ) {
        return {
            code,
            discount,
            description
        };
    } else return null;
};

export const isDateBetween = (dateStr, startDateStr, endDateStr) => {
    const checkDate = new Date(dateStr).getTime();
    const startDate = new Date(startDateStr).getTime();
    const endDate = new Date(endDateStr).getTime();

    if (checkDate >= startDate && checkDate <= endDate) return true;
    else return false;
};

export const validateEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
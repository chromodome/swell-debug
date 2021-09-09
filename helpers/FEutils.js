// Returns true if text is longer than count or if it has any of the words in findWords

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

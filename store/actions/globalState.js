import * as types from 'store/actions/types';

export function toggleNav(navIsOpen) {
    return (dispatch) => {
        dispatch({
            type: types.TOGGLE_NAV,
            navIsOpen
        });
    };
}

export function toggleCart(cartIsOpen) {
    return (dispatch) => {
        dispatch({
            type: types.TOGGLE_CART,
            cartIsOpen
        });
    };
}

export function toggleLang(lang) {
    return (dispatch) => {
        dispatch({
            type: types.TOGGLE_LANG,
            lang
        });
    };
}

export function toggleCountryList(countryListIsOpen) {
    return (dispatch) => {
        dispatch({
            type: types.TOGGLE_COUNTRYLIST,
            countryListIsOpen
        });
    };
}

export function toggleAuthModal(authModalIsOpen) {
    return (dispatch) => {
        dispatch({
            type: types.TOGGLE_AUTH_MODAL,
            authModalIsOpen
        });
    };
}

export function setAuthPage(authComponent) {
    return (dispatch) => {
        dispatch({
            type: types.SET_AUTH_PAGE,
            authComponent
        });
    };
}

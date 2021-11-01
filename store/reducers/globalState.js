/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { produce } from 'immer';

import * as types from 'store/actions/types';

const initialState = {
    lang: 'en',
    rtl: false,
    navIsOpen: false,
    authModalIsOpen: false,
    authComponent: 'login',
    pageLoading: true,
    siteData: {
        loading: true,
        tags: [],
        placesLists: [],
        categories: [],
        settings: {
            whatsIncluded: {},
            xchangeRates: {}
        }
    }
};

function createReducer(initialState, handlers) {
    return produce((draft = initialState, action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](draft, action);
        } else {
            return draft;
        }
    });
}

const toggleLang = (draft, action) => {
    const { lang } = action;

    return {
        ...draft,
        lang
    };
};

const toggleNav = (draft, action) => {
    const { navIsOpen } = action;

    return {
        ...draft,
        navIsOpen
    };
};

const toggleAuthModal = (draft, action) => {
    const { authModalIsOpen } = action;

    return {
        ...draft,
        authModalIsOpen
    };
};

const setAuthPage = (draft, action) => {
    const { authComponent } = action;

    return {
        ...draft,
        authComponent
    };
};

const setStartUpData = (draft, action) => {
    const {
        payload: {
            data: {
                data: {
                    tags,
                    categories,
                    setting: { whatsIncluded, xchangeRates },
                    placesLists
                }
            }
        }
    } = action;

    draft.siteData.loading = false;
    draft.siteData.placesLists = placesLists;
    draft.siteData.categories = categories;
    draft.siteData.tags = tags.filter((tag) => tag.type === 'general');
    draft.siteData.settings.whatsIncluded = whatsIncluded;
    draft.siteData.settings.xchangeRates = xchangeRates;
    return draft;
};

export default createReducer(initialState, {
    [types.TOGGLE_LANG]: toggleLang,
    [types.TOGGLE_NAV]: toggleNav,
    [types.TOGGLE_AUTH_MODAL]: toggleAuthModal,
    [types.SET_AUTH_PAGE]: setAuthPage,

    [`${types.GET_STARTUP_DATA}_FULFILLED`]: setStartUpData
});

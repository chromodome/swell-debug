import * as types from 'store/actions/types';

export function toggleNav(navIsOpen) {
    return (dispatch) => {
        dispatch({
            type: types.TOGGLE_NAV,
            navIsOpen
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

export function toggleEdit(edit) {
    return (dispatch) => {
        dispatch({
            type: types.TOGGLE_EDITMODE,
            edit
        });
    };
}

export function toggleSuperAdmin(isSuperAdmin) {
    return (dispatch) => {
        dispatch({
            type: types.TOGGLE_SUPERADMIN,
            isSuperAdmin
        });
    };
}

export function toggleToolTips(toolTips) {
    return (dispatch) => {
        dispatch({
            type: types.TOGGLE_TOOLTIPS,
            toolTips
        });
    };
}

export function toggleTour(tour) {
    return (dispatch) => {
        dispatch({
            type: types.TOGGLE_TOUR,
            tour
        });
    };
}

export function googleMapsInitialised() {
    return (dispatch) => {
        dispatch({
            type: types.GOOGLE_MAP_INITIALISED
        });
    };
}

export function googleMapsInitialisedFailed() {
    return (dispatch) => {
        dispatch({
            type: types.GOOGLE_MAP_INITIALISED_FAILED
        });
    };
}

export function setFilterStatus(filterType, value) {
    return (dispatch) => {
        dispatch({
            type: types.SET_FILTER,
            filterType,
            value
        });
    };
}
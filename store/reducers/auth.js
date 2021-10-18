/* eslint-disable import/no-anonymous-default-export */
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    USER_PROFILE_MISSING,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    AUTH_ERROR,
    AUTH_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    AUTH_CLEAR_ERRORS,
    CREATE_PROFILE,
    UPDATE_USER_BY_ID,
    UPDATE_PROFILE
} from 'store/actions/types';

const initialState = {
    // token: null,
    token:
        typeof window !== 'undefined' ? localStorage?.getItem('token') : null,
    isAuthenticated: null,
    isProfile: false,
    loading: false,
    error: null,
    user: null
};

export default function (state = initialState, action) {
    const { payload, type } = action;
    switch (type) {
        case `${UPDATE_PROFILE}_PENDING`:
        case `${CREATE_PROFILE}_PENDING`:
        case AUTH_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };

        case USER_LOADED:
        case USER_PROFILE_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isProfile: true,
                loading: false,
                user: payload,
                error: null
            };
        case USER_PROFILE_MISSING:
        case USER_PROFILE_FAIL:
            return {
                ...state,
                isAuthenticated: true,
                isProfile: false,
                loading: false,
                user: payload,
                error: null
            };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.jwt);
            return {
                ...state,
                token: payload.jwt,
                isAuthenticated: true,
                isProfile: false,
                loading: true,
                error: null
            };

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                isProfile: false,
                error: payload,
                user: null
            };
        case AUTH_CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        case `${UPDATE_USER_BY_ID}_FULFILLED`:
            return {
                ...state,
                user: payload.data.data.updateUser.user
            };
        default:
            return state;
    }
}

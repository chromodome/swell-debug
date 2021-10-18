/* eslint-disable import/no-anonymous-default-export */
import {
    PAYMENT_PROCESSING,
    PAYMENT_SUCCESS,
    PAYMENT_FAIL,
    PAYMENT_CLEAR_ERRORS
} from 'store/actions/types';

const initialState = {
    processing: false,
    error: null
};

export default function (state = initialState, action) {
    const { payload, type } = action;
    switch (type) {
        case PAYMENT_PROCESSING:
            return {
                ...state,
                processing: true,
                error: null
            };

        case PAYMENT_SUCCESS:
            localStorage.setItem('token', payload.jwt);
            return {
                ...state,
                processing: false,
                error: null
            };

        case PAYMENT_FAIL:
            return {
                ...state,
                processing: false,
                error: payload
            };
        case PAYMENT_CLEAR_ERRORS:
            return {
                ...state,
                processing: false,
                error: null
            };

        default:
            return state;
    }
}

import * as types from '@/store/actions/types';
import {ORDER_THANKS_VIEWED} from './types';

export function addOrderData(payload) {
    return (dispatch) => {
        dispatch({
            type: types.ORDER_SUCCESSS,
            payload
        });
    };
}

export function setViewedThanks() {
    return (dispatch) => {
        dispatch({
            type: types.ORDER_THANKS_VIEWED
        });
    };
}
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { produce } from 'immer';

import * as types from 'store/actions/types';
import {
    updateCart,
    fetchingCart
} from './cart/'

const initialState = {
    loading: true,
    error: false,
    digital: {},
    guided: {}
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
export default createReducer(initialState, {
    [`${types.ADD_VOUCHER_TO_CART}_FULFILLED`]: updateCart,
    [`${types.GET_CART}_PENDING`]: fetchingCart,

    [`${types.UPDATE_CART}_FULFILLED`]: updateCart,
    [`${types.UPDATE_CART}_PENDING`]: fetchingCart,

    [`${types.ADD_TO_CART}_FULFILLED`]: updateCart,
    [`${types.ADD_TO_CART}_PENDING`]: fetchingCart,

    [`${types.REMOVE_FROM_CART}_FULFILLED`]: updateCart,
    [`${types.REMOVE_FROM_CART}_PENDING`]: fetchingCart,
    
    [`${types.ADD_VOUCHER_TO_CART}_FULFILLED`]: updateCart,
    [`${types.ADD_VOUCHER_TO_CART}_PENDING`]: fetchingCart,
    
    [`${types.REMOVE_VOUCHER_FROM_CART}_FULFILLED`]: updateCart,
    [`${types.REMOVE_VOUCHER_FROM_CART}_PENDING`]: fetchingCart,
});

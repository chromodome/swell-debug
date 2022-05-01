/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { produce } from 'immer';

import * as types from 'store/actions/types';
import {GET_PURCHASES} from '../actions/types';
import {
    updatePurchases,
    purchasesRejected,
    fetchingPurchases,
    updatePurchasesIds,
    fetchingPurchasesIds,
    purchasesRejectedIds,
} from './purchases/'

const initialState = {
    loading: true,
    error: false,
    purchasedIds:[],
    guided: [],
    digital: []
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
    [`${types.GET_PURCHASES}_FULFILLED`]: updatePurchases,
    [`${types.GET_PURCHASES}_PENDING`]: fetchingPurchases,
    [`${types.GET_PURCHASES}_REJECTED`]: purchasesRejected,

    [`${types.GET_PURCHASE_IDS}_FULFILLED`]: updatePurchasesIds,
    [`${types.GET_PURCHASE_IDS}_PENDING`]: fetchingPurchasesIds,
    [`${types.GET_PURCHASE_IDS}_REJECTED`]: purchasesRejectedIds,

});

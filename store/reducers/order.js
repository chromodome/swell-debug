/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { produce } from 'immer';
import * as types from 'store/actions/types';

const initialState = {
    data: null,
    viewed: true
};

export const addOrderData = (draft, action) => {
    const { payload } = action;

    draft.data = payload;
    draft.viewed = false;
    
    return draft;
};

export const thanksViewed = (draft, action) => {

    draft.viewed = true;

    return draft;
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
    [types.ORDER_SUCCESSS]: addOrderData,
    [types.ORDER_THANKS_VIEWED]: thanksViewed,
});

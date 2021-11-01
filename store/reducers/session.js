/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { produce } from 'immer';

import * as types from 'store/actions/types';

const initialState = {
    ip: null
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

const setIpData = (draft, action) => {
    const {
        payload: { data }
    } = action;

    draft.ip = data;

    return draft;
};

export default createReducer(initialState, {
    [`${types.GET_IP_DATA}_FULFILLED`]: setIpData
});

/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { produce } from 'immer';

import * as types from 'store/actions/types';

// import {
//     setExperiencesAll,
//     creatExperiencePending,
//     creatExperienceFufilled,
//     clearAllExperiences,
//     updateTags,
//     updateCats,
//     updateGuideIncludes
// } from './experienceDetails/master/master';

import {
    updateCart,
    fetchingCart
} from './cart/'

const initialState = {
    loading: true,
    error: false,
    digital: {

    },
    guided: {
        
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
export default createReducer(initialState, {
    [`${types.GET_CART}_FULFILLED`]: updateCart,
    [`${types.GET_CART}_PENDING`]: fetchingCart,

    [`${types.UPDATE_CART}_FULFILLED`]: updateCart,
    [`${types.UPDATE_CART}_PENDING`]: fetchingCart,

    [`${types.ADD_TO_CART}_FULFILLED`]: updateCart,
    [`${types.ADD_TO_CART}_PENDING`]: fetchingCart,

    [`${types.REMOVE_FROM_CART}_FULFILLED`]: updateCart,
    [`${types.REMOVE_FROM_CART}_PENDING`]: fetchingCart,

    // [`${types.GET_EXPERIENCES}_FULFILLED`]: setExperiencesAll,
    // [`${types.GET_EXPERIENCES_ISADMIN}_FULFILLED`]: setExperiencesAll,
    // [`${types.GET_EXPERIENCES}_REJECTED`]: () => {
    //     console.log('_REJECTED');
    // },
    // [`${types.GET_PUBLISHED_EXPERIENCES}_PENDING`]: () => {
    //    // console.log('_PENDING');
    // },
    // [`${types.GET_PUBLISHED_EXPERIENCES}_FULFILLED`]: setExperiencesAll,
    // [`${types.GET_PUBLISHED_EXPERIENCES}_REJECTED`]: () => {
    //     console.log('_REJECTED');
    // },


    
    // [`${types.CREATE_EXPERIENCE}_PENDING`]: creatExperiencePending,
    // [`${types.CREATE_EXPERIENCE}_FULFILLED`]: creatExperienceFufilled,
    // [`${types.CREATE_EXPERIENCE}_REJECTED`]: () => {
    //     console.log('_REJECTED');
    // },
    // [types.CLEAR_ALL_EXPERIENCES]: clearAllExperiences,
    // [types.UPDATE_TAGS]: updateTags,
    // [types.UPDATE_CATS]: updateCats,
    // [types.UPDATE_GUIDE_INCLUDES]: updateGuideIncludes,
});

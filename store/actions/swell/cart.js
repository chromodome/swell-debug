
import { getCart, addCart, updateCart, removeFromCart, updateItemCart, addVoucher }  from '@/swell/api/cart';
import * as types from '@/store/actions/types';
import {ADD_VOUCHER_TO_CART} from '../types';
import {removeVoucher} from '../../../swell/api/cart';

export const fetchCartAction = () => {
    return (dispatch) =>
        dispatch({
            type: types.GET_CART,
            payload: getCart()
        })
            .then((res) => res)
            .catch((error) => {
                // console.log(error);
                // serverErrors(error);
                // return { error };
            });
};

export const addVoucherAction = (voucher) => {
    return (dispatch) =>
        dispatch({
            type: types.ADD_VOUCHER_TO_CART,
            payload: addVoucher(voucher)
        })
            .then((res) => res)
            .catch((error) => {
                // console.log(error);
                // serverErrors(error);
                return  error ;
            });
};

export const removeVoucherAction = () => {
    return (dispatch) =>
        dispatch({
            type: types.REMOVE_VOUCHER_FROM_CART,
            payload: removeVoucher()
        })
            .then((res) => res)
            .catch((error) => {
                // console.log(error);
                // serverErrors(error);
                // return { error };
            });
};

export const removeFromCartAction = (id) => {
    return (dispatch) =>
        dispatch({
            type: types.REMOVE_FROM_CART,
            payload: removeFromCart(id)
        })
            .then((res) => res)
            .catch((error) => {
                // console.log(error);
                // serverErrors(error);
                // return { error };
            });
};
export const updateCartAction = (pData) => {
    
    return (dispatch) =>
        dispatch({
            type: types.UPDATE_CART,
            payload: updateCart(pData)
        })
            .then((res) => res)
            .catch((error) => {
                // console.log(error);
                // serverErrors(error);
                // return { error };
            });
};
export const updateItemCartAction = (id, obj) => {
    return (dispatch) =>
        dispatch({
            type: types.UPDATE_CART,
            payload: updateItemCart(id, obj)
        })
            .then((res) => res)
            .catch((error) => {
                // console.log(error);
                // serverErrors(error);
                // return { error };
            });
};
// updateItemCart
export const postCartAction = (pData) => {
    return (dispatch) =>
        dispatch({
            type: types.ADD_TO_CART,
            payload: addCart(pData)
        })
            .then((res) => res)
            .catch((error) => {
                // console.log(error);
                // serverErrors(error);
                // return { error };
            });
};



// export const GET_CART = 'GET_CART';
// export const ADD__TO_CART = 'ADD__TO_CART';
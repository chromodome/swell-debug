
import axios from 'axios';
import { getCart, addCart }  from '@/swell/api/cart';
import * as types from '@/store/actions/types';

export const fetchCart = () => {
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



// export const GET_CART = 'GET_CART';
// export const ADD__TO_CART = 'ADD__TO_CART';
import axios from 'axios';
import * as types from '@/store/actions/types';
import { serverErrors } from '@/helpers/serverErrors';


export const fetchPurchasedAll = () => {
    const gql = String.raw;

    return (dispatch) =>
        dispatch({
            type: types.GET_PURCHASES,
            payload: axios.post(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
                query: gql`
                    query{
                        purchasesByUser {
                            id
                            experience_id
                            people
                            travel_date
                            title
                            type
                            experience {
                            title
                            experience_id
                            featured_image
                            type
                            createdAt,
                            days,
                            user {
                                    _id
                                    id
                                    username
                                    role {
                                        id
                                    }
                                    profile {
                                        avatar
                                        country
                                        currency
                                        displayname
                                        first
                                        id
                                        last
                                    }
                                },
                            places_lists{
                                name
                                code
                            },
                            # content
                            }
                        }
                }`
            })
        })
        .then((res) => res)
        .catch((error) => {
            serverErrors(error);

            return { error };
        });
}

export const fetchPurchasedIds = () => {
    const gql = String.raw;

    return (dispatch) =>
        dispatch({
            type: types.GET_PURCHASE_IDS,
            payload: axios.post(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
                query: gql`
                    query{
                        purchasesByUser {
                            id
                            experience_id
                            }
                }`
            })
        })
        .then((res) => res)
        .catch((error) => {
            serverErrors(error);

            return { error };
        });
}

export const postPurchase = (postData) => {
    return (dispatch) =>
        dispatch({
            type: types.POST_PURCHASE,
            payload: axios.post(`${process.env.NEXT_PUBLIC_API_URL}/purchases`, postData)
        })
        .then((res) => res)
        .catch((error) => {
            serverErrors(error);

            return { error };
        });
}


export function resetPurchase() {
    return (dispatch) => {
        dispatch({
            type: types.RESET_PURCHASES
        });
    };
}

export function setPurchaseIdsChangedFlag() {
    return (dispatch) => {
        dispatch({
            type: types.SET_PURCHASEDIDS_FLAG
        });
    };
}
import axios from 'axios';
import * as types from 'store/actions/types';
import { serverErrors } from 'helpers/serverErrors';
import { API_URL } from '../../config';

export const fetchStartupData = (params) => {
    return (dispatch) =>
        dispatch({
            type: types.GET_STARTUP_DATA,
            payload: axios.post(`${API_URL}/graphql`, {
                query: `
                        query start_up_data {
                            setting {
                                whatsIncluded,
                                xchangeRates
                            },
                            placesLists {
                                id,
                                code
                            } ,
                            destinations: destinations(where: { visible: true }, sort: "order_index:asc") {
                                id
                                name
                                image
                                description
                                country_list
                                order_index
                            },
                            categories {
                                id,
                                name,
                            },
                            tags {
                                id,
                                name,
                                related,
                                type
                            }
                        }`
            })
        })
            .then((res) => res)
            .catch((error) => {
                serverErrors(error);

                return { error };
            });
};

export const fetchIpData = (params) => {
    return (dispatch) =>
        dispatch({
            type: types.GET_IP_DATA,
            payload: axios.get(`http://ip-api.com/json`)
        })
            .then((res) => res)
            .catch((error) => {
                // console.log(error);
                // serverErrors(error);
                // return { error };
            });
};

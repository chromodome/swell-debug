import axios from 'axios';
import { serverErrors } from '@/helpers/serverErrors';
import * as types from '@/store/actions/types';

export const createDataAdmin = (type, end, data) => {
    return (dispatch) =>
        dispatch({
            type,
            payload: axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/${end}`,
                data
            )
        })
            .then((res) => res)
            .catch((error) => {
                serverErrors(error);

                return { error };
            });
};

export const updateDataAdmin = (type, end, data, id) => {
    return (dispatch) =>
        dispatch({
            type,
            payload: axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/${end}/${id}`,
                data
            )
        })
            .then((res) => res)
            .catch((error) => {
                serverErrors(error);

                return { error };
            });
};

export const deleteDataAdmin = (type, end, id) => {
    return (dispatch) =>
        dispatch({
            type,
            payload: axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/${end}/${id}`
            )
        })
            .then((res) => res)
            .catch((error) => {
                serverErrors(error);

                return { error };
            });
};

export const updateUserAdmin = (id, profileId, data) => {
    const {
        email,
        password,
        profile: {
            first,
            last,
            displayname,
            country,
            currency,
            city,
            bio,
            avatar,
            social
        }
    } = data;
    let socialStr = '';
    Object.keys(social).forEach((key) => {
        socialStr = `${socialStr},${key}: "${social[key]}"`;
    });

    return (dispatch) =>
        dispatch({
            type: types.UPDATE_USER_BY_ID,
            payload: axios.post(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
                query: `
                mutation {
                    updateProfile(input: {
                        where: {
                            id: "${profileId}"
                        },
                        data: {
                            first: "${first}",
                            last: "${last}",
                            country: "${country}",
                            bio: "${bio}",
                            avatar: "${avatar}",
                            displayname: "${displayname}",
                            city:"${city}",
                            currency:"${currency}",
                            social: {${socialStr}}
                        }
                        }
                    ) {
                        profile {
                            id
                        }
                    },
                    
                    updateUser(input: {
                        where: { 
                            id: "${id}"
                        },
                        data: {
                            email: "${email}",
                            ${
                                password.length
                                    ? `, password: "${password}"`
                                    : ''
                            }
                        }
                        }
                    ) {
                        user {
                            id,
                            _id,
                            username,
                            email,
                            confirmed,
                            blocked,
                            profile {
                                avatar,
                                bio,
                                city,
                                country,
                                createdAt,
                                currency,
                                displayname,
                                first,
                                id,
                                last,
                                published_at,
                                settings,
                                social,
                                updatedAt,
                                _id
                            }
                        }
                    },
                }`
            })
        })
            .then((res) => res)
            .catch((error) => {
                serverErrors(error);

                return { error };
            });
};

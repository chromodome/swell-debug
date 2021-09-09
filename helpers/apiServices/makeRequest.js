import axios from 'axios';

export const makeRequest = ({ url, method, params, data, headers }) => {
    return axios({
        url,
        method,
        params,
        data,
        headers
    });
};

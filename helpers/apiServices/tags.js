import useSWR from 'swr';
import makeRequest from './makeRequest';
import { API_URL } from '../../config';

const getAllTags = (url = null) => {
    return makeRequest({
        url: `${API_URL}${url ? url : '/tags'}`,
        method: 'GET'
    });
};

const getAllTagsSwr = () => {
    const { data, error } = useSWR(`/tags`, getAllTags);

    return { data, error };
};
export { getAllTags, getAllTagsSwr };

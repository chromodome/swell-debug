import makeRequest from '../makeRequest';
import { API_URL } from '../../config';

const getAllTags = () => {
    return makeRequest({
        url: `${API_URL}/api/content`,
        method: 'GET'
    });
};

export { getAllTags };

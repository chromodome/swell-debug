import makeRequest from './makeRequest';
import { API_URL } from '../../config';

const getExperiences = () => {
    return makeRequest({
        url: `${API_URL}/experiences`,
        method: 'GET'
    });
};

export { getExperiences };

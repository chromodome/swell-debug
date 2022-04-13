import fetchApi from '../fetch-swell-api'

const getSwellExperience = async (expId) => {
    const exp = await fetchApi('get', null, {"expand": ["categories"]},  `/products/?content.experience_id=${expId}`);

    return exp;
}

export default getSwellExperience;
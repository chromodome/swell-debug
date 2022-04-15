import fetchApi from '../fetch-swell-api'

const getSwellExperience = async (slug) => {
    const exp = await fetchApi('get', null, {"expand": ["categories"]},  `/products/?slug=${slug}`);

    return exp;
}

export default getSwellExperience;
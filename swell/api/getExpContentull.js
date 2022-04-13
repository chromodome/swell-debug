import contentFullConnect from '../contentful'

const getExpContentfull = async (cmsId) => {
    let env = await contentFullConnect();
    let entry = await env.getEntry(cmsId);


    return entry;
}

export default getExpContentfull;
import getSwellExperience from './getSwellExperience';
import getExpContentfull from './getExpContentull';

const getMarketingExperience = async (expId) => {
    const swellExp = await getSwellExperience(expId);
    const contentFulExp = await getExpContentfull(swellExp?.results[0].content.cms_entry_id);

    return { ...contentFulExp, swellExp: swellExp?.results[0] };
}

export default getMarketingExperience;
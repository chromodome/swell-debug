import getExpContentfull from './getExpContentull';
import { SwellController } from '@/swell/api/swellNode';

const getMarketingExperience = async (slug) => {
    const swellExp = await SwellController.getExperienceBySlug(slug)

    const contentFulExp = await getExpContentfull(swellExp?.results[0].content.cms_entry_id);

    return { ...contentFulExp, swellExp: swellExp?.results[0] };
}

export default getMarketingExperience;
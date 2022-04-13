import getMarketingExperience  from '@/swell/api/getMarketingExperience';

export default async (req, res) => {
    if(req.method === 'GET') {
        try {
            const response = await getMarketingExperience(req.query.id);

            res.status(200).json(response);

        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({
            message: `Method ${req.method} is not allowed`,
        });
    }
};

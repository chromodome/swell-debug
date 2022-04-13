import { SwellController } from '@/swell/api/swellNode';


export default async (req, res) => {
    if(req.method === 'GET') {
        const category = req?.query?.id || '';

        try {
            let response = null;
            
            response = await SwellController.byCategory(category);

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
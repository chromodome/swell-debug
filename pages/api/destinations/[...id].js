import { SwellController } from '@/swell/api/swellNode';


export default async (req, res) => {
    if(req.method === 'GET') {
        const dest = req?.query?.id[0] || '';
        const type = req?.query?.id[1] || 'all';
        const limit = req?.query?.limit || 10;
        const page = req?.query?.page || 1;

        try {
            let response = null;
            
            response = await SwellController.byDestination(dest, type, limit, page);

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
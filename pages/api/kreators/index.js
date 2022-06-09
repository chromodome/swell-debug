import { SwellController } from '@/swell/api/swellNode';


export default async (req, res) => {
    if(req.method === 'GET') {
        const limit = req?.query?.limit || 10;
        const page = req?.query?.page || 1;

        try {
            let response = null;
            
            response = await SwellController.getKreators(limit, page);

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
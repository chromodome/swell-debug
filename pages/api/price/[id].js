import { swellGetPriceDigital, swellgetGuidedPrice }  from '@/swell/api/price';

export default async (req, res) => {
    if(req.method === 'GET') {
        try {
            let response = null;
            if(req.query.type === 'DIGITAL') {
                response = await swellGetPriceDigital(req.query.id);
            } else {
                response = await swellgetGuidedPrice(req.query.id);
            }

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

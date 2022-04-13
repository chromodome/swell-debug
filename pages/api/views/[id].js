import  swellServer from '../../../swell/swell';

export default async (req, res) => {
    const { id, views } = req.query;

    if(req.method === 'PUT') {
        try {
            const response =  await swellServer.put(`/products/${id}`, {
                content: {
                    views
                }
            });

            res.status(200).json(response);

        } catch (e) {
            res.status(500).json(e);
        }
    } else if(req.method === 'GET') {
        const { id } = req.query;
        const response =  await swellServer.get(`/products/${id}?fields=content.views`);

        res.status(200).json(response);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({
            message: `Method ${req.method} is not allowed`,
        });
    }
};

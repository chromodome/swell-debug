const { featured } = require('@/mockdata/featured.json');

export default (req, res) => {
    if (req.method === 'GET') {
        res.status(200).json(featured);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({
            message: `Method ${req.method} is not allowed`,
        });
    }
};

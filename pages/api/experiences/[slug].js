const { experiences } = require('@/mockdata/experiences.json');

export default (req, res) => {
    const exp = experiences.filter(
        (experience) => experience.slug === req.query.slug
    );

    if (req.method === 'GET') {
        res.status(200).json(exp);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({
            message: `Method ${req.method} is not allowed`,
        });
    }
};

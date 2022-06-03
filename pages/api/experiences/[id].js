import { getExperienceById } from '@/apiServices/experiences';

export default async (req, res) => {
    // const experience = experiences.filter(
    //     (experience) => experience.id === req.query.id
    // );

    // if (req.method === 'GET') {
    //     res.status(200).json(experience);
    // } else {
    //     res.setHeader('Allow', ['GET']);
    //     res.status(405).json({
    //         message: `Method ${req.method} is not allowed`
    //     });
    // }

    try {
        const response = await getExperienceById(req.query.id);

        return response.data;
    } catch (e) {
        return e;
    }
};

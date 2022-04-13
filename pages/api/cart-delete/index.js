import { getCart, addCart }  from '@/swell/api/cart';

export default async (req, res) => {
    if(req.method === 'GET') {
        try {
            let response = null;

            // response = await   addCart({ product_id: '620bd3282007783876e1b116'});
            // console.log('add', response)
            response = await getCart();
console.log('get', response)
            res.status(200).json(response);

        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        // update
        res.setHeader('Allow', ['GET']);
        res.status(405).json({
            message: `Method ${req.method} is not allowed`,
        });
    }
};

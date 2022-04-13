import  swellServer from '../../../swell/swell';
// import { SWELL_STORE_ID, SWELL_PRIVATE_KEY } from './const'



export default async (req, res) => {
   // swellServer.init("viakonnect", "P23mUClYBebr9NRimHb6bavynwoB1ABB");
    console.log('----:', req.method)
    if(req.method === 'GET') {
        try {
            const response =  await swellServer.get(`/products/623af66b8fa1f37a3fe78436?fields=content.views`, {
                
            });

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

// import swell from 'swell-node';
// import { SWELL_STORE_ID, SWELL_PRIVATE_KEY } from '../const'

// swell.init(SWELL_STORE_ID, SWELL_PRIVATE_KEY);

// const updateViews =  (id, views) => {
//     // const updated =  await swell.put(`/products/${id}`, {
//     //     content: {
//     //         views
//     //     }
//     // });

//     return 'updated';
// };

// export default updateViews;

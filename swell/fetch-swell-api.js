import swell from './swelljs'

const fetchApi = async (query='get', method='list', variables={}, queryStr) => {
    if(query === 'get') {
        return await swell[query](queryStr, {...variables});
    } 
    if(method === 'updateItem') {
        return await swell[query][method](queryStr, {...variables})
    } else if(method === 'applyCoupon') {
        return await swell.cart.applyCoupon(variables);
    } else if(method === 'removeCoupon') {
        swell.cart.removeCoupon();
    }

    return await swell[query][method](typeof variables === 'string' ? variables : Array.isArray(variables) ? [...variables] : {...variables});
}
// , content: {cust_id: "60e1ff132fe7042f353d1b28"}
export default fetchApi
// console.log('query', query)

    // const cc = await swell.products.list({
    //     limit: 25, // Max. 100
    //     page: 1
    // })

    // swell.products.get('5c15505200c7d14d851e510f')

//     return  await swell.get(`/products/?content.publish_id=6218b2cc5def897c44fcce98`,
//     {
//         "expand": ["categories"]
//     }
// );

// await swell.products.list({
//     category: 't-shirts',
//     limit: 25,
//     page: 1
//   })
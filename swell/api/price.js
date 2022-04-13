import fetchApi from '../fetch-swell-api';

// const fetchApi = async (query='get', method='list', variables={}, queryStr) => {
//     if(query === 'get') {
//         return await swell[query](queryStr, {...variables});
//     } 

//     return await swell[query][method]({...variables});
// }
//  const exp = await fetchApi('get', null, {"expand": ["categories"]},  `/products/?content.experience_id=${expId}`);
export const swellGetPriceDigital = async (expId) => {
    const exp = await fetchApi('get', null, {},  `/products/?content.experience_id=${expId}&fields=price`);

    return exp;
}

export const  swellgetGuidedPrice = async (expId) => {
    const exp = await fetchApi('get', null, {  expand: [  "variants:1000"] },  `/products/?content.experience_id=${expId}&fields=stock,options,id`);

    // const exp =  await fetchApi(, 'get', {
    //     expand: [ "stock:1000", "variants:1000"]
    // });

    return exp;
}
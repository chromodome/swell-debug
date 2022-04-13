// import swellServer from '../swell';
import swell from './swelljs'
const getLatestExperiences = async (limit = 12) => {
    // const recents =  await swellServer.get('/products/?sort=date_created+desc', {
    //     where: {
    //         active: true,
    //     },
    // });

    const recents = await swell.products.list({
        limit: 3,
        page: 1
    })

    return recents;
}

export default getLatestExperiences;
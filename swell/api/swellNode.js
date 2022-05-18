import swellServer from '../swell';
import { countriesArray } from '@/helpers/countriesArray';

class SwellController {

    constructor() {
        
    }

    getLatestExpVariants = async (swellExpId) => {
        console.log('swellExpIdswellExpIdswellExpIdswellExpIdswellExpIdswellExpId')
        const recents =  await swellServer.get('/products:variants/', {
            "parent_id": swellExpId,
            "active": true,
            "archived": false,
        });
console.log(recents)
        return recents;
    }

    getLatestExperiences = async (limit = 12) => {
        const recents =  await swellServer.get('/products/?sort=date_created+desc', {
            active: true,
            limit,
        });

        return recents;
    }
// ?content.destinations=United Kingdom&content.destinations=Saudi Arabia
    trending = async (limit = 12) => {
        const trending =  await swellServer.get('/products/?sort=content.views+desc', {
            active: true,
            limit,
        });

        return trending;
    }

    bySearch = async (type, limit, page) => {
        let queryObj = {};
        if(type !== 'all') {
            queryObj["content.type"] = type
        }

        const response =  await swellServer.get('/products/?sort=name+asc', {
            active: true,
            limit,
            page,
            ...queryObj
        });

        return response;
    }

    byUser = async (username, type, limit, page) => {
        const queryObj = {};

        if(type !== 'all') {
            queryObj["content.type"] = type
        }
        const response =  await swellServer.get('/products/?sort=name+desc', {
            active: true,
            limit,
            page,
            ...queryObj,
            "content.username": username
        });

        return response;
    }

    byCategory = async (category, type, limit, page) => {
        const queryObj = {};

        if(type !== 'all') {
            queryObj["content.type"] = type
        }

        const response =  await swellServer.get('/products/?sort=name+desc', {
            active: true,
            limit,
            page,
            ...queryObj,
            category
        });

        return response;
    }

    byDestination= async (dest, type, limit, page) => {
        const queryObj = {};
        const destArray = dest.split('-') || [];
        const destOrArray = destArray.reduce((prev, next) => {
            const foundCountry = countriesArray.find( elm => elm.code === next);
                if(foundCountry) {
                    return [...prev, { "content.destinations": foundCountry.name }]
                }

            return prev;
        }, []);

        if(type !== 'all') {
            queryObj["content.type"] = type
        }

        const response =  await swellServer.get('/products/?sort=name+desc', {
            active: true,
            limit,
            page,
            ...queryObj,
            "where": {
                "$or": destOrArray
            }
        });

        return response;
    }
    static instance = null;
    static createInstance() {
        const object = new SwellController();
        return object;
    }

    static getInstance() {
        if (!SwellController.instance) {
            SwellController.instance = SwellController.createInstance();
        }
        return SwellController.instance;
    }
}

const instance =  SwellController.getInstance();
export { instance as SwellController }
import swellServer from '@/swell/swell';
import { countriesArray } from '@/helpers/countriesArray';
import { DIGITAL_ONLY } from '@/swell/const';


class SwellController {

    constructor() {

    }

    getLatestExpVariants = async (swellExpId) => {
        const recents =  await swellServer.get('/products:variants/', {
            "parent_id": swellExpId,
            "active": true,
            "archived": false,
        });

        return recents;
    }

    getLatestExperiences = async (limit = 12) => {
        const queryObj = {};
        if(DIGITAL_ONLY) {
            queryObj["content.type"] = 'digital'
        }

        const recents =  await swellServer.get('/products/?sort=date_created+desc', {
            active: true,
            limit,
            ...queryObj
        });

        return recents;
    }

    trending = async (limit = 12) => {
        const queryObj = {};
        if(DIGITAL_ONLY) {
            queryObj["content.type"] = 'digital'
        }

        const trending =  await swellServer.get('/products/?sort=content.views+desc', {
            active: true,
            limit,
            ...queryObj
        });

        return trending;
    }

    bySearch = async (type, limit, page) => {
        const queryObj = {};
        if(type !== 'all') {
            queryObj["content.type"] = DIGITAL_ONLY ? 'digital' : type;
        } else if(DIGITAL_ONLY) {
            queryObj["content.type"] = 'digital';
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
            queryObj["content.type"] = DIGITAL_ONLY ? 'digital' : type;
        } else if(DIGITAL_ONLY) {
            queryObj["content.type"] = 'digital';
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
            queryObj["content.type"] = DIGITAL_ONLY ? 'digital' : type;
        } else if(DIGITAL_ONLY) {
            queryObj["content.type"] = 'digital';
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
        if(type !== 'all') {
            queryObj["content.type"] = DIGITAL_ONLY ? 'digital' : type;
        } else if(DIGITAL_ONLY) {
            queryObj["content.type"] = 'digital';
        }
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
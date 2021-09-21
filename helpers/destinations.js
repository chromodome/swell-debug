import { countriesTranslations } from '@/constants/countriesTranslations';

export const parseDestinationData = (data) => {
    const destObj = {
        country: null,
        administrative_area_level_1: null,
        place: null,
        address: null,
        geometry: null,
        countryCode: null
    };
    const tmpObj = {};
    const { address_components: addressComponents, geometry } = data;

    destObj.geometry = JSON.parse(JSON.stringify(geometry));

    if (addressComponents.length) {
        addressComponents.forEach((obj) => {
            const { long_name: l, short_name: s } = obj;

            tmpObj[obj.types[0]] = { l, s };
        });
    }

    if (tmpObj.country) {
        destObj.country = tmpObj.country.l;
        destObj.countryCode = tmpObj.country.s;
    }

    if (tmpObj.locality) {
        destObj.place = tmpObj.locality.l;
    } else if (tmpObj.postal_town) {
        destObj.place = tmpObj.postal_town.l;
    }
    if (tmpObj.administrative_area_level_1) {
        destObj.administrative_area_level_1 =
            tmpObj.administrative_area_level_1.l;
    }
    if (
        tmpObj.political ||
        tmpObj.sublocality ||
        tmpObj.sublocality_level_1 ||
        tmpObj.establishment ||
        tmpObj.park ||
        tmpObj.point_of_interest ||
        tmpObj.tourist_attraction
    ) {
        destObj.address =
            tmpObj.establishment?.l ||
            tmpObj.park?.l ||
            tmpObj.point_of_interest?.l ||
            tmpObj.tourist_attraction?.l ||
            tmpObj.political?.l ||
            tmpObj.sublocality?.l ||
            tmpObj.sublocality_level_1?.l;
    }

    if (!destObj.geometry.bounds) {
        if (destObj.geometry.viewport) {
            destObj.geometry.bounds = JSON.parse(
                JSON.stringify(destObj.geometry.viewport)
            );
        } else {
            destObj.geometry.bounds = { south: 0, west: 0, north: 0, east: 0 };
        }
    }

    return destObj;
};

export const makeDesinationLabel = (destInf, lang) => {
    const { countryCode, country } = destInf;

    const countryName = countriesTranslations[lang][countryCode]
        ? countriesTranslations[lang][countryCode].name
        : country;

    const place = destInf.address
        ? destInf.address
        : destInf.place
        ? destInf.place
        : destInf.administrative_area_level_1
        ? destInf.administrative_area_level_1
        : '';

    return { country: countryName, place };
};

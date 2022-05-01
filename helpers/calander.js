import { isSameDay, isBefore } from 'date-fns';

export const parseVariantDates = (variants, currentDate) => {
    return variants.map((variant) => {
        const { id, name } = variant;

        return new Date(`${name.slice(0,2)}-${name.slice(2,4)}-${name.slice(4)}`).toISOString()
    }).reduce((prev, next) => { // remove dates in the past
        if(!isBefore(new Date(next), new Date(currentDate))) {
            return [...prev, next];
        }

        return prev;
    }, []).sort(function(a,b) {
        return a.localeCompare(b);// order dates chronologicaly
    })
}

export const convertVariantNameDateToIso = (name) => {
    return new Date(`${name.slice(0,2)}-${name.slice(2,4)}-${name.slice(4)}`).toISOString();
}
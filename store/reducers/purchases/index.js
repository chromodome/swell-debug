export const fetchingPurchases = (draft, action) => {
    draft.loading = true;
    draft.error = false;

    return draft;
}

export const updatePurchases = (draft, action) => {
    const { payload } = action;

    draft.loading = false;

    if(payload?.data?.data?.purchasesByUser) {
        const { purchasesByUser=[] } = payload.data.data;
        const tmpTypes = {
            digital:[],
            guided: [],
            missing: []
        }
        const tmpIds = {}

        purchasesByUser.forEach(purObj => {
            const { type, experience_id } = purObj;

            if(purObj.experience) {
                tmpIds[experience_id] = experience_id;

                if(type.toLowerCase() === 'digital') {
                    tmpTypes.digital.push(purObj);
                } else {
                    tmpTypes.guided.push(purObj); 
                }
            } else {
                tmpTypes.missing.push(purObj); 
            }
        });

        draft.digital = tmpTypes.digital;
        draft.guided = tmpTypes.guided;
        draft.missing = tmpTypes.missing;

        draft.purchasedIds = Object.keys(tmpIds);
    }

    return draft;
}

export const purchasesRejected = (draft, action) => {
    draft.loading = false;
    draft.error = true;
    
    return draft;
}

export const updatePurchasesIds = (draft, action) => {
    const { payload } = action;

    draft.purchasedIds = [];
    draft.updateIds = false;
    draft.loadingIds = false;
    
    if(payload?.data?.data?.purchasesByUser) {
        const { purchasesByUser=[] } = payload.data.data;
        draft.purchasedIds = purchasesByUser.map((purObj) => {
            const { experience_id } = purObj;
    
            return experience_id
        })
    }
    

    return draft;
}


export const fetchingPurchasesIds = (draft, action) => {
    draft.loadingIds = true;
    
    return draft;
}
export const purchasesRejectedIds = (draft, action) => {
    draft.purchasedIds = [];
    draft.updateIds = false;
    draft.loadingIds = false;
    
    return draft;
}


export const resetPurchases = (draft) => {
        draft.loading = true;
        draft.error = false;
        draft.guided = [];
        draft.digital = [];
        // just the ids
        draft.loadingIds = false;
        draft.updateIds = true;
        draft.purchasedIds =[];

    return draft;
}



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
        const tmpIds = {}

        draft.digital = purchasesByUser.filter((purObj) => {
            const { experience: { type }, experience_id } = purObj;
            
            tmpIds[experience_id] = experience_id;

            return type.toLowerCase() === 'digital';
        });

        draft.guided = purchasesByUser.filter((purObj) => {
            const { experience: { type }, experience_id } = purObj;
            
            tmpIds[experience_id] = experience_id;

            return type.toLowerCase() === 'guided';
        });

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
    
    
    return draft;
}
export const purchasesRejectedIds = (draft, action) => {
    // draft.loading = false;
    // draft.error = true;
    
    return draft;
}



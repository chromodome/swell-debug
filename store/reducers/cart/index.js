export const updateCart = (draft, action) => {
    const { payload } = action;
    const cart = {
        digital: {
    
        },
        guided: {
            
        }
    }
    if(payload) {
        payload.items.forEach((item) => {
            const type = item.product.content.type.toLowerCase();
            const {
                id,
                variant_id,
                product: {
                    content: { experience_id }
                }
            } = item;
            if(type === 'digital') {
                cart[type][experience_id] = item;
            } else {
                if(!cart[type][experience_id]) {
                    cart[type][experience_id] = {}
                }
                cart[type][experience_id][variant_id] = item;
            }
            
        });
        draft = {
                loading: false,
                error: false,
                ...cart
            }

        return draft;
    }

    return draft;
};

export const fetchingCart = (draft, action) => {
    draft.loading = true;
    
    return draft;
}